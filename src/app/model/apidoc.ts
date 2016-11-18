import {ApiModelUtils} from './api-utils';
import {IJsonSchema} from './api-json-schema';
import {OperationObject} from './api-operation';
import {ParameterObject} from './api-parameter';


export class InfoObject {
    title: string;
    description: string;
    termsOfService: string;
    contact: ContactObject;
    license: LicenseObject;
    version: string;
    constructor(_info?: any) {
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

export class ContactObject {
    name: string;
    url: string;
    email: string;
    constructor(_contact?: any) {
        if (_contact) {
            Object.assign(this, _contact);
        }
    }
}

export class LicenseObject {
    name: string;
    url: string;
    constructor(_license?: any) {
        if (_license) {
            Object.assign(this, _license);
        }
    }
}

export class PathsObject {
    name: string;
    path: PathItemObject;
    selected: boolean;
    constructor(name?: string, _pathItem?: any) {
        this.name = name;
        this.path = new PathItemObject();
        if (_pathItem) {
            this.path = new PathItemObject(name, _pathItem);
        }
    }
}

export class PathItemObject {
    $ref: string;
    path: string;
    parameters: (ParameterObject)[];
    operations: Array<OperationObject>;
    constructor(path?: string, _pathItemObj?: any) {
        this.path = path;
        this.operations = [];
        if (_pathItemObj) {
            Object.keys(_pathItemObj).forEach((method: string) => {
                this.operations.push(new OperationObject(path, method, _pathItemObj[method]));
            });
        }
    }
}

export class DefinitionsObject {
    name: string;
    schema: SchemaObject;
    constructor(name?: string, _defObj?: any) {
        this.name = name;
        this.schema = new SchemaObject();
        if (_defObj) {
            this.schema = new SchemaObject(_defObj);
        }
    }
    isRequired(fieldName: string): boolean {
        return this.schema.required.indexOf(fieldName) !== -1;
    }
}

export class ResponsesObject {
    code: string;
    response: ResponseObject;
    constructor(code: string, _respObj?: any) {
        this.code = code;
        if (_respObj) {
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
    items: ReferenceObject;
    constructor(_respObj?: any) {
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

export class HeadersObject {
    [index: string]: ItemsObject;
    constructor(_headersObj?: any) {
        if (_headersObj) {
            Object.assign(this, _headersObj);
        }
    }
}

export class ExampleObject {
    [index: string]: any;
    constructor(_exampleObj?: any) {
        if (_exampleObj) {
            Object.assign(this, _exampleObj);
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
    constructor(_tagsObj?: any) {
        if (_tagsObj) {
            Object.assign(this, _tagsObj);
            if (_tagsObj.externalDocs) {
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
    constructor(_itemsObject?: any) {
        this.enum = [];
        if (_itemsObject) {
            Object.assign(this, _itemsObject);
            if (_itemsObject.items) {
                this.items = new ItemsObject(_itemsObject.items);
            }
        }
    }
}

export class ReferenceObject {
    $ref: string;
    entity: string;
    items: {$ref: string, entity: string};
    type: string;
    constructor(_refObj?: any) {
        if (_refObj) {
            Object.assign(this, _refObj);
            if (this.$ref) {
                this.entity = ApiModelUtils.extractEntityName(this.$ref);
            }
            if (this.items && this.items.$ref) {
                this.items.entity = ApiModelUtils.extractEntityName(this.items.$ref);
            }
        }
    }
}

export class ExternalDocumentationObject {
    [index: string]: any;
    description: string;
    url: string;
    constructor(_externDocObj?: any) {
        if (_externDocObj) {
            Object.assign(this, _externDocObj);
        }
    }
}

export class SchemaObject implements IJsonSchema {
    [index: string]: any;
    discriminator: string;
    readOnly: boolean;
    xml: XMLObject;
    externalDocs: ExternalDocumentationObject;
    example: any;
    items: ReferenceObject;
    $ref: string;
    entity: string;
    type: string;
    required: string[];
    properties: {
        [name: string]: IJsonSchema;
    };
    constructor(_schemaObj?: any) {
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
                this.entity = ApiModelUtils.extractEntityName(this.$ref);
            }
        }
    }
    isPropertyTypeArray(value: any): boolean {
        return  ApiModelUtils.isArray(value.type);
    }
    getPropertyByName(name: string): string {
        if (this.properties[name]) {
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
    constructor(_xmlObject?: any) {
        if (_xmlObject) {
            Object.assign(this, _xmlObject);
        }
    }
}
