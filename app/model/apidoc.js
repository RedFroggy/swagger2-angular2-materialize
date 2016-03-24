const TYPE_DEFINITION = '#/definitions/';
const TYPE_ARRAY = 'array';
const TYPE_OBJECT = 'object';
const PATH_PARAM = 'path';
const QUERY_PARAM = 'query';
const BODY_PARAM = 'body';
const HTTP_METHOD_PATCH = 'PATCH';
const HTTP_METHOD_POST = 'POST';
const HTTP_METHOD_PUT = 'PUT';
const METHOD_CLASS = {
    GET: 'grey lighten-2',
    POST: 'teal lighten-2',
    PUT: 'yellow lighten-2',
    DELETE: 'red lighten-2',
    PATCH: 'light-blue lighten-2',
    HEAD: 'pink lighten-2'
};
class ApiResult {
    constructor() {
        this.date = new Date();
        this.operation = new OperationObject();
    }
    getStatusClass() {
        if (this.status >= 200 && this.status < 300) {
            return 'green lighten-2';
        }
        return 'red lighten-2';
    }
    getHighLightClass() {
        if (this.operation.isJson()) {
            return 'json';
        }
        return 'xml';
    }
}
exports.ApiResult = ApiResult;
class ApiDefinition {
    constructor(_apiDoc) {
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
        if (_apiDoc) {
            Object.assign(this, _apiDoc);
            this.baseUrl = 'http://' + this.host;
            if (this.basePath) {
                this.baseUrl += this.basePath;
            }
            if (_apiDoc.info) {
                this.info = new InfoObject(_apiDoc.info);
            }
            if (_apiDoc.paths) {
                this.paths = [];
                Object.keys(_apiDoc.paths).forEach((key) => {
                    this.paths.push(new PathsObject(key, _apiDoc.paths[key]));
                });
            }
            if (_apiDoc.definitions) {
                this.definitions = [];
                Object.keys(_apiDoc.definitions).forEach((name) => {
                    this.definitions.push(new DefinitionsObject(name, _apiDoc.definitions[name]));
                });
            }
            if (_apiDoc.tags) {
                this.tags = [];
                _apiDoc.tags.forEach((tag) => {
                    this.tags.push(new TagObject(tag));
                });
            }
            if (_apiDoc.externalDocs) {
                this.externalDocs = new ExternalDocumentationObject(_apiDoc.externalDocs);
            }
        }
    }
    getDefinitionByEntity(entity) {
        return this.definitions.find((definition) => {
            return definition.name === entity;
        });
    }
    isDtoType(entityName) {
        let definition = this.getDefinitionByEntity(entityName);
        return definition && definition.schema.type === TYPE_OBJECT;
    }
    toEntityName(name) {
        if (name) {
            return name.replace(TYPE_DEFINITION, '');
        }
    }
    isOperationDtoType(operation) {
        let resp = operation.getOkResponse();
        return resp && resp.schema && resp.schema.$ref && this.isDtoType(resp.schema.entity);
    }
    getDtoType(operation) {
        let resp = operation.getOkResponse();
        if (resp && resp.schema) {
            if (resp.schema.entity) {
                return resp.schema.entity;
            }
            if (resp.schema.items && resp.schema.items.entity) {
                return resp.schema.items.entity;
            }
        }
    }
    isTypeArray(operation) {
        let resp = operation.getOkResponse();
        if (resp && resp.schema) {
            return resp.schema.type === TYPE_ARRAY;
        }
        return false;
    }
}
exports.ApiDefinition = ApiDefinition;
class InfoObject {
    constructor(_info) {
        this.contact = new ContactObject();
        this.license = new LicenseObject();
        if (_info) {
            Object.assign(this, _info);
            if (_info.contact) {
                this.contact = new ContactObject(_info.contact);
            }
            if (_info.license) {
                this.license = new LicenseObject(_info.license);
            }
        }
    }
}
exports.InfoObject = InfoObject;
class ContactObject {
    constructor(_contact) {
        if (_contact) {
            Object.assign(this, _contact);
        }
    }
}
exports.ContactObject = ContactObject;
class LicenseObject {
    constructor(_license) {
        if (_license) {
            Object.assign(this, _license);
        }
    }
}
exports.LicenseObject = LicenseObject;
class PathsObject {
    constructor(name, _pathItem) {
        this.name = name;
        this.path = new PathItemObject();
        if (_pathItem) {
            this.path = new PathItemObject(name, _pathItem);
        }
    }
}
exports.PathsObject = PathsObject;
class PathItemObject {
    constructor(path, _pathItemObj) {
        this.path = path;
        this.operations = [];
        if (_pathItemObj) {
            Object.keys(_pathItemObj).forEach((method) => {
                this.operations.push(new OperationObject(path, method, _pathItemObj[method]));
            });
        }
    }
}
exports.PathItemObject = PathItemObject;
class OperationObject {
    constructor(path, method, _opObj) {
        this.responses = [];
        this.parameters = [];
        this.produces = [];
        this.consumes = [];
        this.path = path;
        this.produce = { value: 'application/json' };
        if (method) {
            this.name = method.toUpperCase();
        }
        if (_opObj) {
            Object.assign(this, _opObj);
            if (_opObj.externalDocs) {
                this.externalDocs = new ExternalDocumentationObject(_opObj.externalDocs);
            }
            if (_opObj.responses) {
                this.responses = [];
                Object.keys(_opObj.responses).forEach((code) => {
                    this.responses.push(new ResponsesObject(code, _opObj.responses));
                });
            }
            if (_opObj.parameters) {
                this.parameters = [];
                _opObj.parameters.forEach((param) => {
                    this.parameters.push(new ParameterObject(param));
                });
            }
            if (_opObj.produces) {
                this.produce.value = this.produces[0];
            }
        }
    }
    getMethodClass() {
        if (this.name) {
            return METHOD_CLASS[this.name];
        }
    }
    getOkResponse() {
        let respObj = this.responses.find((resp) => {
            return resp.code === '200';
        });
        if (respObj) {
            return respObj.response;
        }
    }
    getRequestUrl(onlyParameters) {
        let url = !onlyParameters ? this.path : '';
        if (this.parameters.length > 0) {
            this.parameters.forEach((param) => {
                if (param.isPathParam()) {
                    url = url.replace(new RegExp('{' + param.name + '}'), param.value);
                }
                else if (param.isQueryParam()) {
                    url += url.indexOf('?') === -1 ? '?' + param.name + '=' + param.value : '&' + param.name + '=' + param.value;
                }
            });
        }
        return url;
    }
    isPatchMethod() {
        return this.name === HTTP_METHOD_PATCH;
    }
    isPostMethod() {
        return this.name === HTTP_METHOD_POST;
    }
    isPutMethod() {
        return this.name === HTTP_METHOD_PUT;
    }
    isJson() {
        return this.produce && this.produce.value && this.produce.value.indexOf('json') !== -1;
    }
}
exports.OperationObject = OperationObject;
class DefinitionsObject {
    constructor(name, _defObj) {
        this.name = name;
        this.schema = new SchemaObject();
        if (_defObj) {
            this.schema = new SchemaObject(_defObj);
        }
    }
    isRequired(fieldName) {
        return this.schema.required.indexOf(fieldName) !== -1;
    }
}
exports.DefinitionsObject = DefinitionsObject;
class ResponsesObject {
    constructor(code, _respObj) {
        this.code = code;
        if (_respObj) {
            this.response = new ResponseObject(_respObj[code]);
        }
    }
}
exports.ResponsesObject = ResponsesObject;
class ResponsesDefinitionsObject {
}
exports.ResponsesDefinitionsObject = ResponsesDefinitionsObject;
class ResponseObject {
    constructor(_respObj) {
        if (_respObj) {
            Object.assign(this, _respObj);
            if (_respObj.schema) {
                this.schema = new SchemaObject(_respObj.schema);
            }
            if (_respObj.examples) {
                this.examples = new ExampleObject(_respObj.examples);
            }
            if (_respObj.headers) {
                this.headers = new HeadersObject(_respObj.headers);
            }
            if (_respObj.items) {
                this.items = new ReferenceObject(_respObj.items);
            }
        }
    }
}
exports.ResponseObject = ResponseObject;
class HeadersObject {
    constructor(_headersObj) {
        if (_headersObj) {
            Object.assign(this, _headersObj);
        }
    }
}
exports.HeadersObject = HeadersObject;
class ExampleObject {
    constructor(_exampleObj) {
        if (_exampleObj) {
            Object.assign(this, _exampleObj);
        }
    }
}
exports.ExampleObject = ExampleObject;
class SecurityDefinitionsObject {
}
exports.SecurityDefinitionsObject = SecurityDefinitionsObject;
class SecuritySchemeObject {
}
exports.SecuritySchemeObject = SecuritySchemeObject;
class ScopesObject {
}
exports.ScopesObject = ScopesObject;
class SecurityRequirementObject {
}
exports.SecurityRequirementObject = SecurityRequirementObject;
class TagObject {
    constructor(_tagsObj) {
        if (_tagsObj) {
            Object.assign(this, _tagsObj);
            if (_tagsObj.externalDocs) {
                this.externalDocs = new ExternalDocumentationObject(_tagsObj.externalDocs);
            }
        }
    }
}
exports.TagObject = TagObject;
class ItemsObject {
    constructor(_itemsObject) {
        this.enum = [];
        if (_itemsObject) {
            Object.assign(this, _itemsObject);
            if (_itemsObject.items) {
                this.items = new ItemsObject(_itemsObject.items);
            }
        }
    }
}
exports.ItemsObject = ItemsObject;
class HeaderObject extends ItemsObject {
}
exports.HeaderObject = HeaderObject;
class ParametersDefinitionsObject {
}
exports.ParametersDefinitionsObject = ParametersDefinitionsObject;
class ParameterObject {
    constructor(_paramObj) {
        this.items = new ItemsObject();
        if (_paramObj) {
            Object.assign(this, _paramObj);
            if (_paramObj.schema) {
                this.schema = new ReferenceObject(_paramObj.schema);
            }
            if (_paramObj.items) {
                this.items = new ItemsObject(_paramObj.items);
            }
        }
    }
    isPathParam() {
        return this.in === PATH_PARAM;
    }
    isQueryParam() {
        return this.in === QUERY_PARAM;
    }
    isBodyParam() {
        return this.in === BODY_PARAM;
    }
    isTypeArray() {
        return this.type === TYPE_ARRAY;
    }
    getParameterType() {
        if (this.isBodyParam()) {
            return this.schema.entity;
        }
        else if (!this.isTypeArray()) {
            return this.type;
        }
        else if (this.items.enum && this.items.enum.length > 0) {
            return 'Enum [' + this.items.enum.join(',') + ']';
        }
        return '[' + this.items.type + ']';
    }
}
exports.ParameterObject = ParameterObject;
class ReferenceObject {
    constructor(_refObj) {
        if (_refObj) {
            Object.assign(this, _refObj);
            if (this.$ref) {
                this.entity = this.$ref.replace(TYPE_DEFINITION, '');
            }
        }
    }
}
exports.ReferenceObject = ReferenceObject;
class ExternalDocumentationObject {
    constructor(_externDocObj) {
        if (_externDocObj) {
            Object.assign(this, _externDocObj);
        }
    }
}
exports.ExternalDocumentationObject = ExternalDocumentationObject;
class SchemaObject {
    constructor(_schemaObj) {
        this.required = [];
        if (_schemaObj) {
            Object.assign(this, _schemaObj);
            if (_schemaObj.xml) {
                this.xml = new XMLObject(_schemaObj.xml);
            }
            if (_schemaObj.externalDocs) {
                this.externalDocs = new ExternalDocumentationObject(_schemaObj.externalDocs);
            }
            if (_schemaObj.items) {
                this.items = new ReferenceObject(_schemaObj.items);
            }
            if (_schemaObj.$ref) {
                this.entity = this.$ref.replace(TYPE_DEFINITION, '');
            }
        }
    }
    isPropertyTypeArray(value) {
        return value.type === TYPE_ARRAY;
    }
    getPropertyByName(name) {
        if (this.properties[name]) {
            return this.properties[name].description;
        }
    }
}
exports.SchemaObject = SchemaObject;
class XMLObject {
    constructor(_xmlObject) {
        if (_xmlObject) {
            Object.assign(this, _xmlObject);
        }
    }
}
exports.XMLObject = XMLObject;
