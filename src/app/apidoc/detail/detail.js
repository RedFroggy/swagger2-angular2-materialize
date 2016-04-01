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
var type_modal_1 = require('../modals/type.modal');
var body_modal_1 = require('../modals/body-modal');
var materialize_select_1 = require('../../components/materialize-select');
var ApiDocDetail = (function () {
    function ApiDocDetail(apiDocService, router) {
        var _this = this;
        this.apiDocService = apiDocService;
        this.router = router;
        this.operation = new apidoc_1.OperationObject();
        this.apiDoc = new apidoc_1.ApiDefinition();
        apiDocService.selectedDetailApi.subscribe(function (operation) {
            _this.operation = operation;
            console.log(operation);
        });
        apiDocService.getApi().subscribe(function (apiDoc) { return _this.apiDoc = apiDoc; });
    }
    ApiDocDetail.prototype.goToContentPage = function (event) {
        event.preventDefault();
        this.router.navigate(['Apis']);
    };
    ApiDocDetail.prototype.generateJSON = function (event, parameter) {
        event.preventDefault();
    };
    ApiDocDetail = __decorate([
        core_1.Component({
            selector: 'doc-detail',
            template: require('./detail.html'),
            directives: [left_menu_1.LeftMenu, type_modal_1.TypeModal, body_modal_1.BodyModal, materialize_select_1.MaterializeSelect]
        }), 
        __metadata('design:paramtypes', [apidoc_service_1.ApiDocService, router_1.Router])
    ], ApiDocDetail);
    return ApiDocDetail;
})();
exports.ApiDocDetail = ApiDocDetail;
//# sourceMappingURL=detail.js.map