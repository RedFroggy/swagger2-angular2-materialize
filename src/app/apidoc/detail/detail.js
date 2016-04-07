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
var data_type_link_1 = require('../../components/data-type-link');
var materialize_input_file_1 = require('../../components/materialize-input-file');
///<reference path="../../../../typings/main/ambient/node/index.d.ts" />
var ApiDocDetail = (function () {
    function ApiDocDetail(apiDocService, formBuilder, router, routeParams) {
        this.apiDocService = apiDocService;
        this.router = router;
        this.routeParams = routeParams;
        this.operation = new apidoc_1.OperationObject();
        this.apiDetailForm = formBuilder.group({});
        this.apiDoc = new apidoc_1.ApiDefinition();
        this.init();
    }
    ApiDocDetail.prototype.init = function () {
        var _this = this;
        this.pathId = parseInt(this.routeParams.get('path'));
        var operationId = parseInt(this.routeParams.get('operation'));
        this.apiDocService.getApi().subscribe(function (apiDoc) {
            _this.apiDoc = apiDoc;
            var path = _this.apiDocService.apiDoc.paths[_this.pathId - 1];
            if (path) {
                _this.operation = path.path.operations[operationId - 1];
                //this.operation.slug = 'op-'+ (this.pathId-1)+'-'+(operationId -1);
                setTimeout(function () {
                    _this.operation.parameters.forEach(function (parameter) { return _this.apiDetailForm.addControl(parameter.name, parameter.control); });
                }, 0);
                if (!_this.operation) {
                    _this.router.navigate(['ApiDocList', { path: _this.pathId }]);
                }
            }
            else {
                _this.router.navigate(['ApiDocList', { path: _this.pathId }]);
            }
        });
    };
    ApiDocDetail.prototype.goToListPage = function (event) {
        event.preventDefault();
        this.router.navigate(['ApiDocList', { path: this.pathId }]);
    };
    ApiDocDetail.prototype.generate = function (event, parameter) {
        event.preventDefault();
        console.log(parameter);
        this.operation.originalData = this.apiDoc.getBodyDescription(parameter.getParameterType(), this.operation.isConsumeXml());
        if (parameter.isTypeArray()) {
            this.operation.originalData = [this.operation.originalData];
        }
        if (this.operation.isConsumeJson()) {
            this.operation.dataJson = JSON.stringify(this.operation.originalData, null, 4);
        }
        else if (this.operation.isConsumeXml()) {
            this.operation.dataJson = vkbeautify.xml(x2js.js2xml(this.operation.originalData));
        }
        setTimeout(function () {
            $('textarea').trigger('autoresize');
        }, 0);
    };
    ApiDocDetail = __decorate([
        core_1.Component({
            selector: 'doc-detail',
            template: require('./detail.html'),
            directives: [left_menu_1.LeftMenu, type_modal_1.TypeModal,
                body_modal_1.BodyModal, simple_materialize_select_1.SimpleMaterializeSelect,
                multiple_materialize_select_1.MultipleMaterializeSelect, data_type_link_1.DataTypeLink,
                materialize_input_file_1.MaterializeInputFile]
        }), 
        __metadata('design:paramtypes', [apidoc_service_1.ApiDocService, common_1.FormBuilder, router_1.Router, router_1.RouteParams])
    ], ApiDocDetail);
    return ApiDocDetail;
})();
exports.ApiDocDetail = ApiDocDetail;
//# sourceMappingURL=detail.js.map