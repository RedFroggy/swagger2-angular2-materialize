import {ApiDocService} from '../apidoc.service';
import {ApiDefinition} from '../../model/apidoc';
import {ElementRef} from 'angular2/core';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {AfterViewInit} from 'angular2/core';

export abstract class MaterializeModal implements AfterViewInit{
    apiDoc:ApiDefinition;
    modal:any;
    constructor(private apiDocService:ApiDocService,private el: ElementRef) {
        this.apiDoc = new ApiDefinition();
        this.apiDocService.getApi().subscribe((apiDoc:ApiDefinition) => this.apiDoc = apiDoc);
    }
    ngAfterViewInit():void {
        this.modal = $(DOM.querySelector(this.el.nativeElement,'div.modal'));
    }
    openModal(event:Event,options?:any):void {
        event.preventDefault();
        this.modal.openModal(options);
    }
    closeModal(event:Event):void {
        event.preventDefault();
        this.modal.closeModal();
    }
}
