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
    selectType(event:Event,property:any): void {
        event.preventDefault();
        let entity:string;
        if(_.isString(property)) {
            entity = property;
        } else {
            entity =  this.isArrayDtoType(property) ? this.apiDoc.getEntityName(property.value.items.$ref) : property.value.type;
        }
        this.definition = this.apiDoc.getDefinitionByEntity(entity);
        this.openModal(event);
    }
    isSimpleType(property:any):boolean {
        return !this.definition.schema.isPropertyTypeArray(property.value) && !this.apiDoc.isDtoType(property.value.type);
    }
    isDtoType(property:any):boolean {
        return !this.definition.schema.isPropertyTypeArray(property.value) && this.apiDoc.isDtoType(property.value.type);
    }
    isArrayDtoType(property:any):boolean {
        return this.definition.schema.isPropertyTypeArray(property.value) && this.apiDoc.isDtoType(property.value.items.$ref,true);
    }
    isArraySimpleType(property:any):boolean {
        return this.definition.schema.isPropertyTypeArray(property.value) && !this.apiDoc.isDtoType(property.value.items.type,true);
    }
}
