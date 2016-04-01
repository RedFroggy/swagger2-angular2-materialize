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
var Subject_1 = require('rxjs/Subject');
var apidoc_2 = require('../model/apidoc');
var ApiDocService = (function () {
    function ApiDocService(http) {
        this.http = http;
        this.selectedApi = new Subject_1.Subject();
        this.selectedDetailApi = new Subject_1.Subject();
        console.log('ApiDocService constructor');
    }
    ApiDocService.prototype.getApi = function () {
        var _this = this;
        if (this.apiDoc) {
            return Observable_1.Observable.create(function (observer) {
                return observer.next(_this.apiDoc);
            });
        }
        //TODO config
        return this.http.get(EnvConfig.SERVER_ROOT_URL + '/v2/swagger.json').map(function (res) {
            _this.apiDoc = new apidoc_1.ApiDefinition(res.json());
            return _this.apiDoc;
        });
    };
    ApiDocService.prototype.selectApiList = function (apiPath) {
        this.selectedApi.next(apiPath);
    };
    ApiDocService.prototype.selectDetailApi = function (operation) {
        this.selectedDetailApi.next(operation);
    };
    ApiDocService.prototype.sendRequest = function (operation) {
        var apiResult = new apidoc_2.ApiResult();
        var reqOptions = new http_1.RequestOptions();
        reqOptions.method = operation.name;
        reqOptions.url = this.apiDoc.baseUrl + operation.getRequestUrl(false);
        var headers = new http_1.Headers();
        headers.set('Content-Type', operation.produce.selected);
        headers.set('Accept', operation.produce.selected);
        reqOptions.headers = headers;
        if (operation.isPostMethod() || operation.isPutMethod()) {
            reqOptions.body = operation.dataJson;
        }
        else if (operation.isPatchMethod()) {
            reqOptions.body = operation.patchJson;
        }
        console.log('Calling api with options', reqOptions);
        return this.http.request(new http_1.Request(reqOptions)).map(function (res) {
            apiResult.operation = operation;
            apiResult.date = new Date();
            if (operation.isJson()) {
                apiResult.message = res.json();
            }
            else {
                apiResult.message = res.text();
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