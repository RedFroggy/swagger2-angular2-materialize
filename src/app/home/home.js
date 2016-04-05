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
var apidoc_service_1 = require('../apidoc/apidoc.service');
var apidoc_1 = require('../model/apidoc');
///<reference path="../../../typings/main/ambient/node/index.d.ts" />
var Home = (function () {
    function Home(apiDocService) {
        var _this = this;
        this.apiDoc = new apidoc_1.ApiDefinition();
        apiDocService.getApi().subscribe(function (apiDoc) { return _this.apiDoc = apiDoc; });
    }
    Home = __decorate([
        core_1.Component({
            selector: 'home',
            template: require('./home.html')
        }), 
        __metadata('design:paramtypes', [apidoc_service_1.ApiDocService])
    ], Home);
    return Home;
})();
exports.Home = Home;
//# sourceMappingURL=home.js.map