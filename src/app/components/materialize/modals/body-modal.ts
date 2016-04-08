import {Component,Input,ElementRef} from 'angular2/core';
import {ApiDefinition} from '../../../model/api-definition';
import {OperationObject} from '../../../model/api-operation';
import {ApiResult} from '../../../model/api-result';
import {ApiDocService} from '../../../services/apidoc.service';
import {MaterializeModal} from './materialize-modal';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {NgZone} from 'angular2/core';
import {Response} from 'angular2/http';

///<reference path="../../../../../typings/main/ambient/node/index.d.ts" />

@Component({
    selector:'body-modal',
    template:require('./body-modal.html')
})
export class BodyModal extends MaterializeModal {
    @Input() operation:OperationObject;
    private apiResult:ApiResult;
    constructor(private apiDocService:ApiDocService,el: ElementRef, private zone:NgZone) {
        super(el);
        this.apiResult = new ApiResult();
        this.operation = new OperationObject();
        this.apiDocService.getApi().subscribe((apiDoc:ApiDefinition) => this.apiDoc = apiDoc);
    }
    tryApi(event:Event):void {
        event.preventDefault();
        this.apiResult.date = new Date();

        this.apiDocService.sendRequest(this.operation).subscribe((apiResult:ApiResult) => {
            this.apiResult = apiResult;
            this.beautifyResponse(event);
            this.storeRequest();
        },(err:Response) => {
            console.log('Request error',err);
            let body:string = err.text();
            this.apiResult.operation = this.operation;
            this.apiResult.endDate = new Date();
            this.apiResult.status = err.status;
            this.apiResult.message = _.isEmpty(body) ? body : err.json();
            this.beautifyResponse(event);
        });
    }
    storeRequest():void {
        if(this.operation.slug) {
            if(!localStorage.getItem(this.operation.slug)) {
                localStorage.setItem(this.operation.slug,JSON.stringify([]));
            }
            let requestTimes:{date:Date,time:number}[] = JSON.parse(localStorage.getItem(this.operation.slug));
            requestTimes.push({date:this.apiResult.date,time:this.apiResult.getRequestTime()});
            localStorage.setItem(this.operation.slug,JSON.stringify(requestTimes));
        }
    }
    beautifyResponse(event:Event):void {
        let codeElement:any = $(DOM.querySelector(this.el.nativeElement,'pre code'));
        this.openModal(event,
        {
            ready: () => {
                this.zone.run(() => {
                    if (!_.isEmpty(this.apiResult.message)) {
                        if (this.operation.isProduceJson()) {
                            codeElement.html(hljs.highlight('json', JSON.stringify(this.apiResult.message,null,4)).value);
                        } else if(this.operation.isProduceXml()){
                            codeElement.text(vkbeautify.xml(this.apiResult.message));
                        } else {
                            codeElement.text(this.apiResult.message);
                        }
                    }
                });
            }
        });
    }
    getFullUrl():string {
        return this.apiDoc.baseUrl
            + this.apiResult.operation.getRequestUrl();
    }
}
