import {Component,Input,ElementRef} from 'angular2/core';
import {DefinitionsObject,ApiDefinition} from '../../model/apidoc';
import {ValuesPipe} from '../../pipes/pipes';
import {ApiDocService} from '../apidoc.service';
import {MaterializeModal} from './materialize-modal';

@Component({
    selector:'type-modal',
    pipes:[ValuesPipe],
    template:require('./type-modal.html')
})
export class TypeModal extends MaterializeModal {
    definition:DefinitionsObject;
    constructor(private apiDocService:ApiDocService,el: ElementRef) {
        super(el);
        this.definition = new DefinitionsObject();
    }
    onSelectType(eventData:Event) {
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
                ? this.apiDocService.apiDoc.getEntityName(property.value.items.$ref)
                : this.apiDocService.apiDoc.getEntityName(property.value.$ref);
        }
        this.definition = this.apiDocService.apiDoc.getDefinitionByEntity(entity);
        if(openModal) {
            this.openModal(event);
        }
    }
    isSimpleType(property:any):boolean {
        return !this.definition.schema.isPropertyTypeArray(property.value)
            && !_.isUndefined(property.value.type)
            && !this.apiDocService.apiDoc.hasDefinition(property.value.type);
    }
    hasDefinition(property:any):boolean {
        return !this.definition.schema.isPropertyTypeArray(property.value)
            && this.apiDocService.apiDoc.hasDefinition(property.value.$ref,true);
    }
    isArrayDtoType(property:any):boolean {
        return this.definition.schema.isPropertyTypeArray(property.value)
            && this.apiDocService.apiDoc.hasDefinition(property.value.items.$ref,true);
    }
    isArraySimpleType(property:any):boolean {
        return this.definition.schema.isPropertyTypeArray(property.value)
            && !_.isUndefined(property.value.items.type)
            && !this.apiDocService.apiDoc.hasDefinition(property.value.items.type);
    }
}
