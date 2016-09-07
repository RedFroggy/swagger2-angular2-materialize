import {Component,ElementRef} from '@angular/core';
import {ApiDefinition} from '../../../model/api-definition';
import {DefinitionsObject} from '../../../model/apidoc';
import {ValuesPipe} from '../../../pipes/pipes';
import {ApiDocService} from '../../../services/apidoc.service';
import {MaterializeModal} from './materialize-modal';

@Component({
    selector:'type-modal',
    template:require('./type-modal.html')
})
export class TypeModal extends MaterializeModal {
    definition:DefinitionsObject;
    properties:Array<any>;
    entityHistory:Array<string>;
    constructor(apiDocService:ApiDocService,el: ElementRef) {
        super(el);
        this.definition = new DefinitionsObject();
        this.properties = [];
        this.entityHistory = [];
        apiDocService.getApi().subscribe((apiDoc:ApiDefinition) => this.apiDoc = apiDoc);
    }
    selectBreadcrumb($event:Event,index:number):void {
        $event.preventDefault();
        if(index < this.entityHistory.length - 1) {
            this.entityHistory = this.entityHistory.slice(index, index + 1);
            if (this.entityHistory.length >= 1) {
                this.definition = this.apiDoc.getDefinitionByEntity(_.last(this.entityHistory));
                if (this.definition) {
                    this.properties = Object.keys(this.definition.schema.properties).map((key) => {
                        return {value: this.definition.schema.properties[key], key: key};
                    });
                }
            }
        }
    }
    onSelectType(eventData:Event):void {
        this.entityHistory = [];
        this.selectType(null,eventData);
    }
    selectType(event:Event,property:any,openModal:boolean = true): void {
        if(event) {
            event.preventDefault();
        }
        let entity:string;
        if(_.isString(property)) {
            entity = property;
        } else {
            entity =  this.isArrayDtoType(property)
                ? this.apiDoc.getEntityName(property.value.items.$ref)
                : this.apiDoc.getEntityName(property.value.$ref);
        }
        this.definition = this.apiDoc.getDefinitionByEntity(entity);
        if(this.definition) {
            this.properties = Object.keys(this.definition.schema.properties).map((key) => {return {value:this.definition.schema.properties[key],key:key};});
        }

        this.entityHistory.push(entity);

        if(openModal) {
            this.openModal(event);
        }
    }
    isSimpleType(property:any):boolean {
        return !this.definition.schema.isPropertyTypeArray(property.value)
            && !_.isUndefined(property.value.type)
            && !this.apiDoc.hasDefinition(property.value.type);
    }
    hasDefinition(property:any):boolean {
        return !this.definition.schema.isPropertyTypeArray(property.value)
            && this.apiDoc.hasDefinition(property.value.$ref,true);
    }
    isArrayDtoType(property:any):boolean {
        return this.definition.schema.isPropertyTypeArray(property.value)
            && property.value.items && this.apiDoc.hasDefinition(property.value.items.$ref,true);
    }
    isArraySimpleType(property:any):boolean {
        return this.definition.schema.isPropertyTypeArray(property.value)
            && !_.isUndefined(property.value.items.type)
            && !this.apiDoc.hasDefinition(property.value.items.type);
    }
}
