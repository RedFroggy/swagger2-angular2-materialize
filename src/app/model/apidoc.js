var api_utils_1 = require('./api-utils');
var api_operation_1 = require('./api-operation');
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
                _this.operations.push(new api_operation_1.OperationObject(path, method, _pathItemObj[method]));
            });
        }
    }
    return PathItemObject;
})();
exports.PathItemObject = PathItemObject;
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
var ReferenceObject = (function () {
    function ReferenceObject(_refObj) {
        if (_refObj) {
            Object.assign(this, _refObj);
            if (this.$ref) {
                this.entity = api_utils_1.ApiModelUtils.extractEntityName(this.$ref);
            }
            if (this.items && this.items.$ref) {
                this.items.entity = api_utils_1.ApiModelUtils.extractEntityName(this.items.$ref);
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
                this.entity = api_utils_1.ApiModelUtils.extractEntityName(this.$ref);
            }
        }
    }
    SchemaObject.prototype.isPropertyTypeArray = function (value) {
        return api_utils_1.ApiModelUtils.isArray(value.type);
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