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
///<reference path="../../../typings/browser/ambient/lodash/index.d.ts" />
var ValuesPipe = (function () {
    function ValuesPipe() {
    }
    ValuesPipe.prototype.transform = function (value, args) {
        if (args === void 0) { args = null; }
        return value ? Object.keys(value).map(function (key) { return { value: value[key], key: key }; }) : value;
    };
    ValuesPipe = __decorate([
        core_1.Pipe({ name: 'values', pure: false }), 
        __metadata('design:paramtypes', [])
    ], ValuesPipe);
    return ValuesPipe;
})();
exports.ValuesPipe = ValuesPipe;
var CountPipe = (function () {
    function CountPipe() {
    }
    CountPipe.prototype.transform = function (value, args) {
        if (args === void 0) { args = null; }
        return value && _.isArray(value) ? value.length : 0;
    };
    CountPipe = __decorate([
        core_1.Pipe({ name: 'count', pure: false }), 
        __metadata('design:paramtypes', [])
    ], CountPipe);
    return CountPipe;
})();
exports.CountPipe = CountPipe;
var TagFilterPipe = (function () {
    function TagFilterPipe() {
    }
    TagFilterPipe.prototype.transform = function (value, args) {
        if (args === void 0) { args = null; }
        if (!args || _.isEmpty(args)) {
            return value;
        }
        return value.filter(function (path) {
            var data = path.path.operations.filter(function (operation) {
                return operation.tags && operation.tags.indexOf(args[0]) !== -1;
            });
            return data && !_.isEmpty(data);
        });
    };
    TagFilterPipe = __decorate([
        core_1.Pipe({ name: 'tagFiler', pure: false }), 
        __metadata('design:paramtypes', [])
    ], TagFilterPipe);
    return TagFilterPipe;
})();
exports.TagFilterPipe = TagFilterPipe;
//# sourceMappingURL=pipes.js.map