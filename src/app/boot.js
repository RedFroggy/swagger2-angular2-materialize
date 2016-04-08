var browser_1 = require('angular2/platform/browser');
var app_component_1 = require('./app.component');
var http_1 = require('angular2/http');
var router_1 = require('angular2/router');
var core_1 = require('angular2/core');
require('rxjs/add/operator/map');
var apidoc_service_1 = require('./services/apidoc.service');
//Styles css
require('../assets/styles/styles.css');
function main() {
    return browser_1.bootstrap(app_component_1.AppComponent, [
        http_1.HTTP_PROVIDERS,
        router_1.ROUTER_PROVIDERS,
        apidoc_service_1.ApiDocService,
        core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy }),
    ]);
}
exports.main = main;
document.addEventListener('DOMContentLoaded', function () { return main(); });
//# sourceMappingURL=boot.js.map