var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
var EnvConfig = require('../utils/env.config');
var Observable_1 = require('rxjs/Observable');
var apidoc_1 = require('../model/apidoc');
var apidoc_2 = require('../model/apidoc');
var HEADER_CONTENT_TYPE = 'Content-Type';
var HEADER_ACCEPT = 'Accept';
var ApiDocService = (function () {
    function ApiDocService(http) {
        this.http = http;
    }
    ApiDocService.prototype.getApi = function () {
        var _this = this;
        if (this.apiDoc) {
            console.log('Getting doc definition from cache');
            return Observable_1.Observable.create(function (observer) {
                return observer.next(_this.apiDoc);
            });
        }
        //TODO config
        return this.http.get(EnvConfig.SERVER_ROOT_URL + '/v2/swagger.json').map(function (res) {
            _this.apiDoc = new apidoc_1.ApiDefinition(res.json());
            console.log('Getting doc definition from server');
            return _this.apiDoc;
        });
    };
    ApiDocService.prototype.sendRequest = function (operation) {
        var apiResult = new apidoc_2.ApiResult();
        console.log(operation);
        var reqOptions = new http_1.RequestOptions();
        reqOptions.method = operation.name;
        reqOptions.url = this.apiDoc.baseUrl + operation.getRequestUrl(false);
        var headers = new http_1.Headers();
        if (operation.consumes && !_.isEmpty(operation.consumes)) {
            if (operation.consumes.length === 1 || !operation.consume.selected) {
                headers.set(HEADER_CONTENT_TYPE, operation.consumes[0]);
            }
            else {
                headers.set(HEADER_CONTENT_TYPE, operation.consume.selected);
            }
        }
        else if (operation.consume.selected) {
            headers.set(HEADER_CONTENT_TYPE, operation.consume.selected);
        }
        if (!operation.isDeleteMethod() && operation.produces && !_.isEmpty(operation.produces)) {
            if (operation.produces.length === 1 || !operation.produce.selected) {
                headers.set(HEADER_ACCEPT, operation.produces[0]);
            }
            else {
                headers.set(HEADER_ACCEPT, operation.produce.selected);
            }
        }
        else if (operation.produce.selected) {
            headers.set(HEADER_ACCEPT, operation.produce.selected);
        }
        if (operation.isWriteMethod()) {
            if (operation.isConsumeJson()) {
                reqOptions.body = JSON.stringify(operation.originalData);
            }
            if (operation.isConsumeXml()) {
                reqOptions.body = x2js.js2xml(operation.originalData);
            }
            if (operation.isConsumeFormUrlEncoded()) {
                var formBody = '';
                operation.parameters.forEach(function (param) {
                    if (param.isFormParam()) {
                        if (formBody !== '') {
                            formBody += '&';
                        }
                        formBody += param.name + '=' + param.value.selected;
                    }
                });
                reqOptions.body = formBody;
            }
            //TODO override HTTP class
            if (operation.isConsumeMultipartFormData()) {
                var boundary = '------FormData' + Math.random();
                var body = '';
                operation.parameters.forEach(function (parameter) {
                    if (parameter.isFormParam()) {
                        body += '--' + boundary + '\r\n';
                        if (parameter.isTypeFile()) {
                            var file = parameter.value.selected.file;
                            body += 'Content-Disposition: form-data; name="' + parameter.name + '"; filename="' + file.name + '"\r\n';
                            body += 'Content-Type: ' + file.type + '\r\n\r\n';
                        }
                        else {
                            body += 'Content-Disposition: form-data; name="' + parameter.name + '";\r\n\r\n';
                            body += parameter.value.selected + '\r\n';
                        }
                    }
                });
                body += '--' + boundary + '--';
                headers.set(HEADER_CONTENT_TYPE, headers.get(HEADER_CONTENT_TYPE) + '; boundary=' + boundary);
                reqOptions.body = body;
            }
        }
        reqOptions.headers = headers;
        console.log('Calling api with options', reqOptions);
        return this.http.request(new http_1.Request(reqOptions)).map(function (res) {
            apiResult.operation = operation;
            apiResult.endDate = new Date();
            try {
                if (operation.isProduceJson()) {
                    apiResult.message = res.json();
                }
                else {
                    apiResult.message = res.text();
                }
            }
            catch (error) {
                apiResult.message = res.text();
                if (_.isEmpty(apiResult.message.trim())) {
                    apiResult.message = 'No content';
                }
            }
            apiResult.status = res.status;
            return apiResult;
        });
    };
    ApiDocService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ApiDocService);
    return ApiDocService;
})();
exports.ApiDocService = ApiDocService;
//# sourceMappingURL=apidoc.service.js.map