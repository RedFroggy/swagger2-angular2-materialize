import {Component,Input,ElementRef} from 'angular2/core';
import {ApiResult,OperationObject} from '../../model/apidoc';
import {ApiDocService} from '../apidoc.service';
import {MaterializeModal} from './materialize-modal';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {NgZone} from 'angular2/core';

@Component({
    selector:'body-modal',
    template:require('./body-modal.html')
})
export class BodyModal extends MaterializeModal {
    @Input() operation:OperationObject;
    private apiResult:ApiResult;
    constructor(private apiDocService:ApiDocService,private el: ElementRef, private zone:NgZone) {
        super(apiDocService,el);
        this.apiResult = new ApiResult();
        this.operation = new OperationObject();
    }
    tryApi(event:Event):void {
        event.preventDefault();
        this.apiResult.date = new Date();
        this.apiDocService.sendRequest(this.operation).subscribe((apiResult:ApiResult) => {
            this.apiResult = apiResult;
            this.beautifyResponse(event);
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
    beautifyResponse(event:Event):void {
        let codeElement:any = $(DOM.querySelector(this.el.nativeElement,'pre code'));
        this.openModal(event,
        {
            ready: () => {
                this.zone.run(() => {
                    if (!_.isEmpty(this.apiResult.message)) {
                        if (this.operation.isJson()) {
                            codeElement.html(hljs.highlight('json', JSON.stringify(this.apiResult.message,null,4)).value);
                        } else {
                            codeElement.text(vkbeautify.xml(this.apiResult.message));
                        }
                    }
                });
            }
        });
    }
    getFullUrl():string {
        return this.apiDoc.baseUrl+this.apiResult.operation.getRequestUrl();
    }
}
