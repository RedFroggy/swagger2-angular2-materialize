import {Component, Input, ElementRef, NgZone} from '@angular/core';
import {ApiDefinition} from '../../../model/api-definition';
import {OperationObject} from '../../../model/api-operation';
import {ApiResult} from '../../../model/api-result';
import {ApiDocService} from '../../../services/apidoc.service';
import {MaterializeModal} from './materialize-modal';
import {Response} from '@angular/http';

import * as _ from 'lodash';

@Component({
    selector:  'body-modal',
    template:  require('./body-modal.html')
})
export class BodyModalComponent extends MaterializeModal {
    @Input() operation: OperationObject;
    private apiResult: ApiResult;
    constructor(private apiDocService: ApiDocService, el: ElementRef, private zone: NgZone) {
        super(el);
        this.apiResult = new ApiResult();
        this.operation = new OperationObject();
        this.apiDocService.getApi().subscribe((apiDoc: ApiDefinition) => this.apiDoc = apiDoc);
    }
    tryApi(event: Event): void {
        //
        event.preventDefault();
        this.apiResult.date = new Date();
        //
        this.apiDocService.sendRequest(this.operation).subscribe((apiResult: ApiResult) => {
            this.apiResult = apiResult;
            this.beautifyResponse(event);
            this.storeRequest();
        }, (err: Response) => {
            console.log('Request error', err);
            this.apiResult.operation = this.operation;
            this.apiResult.endDate = new Date();
            this.apiResult.status = err.status;
            this.apiResult.message = this.tryParseErrorResponse(err);
            this.beautifyResponse(event);
        });
    }
    tryParseErrorResponse(err: Response): any {
        let body: string = err.text();
        if (_.isEmpty(body)) {
            return body;
        }
        try {
            return err.json();
        } catch (e) {
            return body;
        }
    }
    storeRequest(): void {
        if (this.operation.slug) {
            if (!localStorage.getItem(this.operation.slug)) {
                localStorage.setItem(this.operation.slug, JSON.stringify([]));
            }
            let requestTimes: {date: Date, time: number}[] = JSON.parse(localStorage.getItem(this.operation.slug));
            requestTimes.push({date: this.apiResult.date, time: this.apiResult.getRequestTime()});
            localStorage.setItem(this.operation.slug, JSON.stringify(requestTimes));
        }
    }
    beautifyResponse(event: Event): void {
        let codeElement: any = $(this.el.nativeElement).find('pre code');
        this.openModal(event);
        this.zone.run(() => {
            if (!_.isEmpty(this.apiResult.message)) {
                if (this.operation.isProduceJson()) {
                    codeElement.html(hljs.highlight('json', JSON.stringify(this.apiResult.message, null, 4)).value);
                } else if (this.operation.isProduceXml()) {
                    codeElement.text(vkbeautify.xml(this.apiResult.message));
                } else {
                    codeElement.text(this.apiResult.message);
                }
            }
        });
    }
    getFullUrl(): string {
        return this.apiDoc.baseUrl
            + this.apiResult.operation.getRequestUrl();
    }
}
