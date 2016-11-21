import {ApiDefinition} from '../../../model/api-definition';
import {ElementRef} from '@angular/core';
import {AfterViewInit} from '@angular/core';

export abstract class MaterializeModal implements AfterViewInit {
    modalRef: any;
    protected apiDoc: ApiDefinition;
    constructor(public el: ElementRef) {
        this.apiDoc = new ApiDefinition();
    }
    ngAfterViewInit(): void {
        this.modalRef = $(this.el.nativeElement).find('div.modal');
        this.modalRef.modal();
    }
    openModal(event?: Event): void {
        if (event) {
            event.preventDefault();
        }
        this.modalRef.modal('open');
    }
    closeModal(event?: Event): void {
        if (event) {
            event.preventDefault();
        }
        this.modalRef.modal('close');
    }
}
