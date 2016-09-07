
import {ExternalDocumentationObject,SecurityRequirementObject,ResponsesObject,ResponseObject} from './apidoc';
import {ApiModelUtils} from './api-utils';
import {ParameterObject} from './api-parameter';

const HTTP_METHOD_PATCH:string = 'PATCH';
const HTTP_METHOD_POST:string = 'POST';
const HTTP_METHOD_PUT:string = 'PUT';
const HTTP_METHOD_GET:string = 'GET';
const HTTP_METHOD_DELETE:string = 'DELETE';

const APPLICATION_FORM_URL_ENCODED:string = 'app/x-www-form-urlencoded';
const MULTIPART_FORM_DATA:string = 'multipart/form-data';
const APPLICATION_JSON:string = 'app/json';
const APPLICATION_XML:string = 'app/xml';

const METHOD_CLASS:Object = {
    GET:'grey lighten-1',
    POST:'teal lighten-2',
    PUT:'yellow darken-2',
    DELETE:'red lighten-2',
    PATCH:'light-blue lighten-2',
    HEAD:'pink lighten-2'
};

export class OperationObject {
    name:string;
    path:string;
    tags: string[];
    summary: string;
    description: string;
    externalDocs: ExternalDocumentationObject;
    operationId: string;
    consumes: string[];
    produces: string[];
    parameters: (ParameterObject)[];
    responses: Array<ResponsesObject>;
    schemes: string[];
    deprecated: boolean;
    security: SecurityRequirementObject[];
    originalData:any;
    dataJson:string;
    patchJson:string;
    consume:{value?:string,selected:string};
    produce:{value?:string,selected:string};
    slug:string;
    chartColor:string;
    constructor(path?:string,method?:string,_opObj?:any) {
        this.responses = [];
        this.parameters = [];
        this.produces = [];
        this.consumes = [];
        this.path = path;
        this.produce = {selected:APPLICATION_JSON};
        this.consume = {selected:APPLICATION_JSON};
        if(method) {
            this.name = method.toUpperCase();
        }
        if(_opObj) {
            Object.assign(this,_opObj);
            this.slug = btoa(this.name+this.path+this.operationId);
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
            if(_opObj.produces && !_.isEmpty(this.produces)) {
                this.produce = {selected:this.produces[0]};
            }
            if(_opObj.consumes && !_.isEmpty(this.consumes)) {
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
    isProduceJson():boolean {
        return ApiModelUtils.isType(this.produce,APPLICATION_JSON);
    }
    isProduceXml():boolean {
        return ApiModelUtils.isType(this.produce,APPLICATION_XML);
    }
    isConsumeJson():boolean {
        return ApiModelUtils.isType(this.consume,APPLICATION_JSON);
    }
    isConsumeXml():boolean {
        return ApiModelUtils.isType(this.consume,APPLICATION_XML);
    }
    isConsumeFormUrlEncoded():boolean {
        return ApiModelUtils.isType(this.consume,APPLICATION_FORM_URL_ENCODED);
    }
    isConsumeMultipartFormData():boolean {
        return ApiModelUtils.isType(this.consume,MULTIPART_FORM_DATA);
    }
    getMapProduces():{value:string}[] {
        return ApiModelUtils.getSelectMap(this.produces);
    }
    getMapConsumes():{value:string}[] {
        return ApiModelUtils.getSelectMap(this.consumes);
    }
}
