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
var left_menu_1 = require('../left-menu/left-menu');
var router_1 = require('angular2/router');
var apidoc_service_1 = require('../apidoc.service');
var apidoc_1 = require('../../model/apidoc');
let ApiDocDetail = class {
    constructor(apiDocService, router, zone) {
        this.apiDocService = apiDocService;
        this.router = router;
        this.zone = zone;
        this.operation = new apidoc_1.OperationObject();
        this.apiDoc = new apidoc_1.ApiDefinition();
        this.apiResult = new apidoc_1.ApiResult();
        apiDocService.selectedDetailApi.subscribe((operation) => {
            this.operation = operation;
            setTimeout(() => {
                $('select').material_select();
            }, 0);
        });
        apiDocService.getApi().subscribe((apiDoc) => this.apiDoc = apiDoc);
    }
    goToContentPage(event) {
        event.preventDefault();
        this.router.navigate(['Apis']);
    }
    send(event, operation) {
        event.preventDefault();
        console.log(operation);
        this.apiDocService.sendRequest(operation).subscribe((apiResult) => {
            this.apiResult = apiResult;
            this.showModal();
        });
    }
    showModal() {
        $('#bodyModal').openModal({
            ready: () => {
                this.zone.run(() => {
                    $('pre[lang=json] code').each((index, block) => {
                        $(block).html(vkbeautify.json(this.apiResult.message, 4));
                        hljs.highlightBlock(block);
                    });
                    $('pre[lang=xml] code').each((index, block) => {
                        $(block).text(vkbeautify.xml(this.apiResult.message));
                        hljs.highlightBlock(block);
                    });
                });
            }
        });
    }
    generateJSON(event, parameter) {
        event.preventDefault();
    }
    onCloseModal(event) {
        event.preventDefault();
        $('#typeObjectModal').closeModal();
    }
};
ApiDocDetail = __decorate([
    core_1.Component({
        selector: 'doc-detail',
        templateUrl: './app/apidoc/detail/detail.html',
        directives: [left_menu_1.LeftMenu]
    }), 
    __metadata('design:paramtypes', [apidoc_service_1.ApiDocService, router_1.Router, core_1.NgZone])
], ApiDocDetail);
exports.ApiDocDetail = ApiDocDetail;
