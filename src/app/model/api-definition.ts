import {InfoObject,PathsObject,
    DefinitionsObject,
    ResponsesDefinitionsObject,SecurityDefinitionsObject,
    SecurityRequirementObject,TagObject
    ,ExternalDocumentationObject,
    ResponseObject} from './apidoc';
import {ApiModelUtils} from './api-utils';
import {OperationObject} from './api-operation';
import {IJsonSchema} from './api-json-schema';
import {ParametersDefinitionsObject,ParameterObject} from './api-parameter';

export class ApiDefinition {
    swagger: string;
    info: InfoObject;
    host: string;
    basePath: string;
    schemes: string[];
    consumes: string[];
    produces: string[];
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
        return definition && ApiModelUtils.isObject(definition.schema.type);
    }
    getEntityName(name:string):string {
        return ApiModelUtils.extractEntityName(name);
    }
    isDtoType(item:ResponseObject|ParameterObject):boolean {
        if(!this.isTypeArray(item)) {
            return item && item.schema && ApiModelUtils.hasRef(item.schema) && this.hasDefinition(item.schema.entity);
        }
        return item && item.schema && item.schema.items
            && ApiModelUtils.hasRef(item.schema.items)
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
            return item.items['type'];
        }
    }
    isTypeArray(item:any):boolean {
        return ApiModelUtils.isTypeArray(item);
    }
    getStatusClass(status:number):string {
        if(status >= 200 && status < 300) {
            return 'green darken-2';
        }
        return ' red darken-2';
    }
    getBodyDescription(entityName:string,isXml:boolean):any {
        let definition:DefinitionsObject = this.getDefinitionByEntity(entityName);
        console.log(definition,entityName);
        let body:any = {};
        if(definition) {
            Object.keys(definition.schema.properties).forEach((name:string) => {
                let property:IJsonSchema = definition.schema.properties[name];
                let bodyValue:any;
                if(!ApiModelUtils.isArray(property.type) && !ApiModelUtils.isObject(property.type)) {
                    if(property.type === 'integer') {
                        bodyValue = 0;
                    } else if(property.enum && !_.isEmpty(property.enum)) {
                        bodyValue = property.enum[0];
                    } else if(property.type === 'string') {
                        if(property.format === 'date-time') {
                            bodyValue = new Date().toISOString();
                        } else {
                            bodyValue = property.example ? property.example : 'string';
                        }
                    } else if(property.type === 'boolean') {
                        bodyValue = property.default ? property.default : true;
                    } else if(property.$ref) {
                        bodyValue = this.getBodyDescription(this.getEntityName(property.$ref),isXml);
                        if(isXml) {
                            name = Object.keys(bodyValue)[0];
                            bodyValue = bodyValue[name];
                        }
                    }
                } else if (ApiModelUtils.isArray(property.type)) {
                    if(property.items.type === 'string') {
                        bodyValue = ['string'];
                    } else if(property.items.$ref) {
                        bodyValue = [this.getBodyDescription(this.getEntityName(property.items.$ref),isXml)];
                        if(isXml && property.xml.wrapped) {
                            name = property.xml.name;
                        }
                    }
                }
                body[name] = bodyValue;
            });
            if(isXml && definition.schema.xml) {
                let xmlBody:any = {};
                xmlBody[definition.schema.xml.name] = body;
                return xmlBody;
            }
        }
        return body;
    }
    getOperationsByProperty(values:Array<string>,property:string):Array<OperationObject> {
        let operations:Array<OperationObject> = [];
        if(values) {
            this.paths.forEach((path:PathsObject) => {
                let pathOperations:Array<OperationObject> = path.path.operations.filter((operation:OperationObject) => {
                    return values.indexOf(operation[property]) !== -1;
                });
                if(!_.isEmpty(pathOperations)) {
                    operations = operations.concat(pathOperations);
                }
            });
        }
        return operations;
    }
}
