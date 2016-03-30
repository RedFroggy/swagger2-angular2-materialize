var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TYPE_DEFINITION = '#/definitions/';
var TYPE_ARRAY = 'array';
var TYPE_OBJECT = 'object';
var PATH_PARAM = 'path';
var QUERY_PARAM = 'query';
var BODY_PARAM = 'body';
var HTTP_METHOD_PATCH = 'PATCH';
var HTTP_METHOD_POST = 'POST';
var HTTP_METHOD_PUT = 'PUT';
var METHOD_CLASS = {
    GET: 'grey lighten-2',
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
    ApiResult.prototype.getStatusClass = function () {
        if (this.status >= 200 && this.status < 300) {
            return 'green lighten-2';
        }
        return 'red lighten-2';
    };
    ApiResult.prototype.getHighLightClass = function () {
        if (this.operation.isJson()) {
            return 'json';
        }
        return 'xml';
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
    ApiDefinition.prototype.isDtoType = function (entityName) {
        var definition = this.getDefinitionByEntity(entityName);
        return definition && definition.schema.type === TYPE_OBJECT;
    };
    ApiDefinition.prototype.toEntityName = function (name) {
        if (name) {
            return name.replace(TYPE_DEFINITION, '');
        }
    };
    ApiDefinition.prototype.isOperationDtoType = function (operation) {
        var resp = operation.getOkResponse();
        return resp && resp.schema && resp.schema.$ref && this.isDtoType(resp.schema.entity);
    };
    ApiDefinition.prototype.getDtoType = function (operation) {
        var resp = operation.getOkResponse();
        if (resp && resp.schema) {
            if (resp.schema.entity) {
                return resp.schema.entity;
            }
            if (resp.schema.items && resp.schema.items.entity) {
                return resp.schema.items.entity;
            }
        }
    };
    ApiDefinition.prototype.isTypeArray = function (operation) {
        var resp = operation.getOkResponse();
        if (resp && resp.schema) {
            return resp.schema.type === TYPE_ARRAY;
        }
        return false;
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
        this.produce = 'application/json';
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
                this.produce = this.produces[0];
            }
        }
    }
    OperationObject.prototype.getMethodClass = function () {
        if (this.name) {
            return METHOD_CLASS[this.name];
        }
    };
    OperationObject.prototype.getOkResponse = function () {
        var respObj = this.responses.find(function (resp) {
            return resp.code === '200';
        });
        if (respObj) {
            return respObj.response;
        }
    };
    OperationObject.prototype.getRequestUrl = function (onlyParameters) {
        var url = !onlyParameters ? this.path : '';
        if (this.parameters.length > 0) {
            this.parameters.forEach(function (param) {
                if (param.isPathParam()) {
                    url = url.replace(new RegExp('{' + param.name + '}'), param.value);
                }
                else if (param.isQueryParam()) {
                    url += url.indexOf('?') === -1 ? '?' + param.name + '=' + param.value : '&' + param.name + '=' + param.value;
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
    OperationObject.prototype.isJson = function () {
        return this.produce && this.produce.indexOf('json') !== -1;
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
    ParameterObject.prototype.isPathParam = function () {
        return this.in === PATH_PARAM;
    };
    ParameterObject.prototype.isQueryParam = function () {
        return this.in === QUERY_PARAM;
    };
    ParameterObject.prototype.isBodyParam = function () {
        return this.in === BODY_PARAM;
    };
    ParameterObject.prototype.isTypeArray = function () {
        return this.type === TYPE_ARRAY;
    };
    ParameterObject.prototype.getParameterType = function () {
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