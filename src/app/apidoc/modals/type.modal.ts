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
    constructor(private apiDocService:ApiDocService,private el: ElementRef) {
        super(apiDocService,el);
        this.definition = new DefinitionsObject();
    }
    selectType(event:Event,property:any,openModal:boolean = true): void {
        event.preventDefault();
        let entity:string;
        if(_.isString(property)) {
            entity = property;
        } else {
            entity =  this.isArrayDtoType(property) ? this.apiDoc.getEntityName(property.value.items.$ref) : this.apiDoc.getEntityName(property.value.$ref);
        }
        this.definition = this.apiDoc.getDefinitionByEntity(entity);
        if(openModal) {
            this.openModal(event);
        }
    }
    isSimpleType(property:any):boolean {
        return !this.definition.schema.isPropertyTypeArray(property.value)
            && !_.isUndefined(property.value.type)
            && !this.apiDoc.isDtoType(property.value.type);
    }
    isDtoType(property:any):boolean {
        return !this.definition.schema.isPropertyTypeArray(property.value)
            && this.apiDoc.isDtoType(property.value.$ref,true);
    }
    isArrayDtoType(property:any):boolean {
        return this.definition.schema.isPropertyTypeArray(property.value)
            && this.apiDoc.isDtoType(property.value.items.$ref,true);
    }
    isArraySimpleType(property:any):boolean {
        return this.definition.schema.isPropertyTypeArray(property.value)
            && !_.isUndefined(property.value.items.type)
            && !this.apiDoc.isDtoType(property.value.items.type);
    }
}
