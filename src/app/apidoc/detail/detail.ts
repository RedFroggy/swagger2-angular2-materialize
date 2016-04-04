import {Component} from 'angular2/core';
import {LeftMenu} from '../left-menu/left-menu';
import {Router,RouteParams} from 'angular2/router';
import {ApiDocService} from '../apidoc.service';
import {OperationObject,ParameterObject,ApiDefinition,PathsObject} from '../../model/apidoc';
import {Response} from 'angular2/http';
import {TypeModal} from '../modals/type.modal';
import {BodyModal} from '../modals/body-modal';
import {SimpleMaterializeSelect} from '../../components/simple-materialize-select';
import {MultipleMaterializeSelect} from '../../components/multiple-materialize-select';
import {ControlGroup,Control,FormBuilder,Validators} from 'angular2/common';

///<reference path="../../../../typings/main/ambient/node/index.d.ts" />

@Component({
    selector:'doc-detail',
    template:require('./detail.html'),
    directives:[LeftMenu,TypeModal,BodyModal,SimpleMaterializeSelect,MultipleMaterializeSelect]
})
export class ApiDocDetail {
    operation:OperationObject;
    apiDoc:ApiDefinition;
    private pathId:number;
    private apiDetailForm:ControlGroup;
    constructor(private apiDocService:ApiDocService,formBuilder: FormBuilder,private router:Router,private routeParams:RouteParams) {
        this.operation = new OperationObject();
        this.apiDoc = new ApiDefinition();
        this.apiDetailForm = formBuilder.group({});

        apiDocService.getApi().subscribe((apiDoc:ApiDefinition) => {
            this.apiDoc = apiDoc;

            this.pathId = parseInt(routeParams.get('path'));
            let operationId:number = parseInt(routeParams.get('operation'));

            let path:PathsObject = apiDoc.paths[this.pathId-1];
            if(path) {
                this.operation = path.path.operations[operationId - 1];
                console.log(this.operation);

                setTimeout(()=> {
                    this.operation.parameters.forEach((parameter:ParameterObject) => this.apiDetailForm.addControl(parameter.name,parameter.control));
                },0);
                console.log(this.apiDetailForm);

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
    generateJSON(event:Event,parameter:ParameterObject):void {
        event.preventDefault();
    }
}
