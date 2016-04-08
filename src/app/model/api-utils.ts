
const TYPE_DEFINITION:string = '#/definitions/';
const TYPE_ARRAY:string = 'array';
const TYPE_OBJECT:string = 'object';

export class ApiModelUtils {
    static extractEntityName(definition:string) {
        if(definition) {
            return definition.replace(TYPE_DEFINITION, '');
        }
    }
    static isArray(type:any):boolean {
        return type && type === TYPE_ARRAY;
    }
    static isObject(type:string):boolean {
        return type === TYPE_OBJECT;
    }
    static hasRef(obj:any):boolean {
        return !!obj.$ref;
    }
    static isTypeArray(item:any):boolean {
        return (item && this.isArray(item.type))
            || (item.schema && item.schema.type && this.isArray(item.schema.type));
    }
    static getSelectMap(items:Array<any>):{value:string}[] {
        return items.map((item:string) => {return {value:item,label:item};});
    }
    static isType(item:{selected:string},type):boolean {
        return item && item.selected && item.selected === type;
    }
}
