import {ApiDefinition} from '../../../model/api-definition';
import {ElementRef} from '@angular/core';
import {AfterViewInit} from '@angular/core';

///<reference path="../../../../../typings/main/ambient/jquery/index.d.ts" />

export abstract class MaterializeModal implements AfterViewInit {
    modal:any;
    protected apiDoc:ApiDefinition;
    constructor(public el: ElementRef) {
        this.apiDoc = new ApiDefinition();
    }
    ngAfterViewInit():void {
        this.modal = $(this.el.nativeElement).find('div.modal');
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
