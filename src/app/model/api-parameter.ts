import {ItemsObject,ReferenceObject} from './apidoc';
import {ApiModelUtils} from './api-utils';
import {Control,Validators} from 'angular2/common';

const TYPE_FILE:string = 'file';
const TYPE_DATE:string = 'date';
const PATH_PARAM:string = 'path';
const QUERY_PARAM:string = 'query';
const BODY_PARAM:string = 'body';
const FORM_PARAM:string = 'formData';

export class ParametersDefinitionsObject {
    [index: string]: ParameterObject;
}

export class ParameterObject {
    name: string;
    'in': string;
    description: string;
    required: boolean;
    value:{selected:any};
    schema:ReferenceObject;
    collectionFormat:string;
    items:ItemsObject;
    type:string;
    control:Control;
    constructor(_paramObj?:any) {
        this.items = new ItemsObject();
        this.value = {selected:''};
        this.control = new Control();
        if(_paramObj) {
            Object.assign(this,_paramObj);
            if(_paramObj.schema) {
                this.schema = new ReferenceObject(_paramObj.schema);
            }
            if(_paramObj.items) {
                this.items = new ItemsObject(_paramObj.items);
            }
            this.createControl();
        }
    }
    isPathParam():boolean {
        return this.in === PATH_PARAM;
    }
    isQueryParam():boolean {
        return this.in === QUERY_PARAM;
    }
    isBodyParam():boolean {
        return this.in === BODY_PARAM;
    }
    isFormParam():boolean {
        return this.in === FORM_PARAM;
    }
    isTypeEnum():boolean {
        return this.items.enum && !_.isEmpty(this.items.enum);
    }
    isTypeFile():boolean {
        return this.type === TYPE_FILE;
    }
    isTypeDate():boolean {
        return this.type === TYPE_DATE;
    }
    getParameterType():string {
        if(this.isBodyParam()) {
            if(ApiModelUtils.isTypeArray(this)) {
                return this.schema.items.entity;
            }
            return this.schema.entity;
        } else if(!ApiModelUtils.isTypeArray(this)) {
            return this.type;
        } else if (this.isTypeEnum() && this.items.enum.length > 0) {
            return 'Enum ['+this.items.enum.join(',')+']';
        }
        return '['+this.items.type+']';
    }
    getEnumMap():{value:string}[] {
        return this.items.enum.map((enumVal:string) => {return {value:enumVal,label:enumVal,selected:this.items && this.items.default === enumVal} ;});
    }
    createControl():void {
        if(this.required) {
            this.control = new Control(this.name,Validators.required);
        }
    }
}