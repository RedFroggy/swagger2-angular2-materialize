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
var router_1 = require('angular2/router');
var header_1 = require('./header/header');
var home_1 = require('./home/home');
var api_main_1 = require('./apidoc/main/api.main');
var AppComponent = (function () {
    function AppComponent() {
        console.log('Application initializing');
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'swagger-app',
            template: require('./app.html'),
            directives: [router_1.ROUTER_DIRECTIVES, header_1.Header]
        }),
        router_1.RouteConfig([
            new router_1.Route({ path: '/home', component: home_1.Home, name: 'Home', useAsDefault: true }),
            new router_1.Route({ path: '/apis', component: api_main_1.ApiMain, name: 'Apis' })
        ]), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map