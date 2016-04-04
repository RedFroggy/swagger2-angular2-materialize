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
var simple_materialize_select_1 = require('../../components/simple-materialize-select');
var multiple_materialize_select_1 = require('../../components/multiple-materialize-select');
var common_1 = require('angular2/common');
///<reference path="../../../../typings/main/ambient/node/index.d.ts" />
var ApiDocDetail = (function () {
    function ApiDocDetail(apiDocService, formBuilder, router, routeParams) {
        var _this = this;
        this.apiDocService = apiDocService;
        this.router = router;
        this.routeParams = routeParams;
        this.operation = new apidoc_1.OperationObject();
        this.apiDoc = new apidoc_1.ApiDefinition();
        this.apiDetailForm = formBuilder.group({});
        apiDocService.getApi().subscribe(function (apiDoc) {
            _this.apiDoc = apiDoc;
            _this.pathId = parseInt(routeParams.get('path'));
            var operationId = parseInt(routeParams.get('operation'));
            var path = apiDoc.paths[_this.pathId - 1];
            if (path) {
                _this.operation = path.path.operations[operationId - 1];
                console.log(_this.operation);
                setTimeout(function () {
                    _this.operation.parameters.forEach(function (parameter) { return _this.apiDetailForm.addControl(parameter.name, parameter.control); });
                }, 0);
                console.log(_this.apiDetailForm);
                if (!_this.operation) {
                    _this.router.navigate(['ApiDocList', { path: _this.pathId }]);
                }
            }
            else {
                _this.router.navigate(['ApiDocList', { path: _this.pathId }]);
            }
        });
    }
    ApiDocDetail.prototype.goToListPage = function (event) {
        event.preventDefault();
        this.router.navigate(['ApiDocList', { path: this.pathId }]);
    };
    ApiDocDetail.prototype.generateJSON = function (event, parameter) {
        event.preventDefault();
    };
    ApiDocDetail = __decorate([
        core_1.Component({
            selector: 'doc-detail',
            template: require('./detail.html'),
            directives: [left_menu_1.LeftMenu, type_modal_1.TypeModal, body_modal_1.BodyModal, simple_materialize_select_1.SimpleMaterializeSelect, multiple_materialize_select_1.MultipleMaterializeSelect]
        }), 
        __metadata('design:paramtypes', [apidoc_service_1.ApiDocService, common_1.FormBuilder, router_1.Router, router_1.RouteParams])
    ], ApiDocDetail);
    return ApiDocDetail;
})();
exports.ApiDocDetail = ApiDocDetail;
//# sourceMappingURL=detail.js.map