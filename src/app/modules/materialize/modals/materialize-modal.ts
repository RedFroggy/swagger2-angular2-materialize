import {ApiDefinition} from '../../../model/api-definition';
import {ElementRef} from '@angular/core';
import {AfterViewInit} from '@angular/core';

///<reference path="../../../../../typings/main/ambient/jquery/index.d.ts" />

export abstract class MaterializeModal implements AfterViewInit {
    modalRef:any;
    protected apiDoc:ApiDefinition;
    constructor(public el: ElementRef) {
        this.apiDoc = new ApiDefinition();
    }
    ngAfterViewInit():void {
        this.modalRef = $(this.el.nativeElement).find('div.modal');
        this.modalRef.modal();
    }
    openModal(event?:Event,options?:any):void {
        if(event) {
            event.preventDefault();
        }
        if(!options) {
            options = 'open';
        }
        this.modalRef.modal(options);
    }
    closeModal(event?:Event):void {
        if(event) {
            event.preventDefault();
        }
        this.modalRef.modal('close');
    }
}
