import {Component} from '@angular/core';
import {LeftMenu} from '../left-menu/left-menu';
import {ApiDocService} from '../../../services/apidoc.service';
import {PathsObject} from '../../../model/apidoc';
import {ApiDefinition} from '../../../model/api-definition';
import {ApiModelUtils} from '../../../model/api-utils';
import {OperationObject} from '../../../model/api-operation';
import {ParameterObject} from '../../../model/api-parameter';
import {TypeModal} from '../../materialize/modals/type.modal';
import {BodyModal} from '../../materialize/modals/body-modal';
import {SimpleMaterializeSelect} from '../../materialize/select/simple-materialize-select';
import {MultipleMaterializeSelect} from '../../materialize/select/multiple-materialize-select';
import {DataTypeLink} from '../data-type/data-type-link';
import {MaterializeInputFile} from '../../materialize/input-file/materialize-input-file';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
    selector:'doc-detail',
    template:require('./detail.html'),
    // directives:[
    //     BodyModal,
    //     SimpleMaterializeSelect,
    //     MultipleMaterializeSelect,
    //     DataTypeLink,
    //     MaterializeInputFile,
    // ]
})
export class ApiDocDetail {
    operation:OperationObject;
    private pathId:number;
    private operationId:number;
    private apiDoc:ApiDefinition;
    private routeSub: Subscription;

    constructor(private apiDocService:ApiDocService, private router: Router, private route: ActivatedRoute) {
        this.operation = new OperationObject();
        this.apiDoc = new ApiDefinition();
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.pathId = +params['path'];
            this.operationId = +params['operation'];

            this.apiDocService.getApi().subscribe((apiDoc:ApiDefinition) => {
                this.apiDoc = apiDoc;
                let path:PathsObject = this.apiDocService.apiDoc.paths[this.pathId-1];
                if(path) {
                    this.operation = path.path.operations[this.operationId - 1];

                    if (!this.operation) {
                        this.router.navigate(['apis', this.pathId]);
                    }
                } else {
                    this.router.navigate(['apis', this.pathId]);
                }
            });
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

    goToListPage(event:Event):void {
        event.preventDefault();
        this.router.navigate(['apis', this.pathId]);
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
