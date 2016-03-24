var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var apidoc_service_1 = require('../apidoc.service');
var apidoc_1 = require('../../model/apidoc');
var pipes_1 = require('../../pipes/pipes');
var api_main_1 = require('../main/api.main');
let LeftMenu = class {
    constructor(apiDocService, apiMain) {
        this.apiDocService = apiDocService;
        this.apiMain = apiMain;
        this.apiDoc = new apidoc_1.ApiDefinition();
    }
    ngOnInit() {
        this.apiDocService.getApi().subscribe((apiDoc) => {
            this.apiDoc = apiDoc;
            this.onSelectApi(null, apiDoc.paths[0]);
        });
    }
    onSelectApi(event, apiPath) {
        if (event) {
            event.preventDefault();
        }
        this.apiMain.selectListMode(apiPath);
    }
};
LeftMenu = __decorate([
    core_1.Component({
        selector: 'left-menu',
        templateUrl: './app/apidoc/left-menu/left-menu.html',
        pipes: [pipes_1.ValuesPipe, pipes_1.CountPipe]
    }),
    __param(1, core_1.Inject(core_1.forwardRef(() => api_main_1.ApiMain))), 
    __metadata('design:paramtypes', [apidoc_service_1.ApiDocService, api_main_1.ApiMain])
], LeftMenu);
exports.LeftMenu = LeftMenu;
