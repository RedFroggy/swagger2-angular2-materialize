import {Component} from '@angular/core';
import {LeftMenu} from '../left-menu/left-menu';
// import {Router,RouteParams} from '@angular/router-deprecated';
import {ApiDocService} from '../../services/apidoc.service';
import {PathsObject} from '../../model/apidoc';
import {ApiDefinition} from '../../model/api-definition';
import {ApiModelUtils} from '../../model/api-utils';
import {OperationObject} from '../../model/api-operation';
import {ParameterObject} from '../../model/api-parameter';
import {TypeModal} from '../materialize/modals/type.modal';
import {BodyModal} from '../materialize/modals/body-modal';
import {SimpleMaterializeSelect} from '../materialize/select/simple-materialize-select';
import {MultipleMaterializeSelect} from '../materialize/select/multiple-materialize-select';
import {DataTypeLink} from '../data-type/data-type-link';
import {MaterializeInputFile} from '../materialize/input-file/materialize-input-file';

@Component({
    selector:'doc-detail',
    template:require('./detail.html'),
    directives:[LeftMenu,TypeModal,
        BodyModal,SimpleMaterializeSelect,
        MultipleMaterializeSelect,DataTypeLink,
        MaterializeInputFile,
        ]
})
export class ApiDocDetail {
    operation:OperationObject;
    private pathId:number;
    private apiDoc:ApiDefinition;
    // constructor(private apiDocService:ApiDocService, private router:Router,private routeParams:RouteParams) {
    constructor(private apiDocService:ApiDocService) {
        this.operation = new OperationObject();
        this.apiDoc = new ApiDefinition();

        this.init();
    }
    init():void {
        // this.pathId = parseInt(this.routeParams.get('path'));
        // let operationId:number = parseInt(this.routeParams.get('operation'));

        this.apiDocService.getApi().subscribe((apiDoc:ApiDefinition) => {
            this.apiDoc = apiDoc;
            let path:PathsObject = this.apiDocService.apiDoc.paths[this.pathId-1];
            if(path) {
                // this.operation = path.path.operations[operationId - 1];

                if (!this.operation) {
                    // this.router.navigate(['ApiDocList', {path: this.pathId}]);
                }
            } else {
                // this.router.navigate(['ApiDocList', {path: this.pathId}]);
            }
        });
    }
    goToListPage(event:Event):void {
        event.preventDefault();
        // this.router.navigate(['ApiDocList', {path: this.pathId}]);
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
