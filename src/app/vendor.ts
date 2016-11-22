// Polyfills
import 'core-js/es6';
import 'core-js/es7/reflect';
require('zone.js/dist/zone');

require('zone.js/dist/long-stack-trace-zone');

let $ = require('jquery/dist/jquery');
window['jQuery'] = $;
window['$'] = $;

// Angular 2
import '@angular/core';
import '@angular/common';
import '@angular/http';

// RxJS
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';

// TypeScript
import 'typescript/lib/typescript';

// Lodash
import 'lodash/lodash';

// Twitter Bootstrap
import 'bootstrap/dist/js/bootstrap.js';

// Materialize css
import 'materialize-css/dist/css/materialize.css';
import 'materialize-css/dist/js/materialize.js';

// Font awesome
import 'font-awesome/css/font-awesome.css';

// Moment
window.moment = require('moment/moment.js');

// ChartJS
window.Chart = require('chart.js/src/chart.js');

// x2js
let X2JS = require('x2js/x2js.js');
window.x2js = new X2JS();

// Highlight
import 'highlight.js/styles/default.css';
let hljs = require('highlight.js/lib/highlight');
require('highlight.js/lib/index');
window.hljs = hljs;

window.vkbeautify = require('vkbeautify');

