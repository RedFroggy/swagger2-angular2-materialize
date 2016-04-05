import {Control,Validators} from 'angular2/common';

///<reference path="../../../typings/browser/ambient/node/index.d.ts" />

type MimeTypes = string[];
type Parameters = (ParameterObject)[];

const TYPE_DEFINITION:string = '#/definitions/';
const TYPE_ARRAY:string = 'array';
const TYPE_OBJECT:string = 'object';
const PATH_PARAM:string = 'path';
const QUERY_PARAM:string = 'query';
const BODY_PARAM:string = 'body';
const FORM_PARAM:string = 'formData';
const HTTP_METHOD_PATCH:string = 'PATCH';
const HTTP_METHOD_POST:string = 'POST';
const HTTP_METHOD_PUT:string = 'PUT';
const HTTP_METHOD_GET:string = 'GET';
const HTTP_METHOD_DELETE:string = 'DELETE';

const APPLICATION_FORM_URL_ENCODED:string = 'application/x-www-form-urlencoded';
const APPLICATION_JSON:string = 'application/json';
const APPLICATION_XML:string = 'application/xml';

const METHOD_CLASS:Object = {
    GET:'grey lighten-1',
    POST:'teal lighten-2',
    PUT:'yellow darken-2',
    DELETE:'red lighten-2',
    PATCH:'light-blue lighten-2',
    HEAD:'pink lighten-2'
};

export class ApiResult {
    message:string;
    status:number;
    date:Date;
    endDate:Date;
    operation:OperationObject;
    constructor() {
        this.date = new Date();
        this.operation = new OperationObject();
    }
    //TODO const
    getHighLightClass():string {
        if(this.operation.isJson()) {
            return 'json';
        }
        return 'xml';
    }
    getRequestTime():number {
        if(this.date && this.endDate) {
            return this.endDate.getTime() - this.date.getTime();
        }
    }
}

export class ApiDefinition {
    swagger: string;
    info: InfoObject;
    host: string;
    basePath: string;
    schemes: string[];
    consumes: MimeTypes;
    produces: MimeTypes;
    paths: Array<PathsObject>;
    definitions: Array<DefinitionsObject>;
    parameters: ParametersDefinitionsObject;
    responses: ResponsesDefinitionsObject;
    securityDefinitions: SecurityDefinitionsObject;
    security: SecurityRequirementObject[];
    tags: TagObject[];
    externalDocs: ExternalDocumentationObject;
    baseUrl:string;
    constructor(_apiDoc?:any) {
        this.info = new InfoObject();
        this.paths = [];
        this.produces = [];
        this.consumes = [];
        this.schemes = [];
        this.definitions = [];
        this.parameters = new ParametersDefinitionsObject();
        this.responses = new ResponsesDefinitionsObject();
        this.securityDefinitions = new SecurityDefinitionsObject();
        this.externalDocs = new ExternalDocumentationObject();
        this.security = [];
        this.tags = [];

        if(_apiDoc) {
            Object.assign(this, _apiDoc);

            //TODO config
            this.baseUrl = 'http://'+this.host;
            if(this.basePath) {
                this.baseUrl +=  this.basePath;
            }

            if(_apiDoc.info) {
                this.info = new InfoObject(_apiDoc.info);
            }
            if(_apiDoc.paths) {
                this.paths = [];
                Object.keys(_apiDoc.paths).forEach((key:string)=> {
                    this.paths.push(new PathsObject(key,_apiDoc.paths[key]));
                });
            }
            if(_apiDoc.definitions) {
                this.definitions = [];
                Object.keys(_apiDoc.definitions).forEach((name:string) => {
                    this.definitions.push(new DefinitionsObject(name,_apiDoc.definitions[name]));
                });

            }
            if(_apiDoc.tags) {
                this.tags = [];
                _apiDoc.tags.forEach((tag:any) => {
                    this.tags.push(new TagObject(tag));
                });
            }
            if(_apiDoc.externalDocs) {
                this.externalDocs = new ExternalDocumentationObject(_apiDoc.externalDocs);
            }
        }
    }
    getDefinitionByEntity(entity:string):DefinitionsObject {
        return this.definitions.find((definition:DefinitionsObject) => {
            return definition.name === entity;
        });
    }
    hasDefinition(type:string,toEntityName:boolean = false):boolean {
        if(toEntityName) {
            type = this.getEntityName(type);
        }
        if(!type) {
            return false;
        }
        let definition:DefinitionsObject = this.getDefinitionByEntity(type);
        return definition && this.isObject(definition.schema.type);
    }
    getEntityName(name:string):string {
        if(name) {
            return name.replace(TYPE_DEFINITION, '');
        }
    }
    isDtoType(item:ResponseObject|ParameterObject):boolean {
        if(!this.isTypeArray(item)) {
            return item && item.schema && this.hasRef(item.schema) && this.hasDefinition(item.schema.entity);
        }
        return item && item.schema && item.schema.items
            && this.hasRef(item.schema.items)
            && this.hasDefinition(item.schema.items.entity);
    }
    getDtoType(item:ResponseObject|ParameterObject):string {
        if(item && item.schema) {
            if (item.schema.entity) {
                return item.schema.entity;
            }
            if(item.schema.items && item.schema.items.entity) {
                return item.schema.items.entity;
            }
        }
        if(item && item.items) {
            return item.items.type;
        }
    }
    isObject(type:string):boolean {
        return type === TYPE_OBJECT;
    }
    isArray(type:string):boolean {
        return type === TYPE_ARRAY;
    }
    hasRef(obj:any):boolean {
        return !!obj.$ref;
    }
    isTypeArray(item:ResponseObject|ParameterObject):boolean {
        if(item && item.schema) {
            return this.isArray(item.schema.type);
        }
        if(item && item.type) {
            return this.isArray(item.type);
        }
        return false;
    }
    getStatusClass(status:number):string {
        if(status >= 200 && status < 300) {
            return 'green darken-2';
        }
        return ' red darken-2';
    }
    getBodyDescription(entityName:string):any {
        let definition:DefinitionsObject = this.getDefinitionByEntity(entityName);
        console.log(definition);
        let body:any = {};
        if(definition) {
            Object.keys(definition.schema.properties).forEach((name:string) => {
                let property:IJsonSchema = definition.schema.properties[name];
                let bodyValue:any;
                if(!this.isArray(property.type) && !this.isObject(property.type)) {
                    if(property.type === 'integer') {
                        bodyValue = 0;
                    } else if(property.enum && !_.isEmpty(property.enum)) {
                        bodyValue = property.enum[0];
                    } else if(property.type === 'string') {
                        bodyValue = property.example ? property.example : 'string';
                    } else if(property.$ref) {
                        bodyValue = this.getBodyDescription(this.getEntityName(property.$ref));
                    }
                } else if (this.isArray(property.type)) {
                    if(property.items.type === 'string') {
                        bodyValue = ['string'];
                    } else if(property.items.$ref) {
                        bodyValue = [this.getBodyDescription(this.getEntityName(property.items.$ref))];
                    }
                }
                body[name] = bodyValue;
            });
        }
        return body;
    }
}

export class InfoObject {
    title: string;
    description: string;
    termsOfService: string;
    contact: ContactObject;
    license: LicenseObject;
    version: string;
    constructor(_info?:any) {
        this.contact = new ContactObject();
        this.license = new LicenseObject();
        if(_info) {
            Object.assign(this,_info);
            if(_info.contact) {
                this.contact = new ContactObject(_info.contact);
            }
            if(_info.license) {
                this.license = new LicenseObject(_info.license);
            }
        }
    }
}

export class ContactObject {
    name: string;
    url: string;
    email: string;
    constructor(_contact?:any) {
        if(_contact) {
            Object.assign(this,_contact);
        }
    }
}

export class LicenseObject {
    name: string;
    url: string;
    constructor(_license?:any) {
        if(_license) {
            Object.assign(this,_license);
        }
    }
}

export class PathsObject {
    name:string;
    path: PathItemObject;
    constructor(name?:string,_pathItem?:any) {
        this.name = name;
        this.path = new PathItemObject();
        if(_pathItem) {
            this.path = new PathItemObject(name,_pathItem);
        }
    }
}

export class PathItemObject {
    $ref: string;
    path:string;
    parameters: Parameters;
    operations:Array<OperationObject>;
    constructor(path?:string,_pathItemObj?:any) {
        this.path = path;
        this.operations = [];
        if(_pathItemObj) {
            Object.keys(_pathItemObj).forEach((method:string) => {
                this.operations.push(new OperationObject(path,method,_pathItemObj[method]));
            });
        }
    }
}

export class OperationObject {
    name:string;
    path:string;
    tags: string[];
    summary: string;
    description: string;
    externalDocs: ExternalDocumentationObject;
    operationId: string;
    consumes: MimeTypes;
    produces: MimeTypes;
    parameters: Parameters;
    responses: Array<ResponsesObject>;
    schemes: string[];
    deprecated: boolean;
    security: SecurityRequirementObject[];
    originalData:any;
    dataJson:string;
    patchJson:string;
    consume:{value?:string,selected:string};
    produce:{value?:string,selected:string};
    constructor(path?:string,method?:string,_opObj?:any) {
        this.responses = [];
        this.parameters = [];
        this.produces = [];
        this.consumes = [];
        this.path = path;
        this.produce = {selected:null};
        this.consume = {selected:null};
        if(method) {
            this.name = method.toUpperCase();
        }
        if(_opObj) {
            Object.assign(this,_opObj);
            if(_opObj.externalDocs) {
                this.externalDocs = new ExternalDocumentationObject(_opObj.externalDocs);
            }
            if(_opObj.responses) {
                this.responses = [];
                Object.keys(_opObj.responses).forEach((code:string) => {
                    this.responses.push(new ResponsesObject(code,_opObj.responses));
                });
            }
            if(_opObj.parameters) {
                this.parameters = [];
                _opObj.parameters.forEach((param:any) => {
                    this.parameters.push(new ParameterObject(param));
                });
            }
            if(_opObj.produces) {
                this.produce = {selected:this.produces[0]};
            }
            if(_opObj.consumes) {
                this.consume = {selected:this.consumes[0]};
            }
        }
    }
    getMethodClass():string {
        if(this.name) {
            return METHOD_CLASS[this.name];
        }
    }
    getResponseByCode(code:string):ResponseObject {
        let respObj:ResponsesObject = this.responses.find((resp:ResponsesObject) => {
            return resp.code === code;
        });

        if(respObj) {
            return respObj.response;
        }
    }
    getRequestUrl(onlyParameters:boolean = false):string {
        let url :string = !onlyParameters ? this.path : '';

        if(this.parameters.length > 0) {
            this.parameters.forEach((param:ParameterObject) => {
                if(param.value && param.value.selected) {
                    if (param.isPathParam()) {
                        url = url.replace(new RegExp('{' + param.name + '}'), param.value.selected);
                    } else if (param.isQueryParam()) {
                        url += url.indexOf('?') === -1 ? '?' + param.name + '=' + param.value.selected : '&' + param.name + '=' + param.value.selected;
                    }
                }
            });
        }
        return url;
    }
    isPatchMethod():boolean {
        return this.name === HTTP_METHOD_PATCH;
    }
    isPostMethod():boolean {
        return this.name === HTTP_METHOD_POST;
    }
    isPutMethod():boolean {
        return this.name === HTTP_METHOD_PUT;
    }
    isWriteMethod():boolean {
        return this.isPatchMethod() || this.isPostMethod() || this.isPutMethod();
    }
    isGetMethod():boolean {
        return this.name === HTTP_METHOD_GET;
    }
    isDeleteMethod():boolean {
        return this.name === HTTP_METHOD_DELETE;
    }
    isType(item:{selected:string},type):boolean {
        return item && item.selected && item.selected === type;
    }
    isProduceJson():boolean {
        return this.isType(this.produce,APPLICATION_JSON);
    }
    isProduceXml():boolean {
        return this.isType(this.produce,APPLICATION_XML);
    }
    isConsumeJson():boolean {
        return this.isType(this.consume,APPLICATION_JSON);
    }
    isConsumeXml():boolean {
        return this.isType(this.consume,APPLICATION_XML);
    }
    isConsumeFormData():boolean {
        return this.isType(this.consume,APPLICATION_FORM_URL_ENCODED);
    }
    getMapProduces():{value:string}[] {
        return this.produces.map((mimeType:string) => {return {value:mimeType} ;});
    }
    getMapConsumes():{value:string}[] {
        return this.consumes.map((mimeType:string) => {return {value:mimeType} ;});
    }
}

export class DefinitionsObject {
    name:string;
    schema: SchemaObject;
    constructor(name?:string,_defObj?:any) {
        this.name = name;
        this.schema = new SchemaObject();
        if(_defObj) {
            this.schema = new SchemaObject(_defObj);
        }
    }
    isRequired(fieldName:string):boolean {
        return this.schema.required.indexOf(fieldName) !== -1;
    }
}

export class ResponsesObject {
    code:string;
    response: ResponseObject;
    constructor(code:string,_respObj?:any) {
        this.code = code;
        if(_respObj) {
            this.response = new ResponseObject(_respObj[code]);
        }
    }
}

export class ResponsesDefinitionsObject {
    [index: string]: ResponseObject;
}

export class ResponseObject {
    description: string;
    schema: SchemaObject;
    headers: HeadersObject;
    examples: ExampleObject;
    items:ReferenceObject;
    constructor(_respObj?:any) {
        if(_respObj) {
            Object.assign(this,_respObj);
            if(_respObj.schema) {
                this.schema = new SchemaObject(_respObj.schema);
            }
            if(_respObj.examples) {
                this.examples = new ExampleObject(_respObj.examples);
            }
            if(_respObj.headers) {
                this.headers = new HeadersObject(_respObj.headers);
            }
            if(_respObj.items) {
                this.items = new ReferenceObject(_respObj.items);
            }
        }
    }
}

export class HeadersObject {
    [index: string]: HeaderObject;
    constructor(_headersObj?:any) {
        if(_headersObj) {
            Object.assign(this,_headersObj);
        }
    }
}

export class ExampleObject {
    [index: string]: any;
    constructor(_exampleObj?:any) {
        if(_exampleObj) {
            Object.assign(this,_exampleObj);
        }
    }
}

export class SecurityDefinitionsObject {
    [index: string]: SecuritySchemeObject;
}

export class SecuritySchemeObject {
    type: string;
    description: string;
    name: string;
    'in': string;
    flow: string;
    authorizationUrl: string;
    tokenUrl: string;
    scopes: ScopesObject;
}

export class ScopesObject {
    [index: string]: any;
}

export class SecurityRequirementObject {
    [index: string]: string[];
}

export class TagObject {
    name: string;
    description: string;
    externalDocs: ExternalDocumentationObject;
    constructor(_tagsObj?:any) {
        if(_tagsObj) {
            Object.assign(this,_tagsObj);
            if(_tagsObj.externalDocs) {
                this.externalDocs = new ExternalDocumentationObject(_tagsObj.externalDocs);
            }
        }
    }
}

export class ItemsObject {
    type: string;
    format: string;
    items: ItemsObject;
    collectionFormat: string;
    'default': any;
    maximum: number;
    exclusiveMaximum: boolean;
    minimum: number;
    exclusiveMinimum: boolean;
    maxLength: number;
    minLength: number;
    pattern: string;
    maxItems: number;
    minItems: number;
    uniqueItems: boolean;
    'enum': any[];
    multipleOf: number;
    constructor(_itemsObject?:any) {
        this.enum = [];
        if(_itemsObject) {
            Object.assign(this,_itemsObject);
            if(_itemsObject.items) {
                this.items = new ItemsObject(_itemsObject.items);
            }
        }
    }
}

export class HeaderObject extends ItemsObject {
}

export class ParametersDefinitionsObject {
    [index: string]: ParameterObject;
}

export class ParameterObject {
    name: string;
    'in': string;
    description: string;
    required: boolean;
    value:{selected:string};
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
    isTypeArray():boolean {
        return this.type === TYPE_ARRAY;
    }
    isTypeEnum():boolean {
        return this.items.enum && !_.isEmpty(this.items.enum);
    }
    getParameterType():string {
        if(this.isBodyParam()) {
            return this.schema.entity;
        } else if(!this.isTypeArray()) {
            return this.type;
        } else if (this.isTypeEnum() && this.items.enum.length > 0) {
            return 'Enum ['+this.items.enum.join(',')+']';
        }
        return '['+this.items.type+']';
    }
    getEnumMap():[{value:string}] {
        return this.items.enum.map((enumVal:string) => {return {value:enumVal} ;});
    }
    createControl():void {
        if(this.required) {
            this.control = new Control(this.name,Validators.required);
        }
    }
}

export class ReferenceObject {
    $ref: string;
    entity:string;
    constructor(_refObj?:any) {
        if(_refObj) {
            Object.assign(this,_refObj);
            if(this.$ref) {
                this.entity = this.$ref.replace(TYPE_DEFINITION, '');
            }
        }
    }
}

export class ExternalDocumentationObject {
    [index: string]: any;
    description: string;
    url: string;
    constructor(_externDocObj?:any) {
        if(_externDocObj) {
            Object.assign(this,_externDocObj);
        }
    }
}

export interface IJsonSchema {
    id?: string;
    example?: string;
    $schema?: string;
    $ref?:string;
    title?: string;
    description?: string;
    multipleOf?: number;
    maximum?: number;
    exclusiveMaximum?: boolean;
    minimum?: number;
    exclusiveMinimum?: boolean;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    additionalItems?: boolean | IJsonSchema;
    items?: IJsonSchema;
    maxItems?: number;
    minItems?: number;
    uniqueItems?: boolean;
    maxProperties?: number;
    minProperties?: number;
    required?: string[];
    additionalProperties?: boolean | IJsonSchema;
    definitions?: {
        [name: string]: IJsonSchema
    };
    properties?: {
        [name: string]: IJsonSchema
    };
    patternProperties?: {
        [name: string]: IJsonSchema
    };
    dependencies?: {
        [name: string]: IJsonSchema | string[]
    };
    'enum'?: any[];
    type?: string;
    allOf?: IJsonSchema[];
    anyOf?: IJsonSchema[];
    oneOf?: IJsonSchema[];
    not?: IJsonSchema;
}

export class SchemaObject implements IJsonSchema {
    [index: string]: any;
    discriminator: string;
    readOnly: boolean;
    xml: XMLObject;
    externalDocs: ExternalDocumentationObject;
    example: any;
    items:ReferenceObject;
    $ref:string;
    entity:string;
    type:string;
    required: string[];
    properties: {
        [name: string]: IJsonSchema;
    };
    constructor(_schemaObj?:any) {
        this.required = [];
        this.properties = {};
        if(_schemaObj) {
            Object.assign(this,_schemaObj);
            if(_schemaObj.xml) {
                this.xml = new XMLObject(_schemaObj.xml);
            }
            if(_schemaObj.externalDocs) {
                this.externalDocs = new ExternalDocumentationObject(_schemaObj.externalDocs);
            }
            if(_schemaObj.items) {
                this.items = new ReferenceObject(_schemaObj.items);
            }
            if(_schemaObj.$ref) {
                this.entity = this.$ref.replace(TYPE_DEFINITION,'');
            }
        }
    }
    isPropertyTypeArray(value:any):boolean {
        return value.type === TYPE_ARRAY;
    }
    getPropertyByName(name:string):string {
        if(this.properties[name]) {
            return this.properties[name].description;
        }
    }
}

export class XMLObject {
    [index: string]: any;
    name: string;
    namespace: string;
    prefix: string;
    attribute: boolean;
    wrapped: boolean;
    constructor(_xmlObject?:any) {
        if(_xmlObject) {
            Object.assign(this,_xmlObject);
        }
    }
}
