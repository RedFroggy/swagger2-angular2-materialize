var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var common_1 = require('angular2/common');
var TYPE_DEFINITION = '#/definitions/';
var TYPE_ARRAY = 'array';
var TYPE_OBJECT = 'object';
var PATH_PARAM = 'path';
var QUERY_PARAM = 'query';
var BODY_PARAM = 'body';
var FORM_PARAM = 'formData';
var HTTP_METHOD_PATCH = 'PATCH';
var HTTP_METHOD_POST = 'POST';
var HTTP_METHOD_PUT = 'PUT';
var HTTP_METHOD_GET = 'GET';
var HTTP_METHOD_DELETE = 'DELETE';
var APPLICATION_FORM_URL_ENCODED = 'application/x-www-form-urlencoded';
var APPLICATION_JSON = 'application/json';
var APPLICATION_XML = 'application/xml';
var METHOD_CLASS = {
    GET: 'grey lighten-1',
    POST: 'teal lighten-2',
    PUT: 'yellow lighten-2',
    DELETE: 'red lighten-2',
    PATCH: 'light-blue lighten-2',
    HEAD: 'pink lighten-2'
};
var ApiResult = (function () {
    function ApiResult() {
        this.date = new Date();
        this.operation = new OperationObject();
    }
    //TODO const
    ApiResult.prototype.getHighLightClass = function () {
        if (this.operation.isJson()) {
            return 'json';
        }
        return 'xml';
    };
    ApiResult.prototype.getRequestTime = function () {
        if (this.date && this.endDate) {
            return this.endDate.getTime() - this.date.getTime();
        }
    };
    return ApiResult;
})();
exports.ApiResult = ApiResult;
var ApiDefinition = (function () {
    function ApiDefinition(_apiDoc) {
        var _this = this;
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
            //TODO config
            this.baseUrl = 'http://' + this.host;
            if (this.basePath) {
                this.baseUrl += this.basePath;
            }
            if (_apiDoc.info) {
                this.info = new InfoObject(_apiDoc.info);
            }
            if (_apiDoc.paths) {
                this.paths = [];
                Object.keys(_apiDoc.paths).forEach(function (key) {
                    _this.paths.push(new PathsObject(key, _apiDoc.paths[key]));
                });
            }
            if (_apiDoc.definitions) {
                this.definitions = [];
                Object.keys(_apiDoc.definitions).forEach(function (name) {
                    _this.definitions.push(new DefinitionsObject(name, _apiDoc.definitions[name]));
                });
            }
            if (_apiDoc.tags) {
                this.tags = [];
                _apiDoc.tags.forEach(function (tag) {
                    _this.tags.push(new TagObject(tag));
                });
            }
            if (_apiDoc.externalDocs) {
                this.externalDocs = new ExternalDocumentationObject(_apiDoc.externalDocs);
            }
        }
    }
    ApiDefinition.prototype.getDefinitionByEntity = function (entity) {
        return this.definitions.find(function (definition) {
            return definition.name === entity;
        });
    };
    ApiDefinition.prototype.hasDefinition = function (type, toEntityName) {
        if (toEntityName === void 0) { toEntityName = false; }
        if (toEntityName) {
            type = this.getEntityName(type);
        }
        if (!type) {
            return false;
        }
        var definition = this.getDefinitionByEntity(type);
        return definition && this.isObject(definition.schema.type);
    };
    ApiDefinition.prototype.getEntityName = function (name) {
        if (name) {
            return name.replace(TYPE_DEFINITION, '');
        }
    };
    ApiDefinition.prototype.isDtoType = function (item) {
        return item && item.schema && this.hasRef(item.schema) && this.hasDefinition(item.schema.entity);
    };
    ApiDefinition.prototype.getDtoType = function (item) {
        if (item && item.schema) {
            if (item.schema.entity) {
                return item.schema.entity;
            }
            if (item.schema.items && item.schema.items.entity) {
                return item.schema.items.entity;
            }
        }
    };
    ApiDefinition.prototype.isObject = function (type) {
        return type === TYPE_OBJECT;
    };
    ApiDefinition.prototype.isArray = function (type) {
        return type === TYPE_ARRAY;
    };
    ApiDefinition.prototype.hasRef = function (obj) {
        return !!obj.$ref;
    };
    ApiDefinition.prototype.isTypeArray = function (item) {
        if (item && item.schema) {
            return this.isArray(item.schema.type);
        }
        return false;
    };
    ApiDefinition.prototype.getStatusClass = function (status) {
        if (status >= 200 && status < 300) {
            return 'green darken-2';
        }
        return ' red darken-2';
    };
    ApiDefinition.prototype.getBodyDescription = function (entityName) {
        var _this = this;
        var definition = this.getDefinitionByEntity(entityName);
        console.log(definition);
        var body = {};
        if (definition) {
            Object.keys(definition.schema.properties).forEach(function (name) {
                var property = definition.schema.properties[name];
                var bodyValue;
                if (!_this.isArray(property.type) && !_this.isObject(property.type)) {
                    if (property.type === 'integer') {
                        bodyValue = 0;
                    }
                    else if (property.enum && !_.isEmpty(property.enum)) {
                        bodyValue = property.enum[0];
                    }
                    else if (property.type === 'string') {
                        bodyValue = property.example ? property.example : 'string';
                    }
                    else if (property.$ref) {
                        bodyValue = _this.getBodyDescription(_this.getEntityName(property.$ref));
                    }
                }
                else if (_this.isArray(property.type)) {
                    if (property.items.type === 'string') {
                        bodyValue = ['string'];
                    }
                    else if (property.items.$ref) {
                        bodyValue = [_this.getBodyDescription(_this.getEntityName(property.items.$ref))];
                    }
                }
                body[name] = bodyValue;
            });
        }
        return body;
    };
    return ApiDefinition;
})();
exports.ApiDefinition = ApiDefinition;
var InfoObject = (function () {
    function InfoObject(_info) {
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
    return InfoObject;
})();
exports.InfoObject = InfoObject;
var ContactObject = (function () {
    function ContactObject(_contact) {
        if (_contact) {
            Object.assign(this, _contact);
        }
    }
    return ContactObject;
})();
exports.ContactObject = ContactObject;
var LicenseObject = (function () {
    function LicenseObject(_license) {
        if (_license) {
            Object.assign(this, _license);
        }
    }
    return LicenseObject;
})();
exports.LicenseObject = LicenseObject;
var PathsObject = (function () {
    function PathsObject(name, _pathItem) {
        this.name = name;
        this.path = new PathItemObject();
        if (_pathItem) {
            this.path = new PathItemObject(name, _pathItem);
        }
    }
    return PathsObject;
})();
exports.PathsObject = PathsObject;
var PathItemObject = (function () {
    function PathItemObject(path, _pathItemObj) {
        var _this = this;
        this.path = path;
        this.operations = [];
        if (_pathItemObj) {
            Object.keys(_pathItemObj).forEach(function (method) {
                _this.operations.push(new OperationObject(path, method, _pathItemObj[method]));
            });
        }
    }
    return PathItemObject;
})();
exports.PathItemObject = PathItemObject;
var OperationObject = (function () {
    function OperationObject(path, method, _opObj) {
        var _this = this;
        this.responses = [];
        this.parameters = [];
        this.produces = [];
        this.consumes = [];
        this.path = path;
        this.produce = { selected: null };
        this.consume = { selected: null };
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
                Object.keys(_opObj.responses).forEach(function (code) {
                    _this.responses.push(new ResponsesObject(code, _opObj.responses));
                });
            }
            if (_opObj.parameters) {
                this.parameters = [];
                _opObj.parameters.forEach(function (param) {
                    _this.parameters.push(new ParameterObject(param));
                });
            }
            if (_opObj.produces) {
                this.produce = { selected: this.produces[0] };
            }
            if (_opObj.consumes) {
                this.consume = { selected: this.consumes[0] };
            }
        }
    }
    OperationObject.prototype.getMethodClass = function () {
        if (this.name) {
            return METHOD_CLASS[this.name];
        }
    };
    OperationObject.prototype.getResponseByCode = function (code) {
        var respObj = this.responses.find(function (resp) {
            return resp.code === code;
        });
        if (respObj) {
            return respObj.response;
        }
    };
    OperationObject.prototype.getRequestUrl = function (onlyParameters) {
        if (onlyParameters === void 0) { onlyParameters = false; }
        var url = !onlyParameters ? this.path : '';
        if (this.parameters.length > 0) {
            this.parameters.forEach(function (param) {
                if (param.value && param.value.selected) {
                    if (param.isPathParam()) {
                        url = url.replace(new RegExp('{' + param.name + '}'), param.value.selected);
                    }
                    else if (param.isQueryParam()) {
                        url += url.indexOf('?') === -1 ? '?' + param.name + '=' + param.value.selected : '&' + param.name + '=' + param.value.selected;
                    }
                }
            });
        }
        return url;
    };
    OperationObject.prototype.isPatchMethod = function () {
        return this.name === HTTP_METHOD_PATCH;
    };
    OperationObject.prototype.isPostMethod = function () {
        return this.name === HTTP_METHOD_POST;
    };
    OperationObject.prototype.isPutMethod = function () {
        return this.name === HTTP_METHOD_PUT;
    };
    OperationObject.prototype.isWriteMethod = function () {
        return this.isPatchMethod() || this.isPostMethod() || this.isPutMethod();
    };
    OperationObject.prototype.isGetMethod = function () {
        return this.name === HTTP_METHOD_GET;
    };
    OperationObject.prototype.isDeleteMethod = function () {
        return this.name === HTTP_METHOD_DELETE;
    };
    OperationObject.prototype.isType = function (item, type) {
        return item && item.selected && item.selected === type;
    };
    OperationObject.prototype.isProduceJson = function () {
        return this.isType(this.produce, APPLICATION_JSON);
    };
    OperationObject.prototype.isProduceXml = function () {
        return this.isType(this.produce, APPLICATION_XML);
    };
    OperationObject.prototype.isConsumeJson = function () {
        return this.isType(this.consume, APPLICATION_JSON);
    };
    OperationObject.prototype.isConsumeXml = function () {
        return this.isType(this.consume, APPLICATION_XML);
    };
    OperationObject.prototype.isConsumeFormData = function () {
        return this.isType(this.consume, APPLICATION_FORM_URL_ENCODED);
    };
    OperationObject.prototype.getMapProduces = function () {
        return this.produces.map(function (mimeType) { return { value: mimeType }; });
    };
    return OperationObject;
})();
exports.OperationObject = OperationObject;
var DefinitionsObject = (function () {
    function DefinitionsObject(name, _defObj) {
        this.name = name;
        this.schema = new SchemaObject();
        if (_defObj) {
            this.schema = new SchemaObject(_defObj);
        }
    }
    DefinitionsObject.prototype.isRequired = function (fieldName) {
        return this.schema.required.indexOf(fieldName) !== -1;
    };
    return DefinitionsObject;
})();
exports.DefinitionsObject = DefinitionsObject;
var ResponsesObject = (function () {
    function ResponsesObject(code, _respObj) {
        this.code = code;
        if (_respObj) {
            this.response = new ResponseObject(_respObj[code]);
        }
    }
    return ResponsesObject;
})();
exports.ResponsesObject = ResponsesObject;
var ResponsesDefinitionsObject = (function () {
    function ResponsesDefinitionsObject() {
    }
    return ResponsesDefinitionsObject;
})();
exports.ResponsesDefinitionsObject = ResponsesDefinitionsObject;
var ResponseObject = (function () {
    function ResponseObject(_respObj) {
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
    return ResponseObject;
})();
exports.ResponseObject = ResponseObject;
var HeadersObject = (function () {
    function HeadersObject(_headersObj) {
        if (_headersObj) {
            Object.assign(this, _headersObj);
        }
    }
    return HeadersObject;
})();
exports.HeadersObject = HeadersObject;
var ExampleObject = (function () {
    function ExampleObject(_exampleObj) {
        if (_exampleObj) {
            Object.assign(this, _exampleObj);
        }
    }
    return ExampleObject;
})();
exports.ExampleObject = ExampleObject;
var SecurityDefinitionsObject = (function () {
    function SecurityDefinitionsObject() {
    }
    return SecurityDefinitionsObject;
})();
exports.SecurityDefinitionsObject = SecurityDefinitionsObject;
var SecuritySchemeObject = (function () {
    function SecuritySchemeObject() {
    }
    return SecuritySchemeObject;
})();
exports.SecuritySchemeObject = SecuritySchemeObject;
var ScopesObject = (function () {
    function ScopesObject() {
    }
    return ScopesObject;
})();
exports.ScopesObject = ScopesObject;
var SecurityRequirementObject = (function () {
    function SecurityRequirementObject() {
    }
    return SecurityRequirementObject;
})();
exports.SecurityRequirementObject = SecurityRequirementObject;
var TagObject = (function () {
    function TagObject(_tagsObj) {
        if (_tagsObj) {
            Object.assign(this, _tagsObj);
            if (_tagsObj.externalDocs) {
                this.externalDocs = new ExternalDocumentationObject(_tagsObj.externalDocs);
            }
        }
    }
    return TagObject;
})();
exports.TagObject = TagObject;
var ItemsObject = (function () {
    function ItemsObject(_itemsObject) {
        this.enum = [];
        if (_itemsObject) {
            Object.assign(this, _itemsObject);
            if (_itemsObject.items) {
                this.items = new ItemsObject(_itemsObject.items);
            }
        }
    }
    return ItemsObject;
})();
exports.ItemsObject = ItemsObject;
var HeaderObject = (function (_super) {
    __extends(HeaderObject, _super);
    function HeaderObject() {
        _super.apply(this, arguments);
    }
    return HeaderObject;
})(ItemsObject);
exports.HeaderObject = HeaderObject;
var ParametersDefinitionsObject = (function () {
    function ParametersDefinitionsObject() {
    }
    return ParametersDefinitionsObject;
})();
exports.ParametersDefinitionsObject = ParametersDefinitionsObject;
var ParameterObject = (function () {
    function ParameterObject(_paramObj) {
        this.items = new ItemsObject();
        this.value = { selected: '' };
        this.control = new common_1.Control();
        if (_paramObj) {
            Object.assign(this, _paramObj);
            if (_paramObj.schema) {
                this.schema = new ReferenceObject(_paramObj.schema);
            }
            if (_paramObj.items) {
                this.items = new ItemsObject(_paramObj.items);
            }
            this.createControl();
        }
    }
    ParameterObject.prototype.isPathParam = function () {
        return this.in === PATH_PARAM;
    };
    ParameterObject.prototype.isQueryParam = function () {
        return this.in === QUERY_PARAM;
    };
    ParameterObject.prototype.isBodyParam = function () {
        return this.in === BODY_PARAM;
    };
    ParameterObject.prototype.isFormParam = function () {
        return this.in === FORM_PARAM;
    };
    ParameterObject.prototype.isTypeArray = function () {
        return this.type === TYPE_ARRAY;
    };
    ParameterObject.prototype.isTypeEnum = function () {
        return this.items.enum && !_.isEmpty(this.items.enum);
    };
    ParameterObject.prototype.getParameterType = function () {
        if (this.isBodyParam()) {
            return this.schema.entity;
        }
        else if (!this.isTypeArray()) {
            return this.type;
        }
        else if (this.isTypeEnum() && this.items.enum.length > 0) {
            return 'Enum [' + this.items.enum.join(',') + ']';
        }
        return '[' + this.items.type + ']';
    };
    ParameterObject.prototype.getEnumMap = function () {
        return this.items.enum.map(function (enumVal) { return { value: enumVal }; });
    };
    ParameterObject.prototype.createControl = function () {
        if (this.required) {
            this.control = new common_1.Control(this.name, common_1.Validators.required);
        }
    };
    return ParameterObject;
})();
exports.ParameterObject = ParameterObject;
var ReferenceObject = (function () {
    function ReferenceObject(_refObj) {
        if (_refObj) {
            Object.assign(this, _refObj);
            if (this.$ref) {
                this.entity = this.$ref.replace(TYPE_DEFINITION, '');
            }
        }
    }
    return ReferenceObject;
})();
exports.ReferenceObject = ReferenceObject;
var ExternalDocumentationObject = (function () {
    function ExternalDocumentationObject(_externDocObj) {
        if (_externDocObj) {
            Object.assign(this, _externDocObj);
        }
    }
    return ExternalDocumentationObject;
})();
exports.ExternalDocumentationObject = ExternalDocumentationObject;
var SchemaObject = (function () {
    function SchemaObject(_schemaObj) {
        this.required = [];
        this.properties = {};
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
    SchemaObject.prototype.isPropertyTypeArray = function (value) {
        return value.type === TYPE_ARRAY;
    };
    SchemaObject.prototype.getPropertyByName = function (name) {
        if (this.properties[name]) {
            return this.properties[name].description;
        }
    };
    return SchemaObject;
})();
exports.SchemaObject = SchemaObject;
var XMLObject = (function () {
    function XMLObject(_xmlObject) {
        if (_xmlObject) {
            Object.assign(this, _xmlObject);
        }
    }
    return XMLObject;
})();
exports.XMLObject = XMLObject;
//# sourceMappingURL=apidoc.js.map