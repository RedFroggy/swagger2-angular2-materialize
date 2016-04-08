import {Component} from 'angular2/core';
import {LeftMenu} from '../left-menu/left-menu';
import {Router,RouteParams} from 'angular2/router';
import {ApiDocService} from '../../services/apidoc.service';
import {PathsObject,DefinitionsObject} from '../../model/apidoc';
import {ApiDefinition} from '../../model/api-definition';
import {IJsonSchema} from '../../model/api-json-schema';
import {ApiModelUtils} from '../../model/api-utils';
import {OperationObject} from '../../model/api-operation';
import {ParameterObject} from '../../model/api-parameter';
import {TypeModal} from '../materialize/modals/type.modal';
import {BodyModal} from '../materialize/modals/body-modal';
import {SimpleMaterializeSelect} from '../materialize/select/simple-materialize-select';
import {MultipleMaterializeSelect} from '../materialize/select/multiple-materialize-select';
import {ControlGroup,Control,FormBuilder,Validators} from 'angular2/common';
import {DataTypeLink} from '../data-type/data-type-link';
import {MaterializeInputFile} from '../materialize/input-file/materialize-input-file';


@Component({
    selector:'doc-detail',
    template:require('./detail.html'),
    directives:[LeftMenu,TypeModal,
        BodyModal,SimpleMaterializeSelect,
        MultipleMaterializeSelect,DataTypeLink,
        MaterializeInputFile]
})
export class ApiDocDetail {
    operation:OperationObject;
    private pathId:number;
    private apiDetailForm:ControlGroup;
    private apiDoc:ApiDefinition;
    constructor(private apiDocService:ApiDocService,formBuilder: FormBuilder,private router:Router,private routeParams:RouteParams) {
        this.operation = new OperationObject();
        this.apiDetailForm = formBuilder.group({});
        this.apiDoc = new ApiDefinition();

        this.init();
    }
    init():void {
        this.pathId = parseInt(this.routeParams.get('path'));
        let operationId:number = parseInt(this.routeParams.get('operation'));

        this.apiDocService.getApi().subscribe((apiDoc:ApiDefinition) => {
            this.apiDoc = apiDoc;
            let path:PathsObject = this.apiDocService.apiDoc.paths[this.pathId-1];
            if(path) {
                this.operation = path.path.operations[operationId - 1];
                //this.operation.slug = 'op-'+ (this.pathId-1)+'-'+(operationId -1);

                setTimeout(()=> {
                    this.operation.parameters.forEach((parameter:ParameterObject) => this.apiDetailForm.addControl(parameter.name,parameter.control));
                },0);

                if (!this.operation) {
                    this.router.navigate(['ApiDocList', {path: this.pathId}]);
                }
            } else {
                this.router.navigate(['ApiDocList', {path: this.pathId}]);
            }
        });
    }
    goToListPage(event:Event):void {
        event.preventDefault();
        this.router.navigate(['ApiDocList', {path: this.pathId}]);
    }
    generate(event:Event,parameter:ParameterObject):void {
        event.preventDefault();
        console.log(parameter);
        this.operation.originalData = this.apiDoc.getBodyDescription(parameter.getParameterType(),this.operation.isConsumeXml());
        if(ApiModelUtils.isTypeArray(parameter)) {
            this.operation.originalData = [this.operation.originalData];
        }

        if(this.operation.isConsumeJson()) {
            this.operation.dataJson = JSON.stringify(this.operation.originalData, null, 4);
        } else if(this.operation.isConsumeXml()) {
            this.operation.dataJson = vkbeautify.xml(x2js.js2xml(this.operation.originalData));
        }
        setTimeout(() => {
            $('textarea').trigger('autoresize');
        },0);
    }
}
