import {Component, NgZone} from 'angular2/core';
import {LeftMenu} from '../left-menu/left-menu';
import {Router} from 'angular2/router';
import {ApiDocService} from '../apidoc.service';
import {OperationObject,ParameterObject,ApiDefinition,ApiResult} from '../../model/apidoc';
import {Response} from 'angular2/http';

@Component({
    selector:'doc-detail',
    template:require('./detail.html'),
    directives:[LeftMenu]
})
export class ApiDocDetail {
    operation:OperationObject;
    apiResult:ApiResult;
    apiDoc:ApiDefinition;
    constructor(private apiDocService:ApiDocService, private router:Router, private zone:NgZone) {
        this.operation = new OperationObject();
        this.apiDoc = new ApiDefinition();
        this.apiResult = new ApiResult();
        apiDocService.selectedDetailApi.subscribe((operation:OperationObject) => {
            this.operation = operation;

            setTimeout(() => {
                $('select').material_select();
            },0);
        });

        apiDocService.getApi().subscribe((apiDoc:ApiDefinition) => this.apiDoc = apiDoc);
    }
    goToContentPage(event:Event):void {
        event.preventDefault();
        this.router.navigate(['Apis']);
    }
    send(event:Event,operation:OperationObject):void {
        event.preventDefault();
        console.log(operation);
        this.apiDocService.sendRequest(operation).subscribe((apiResult:ApiResult) => {
            this.apiResult = apiResult;
            this.showModal();
        });
    }
    showModal():void {
        $('#bodyModal').openModal({
            ready:() => {
                this.zone.run(() => {
                    $('pre[lang=json] code').each((index, block) => {
                        $(block).html(vkbeautify.json(this.apiResult.message,4));
                        hljs.highlightBlock(block);
                    });

                    $('pre[lang=xml] code').each((index, block) => {
                        $(block).text(vkbeautify.xml(this.apiResult.message));
                        hljs.highlightBlock(block);
                    });
                });
            }
        });
    }
    generateJSON(event:Event,parameter:ParameterObject):void {
        event.preventDefault();
    }
    onCloseModal(event:Event):void {
        event.preventDefault();
        $('#typeObjectModal').closeModal();
    }
}
