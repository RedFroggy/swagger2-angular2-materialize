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
let Home = class {
    constructor(apiDocService) {
        this.apiDocService = apiDocService;
        this.apiDoc = new apidoc_1.ApiDefinition();
    }
    ngOnInit() {
        this.apiDocService.getApi().subscribe((apiDoc) => this.apiDoc = apiDoc);
    }
};
Home = __decorate([
    core_1.Component({
        selector: 'home',
        templateUrl: './app/home/home.html',
        providers: [apidoc_service_1.ApiDocService]
    }), 
    __metadata('design:paramtypes', [apidoc_service_1.ApiDocService])
], Home);
exports.Home = Home;
