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
var list_1 = require('../list/list');
var detail_1 = require('../detail/detail');
var router_1 = require('angular2/router');
var ApiMain = (function () {
    function ApiMain() {
    }
    ApiMain = __decorate([
        core_1.Component({
            selector: 'doc-main',
            directives: [left_menu_1.LeftMenu, router_1.ROUTER_DIRECTIVES],
            template: "\n    <div class=\"row\">\n        <left-menu></left-menu>\n        <router-outlet></router-outlet>\n    </div>"
        }),
        router_1.RouteConfig([
            new router_1.Route({ path: '/:path', component: list_1.ApiDocList, name: 'ApiDocList', useAsDefault: true }),
            new router_1.Route({ path: '/:path/detail/:operation', component: detail_1.ApiDocDetail, name: 'ApiDocDetail', })
        ]), 
        __metadata('design:paramtypes', [])
    ], ApiMain);
    return ApiMain;
})();
exports.ApiMain = ApiMain;
//# sourceMappingURL=api.main.js.map