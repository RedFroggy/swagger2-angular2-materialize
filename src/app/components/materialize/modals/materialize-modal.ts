import {ApiDefinition} from '../../../model/api-definition';
import {ElementRef} from 'angular2/core';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {AfterViewInit} from 'angular2/core';

///<reference path="../../../../../typings/main/ambient/jquery/index.d.ts" />

export abstract class MaterializeModal implements AfterViewInit {
    modal:any;
    protected apiDoc:ApiDefinition;
    constructor(public el: ElementRef) {
        this.apiDoc = new ApiDefinition();
    }
    ngAfterViewInit():void {
        this.modal = $(DOM.querySelector(this.el.nativeElement,'div.modal'));
    }
    openModal(event?:Event,options?:any):void {
        if(event) {
            event.preventDefault();
        }
        this.modal.openModal(options);
    }
    closeModal(event?:Event):void {
        if(event) {
            event.preventDefault();
        }
        this.modal.closeModal();
    }
}
