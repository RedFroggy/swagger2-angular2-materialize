import {MaterializeModal} from './materialize-modal';
import {Component,ElementRef,NgZone,ViewChild} from 'angular2/core';
import {OperationObject,ApiDefinition,PathsObject} from '../../model/apidoc';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {DatePipe} from 'angular2/common';
import {ApiDocService} from '../apidoc.service';
import {MultipleMaterializeSelect} from '../../components/multiple-materialize-select';

@Component({
    selector:'chart-modal',
    template:require('./chart-modal.html'),
    directives:[MultipleMaterializeSelect]
})
export class ChartModal extends MaterializeModal {
    @ViewChild('operationSelect') operationSelect:MultipleMaterializeSelect;
    private chart:Chart;
    private chartData:any;
    private operations:Array<OperationObject>;
    private currentOperation:OperationObject;
    private selectedOperation:any;
    constructor(public el: ElementRef,private zone:NgZone,private apiDocService:ApiDocService) {
        super(el);
        this.operations = [];
        this.resetData();
        this.selectedOperation = {};
        this.currentOperation = new OperationObject();
        this.apiDocService.getApi().subscribe((apiDoc:ApiDefinition) => this.apiDoc = apiDoc);
    }
    resetData():void {
        this.chartData = {
            type:'Line',
            labels: [],
            datasets: [],
            options:{
                animation: true,
                responsive: true,
                tooltipTemplate: (tooltip) => {
                    return tooltip.datasetLabel+' - '+tooltip.value+' ms';
                },
                multiTooltipTemplate: (tooltip) => {
                    return tooltip.datasetLabel+' - '+tooltip.value+' ms';
                }
            }
        };
        if(this.chart) {
            this.chart.destroy();
        }
    }
    getRandomColor() {
        var r = () => { return Math.floor(Math.random()*256);};
        return 'rgb(' + r() + ',' + r() + ',' + r() + ')';
    }
    getContext():any {
        return DOM.querySelector(this.el.nativeElement,'canvas').getContext('2d');
    }
    showGraph(operation:OperationObject):void {
        this.currentOperation = operation;
        this.resetData();
        this.openModal(null,{ready:()=> {
            setTimeout(() => this.operationSelect.refresh(),0);
            this.zone.run(()=> {
                this.listOperations();
                this.createChart([operation.slug]);
            });
        }});
    }
    createChart(slugs:Array<string>):void {
        if(slugs && !_.isEmpty(slugs)) {

            this.resetData();

            let operations:Array<OperationObject> = this.apiDoc.getOperationsBySlug(slugs);

            operations.forEach((operation:OperationObject,index:number) => {

                let dataSetData = {
                    label: '',
                    fillColor: this.getRandomColor(),
                    strokeColor: 'rgba(220,220,220,1)',
                    pointColor: 'rgba(220,220,220,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
                    data: []
                };

                let requestTimes:{date:Date,time:number}[] = JSON.parse(localStorage.getItem(operation.slug));

                if(_.isEmpty(this.chartData.labels)) {
                    _.map(requestTimes, 'date').forEach((dateStr:string, index:number) => {
                        //moment(dateStr).format('MM/DD/YYYY HH:mm:ss.SSS')
                        this.chartData.labels.push(index + 1);
                    });
                }

                dataSetData.data = _.map(requestTimes,'time');
                dataSetData.label = operation.summary;

                this.chartData.datasets.push(dataSetData);
            });
            let ctx:any = this.getContext();
            this.chart = new Chart(ctx).Bar(this.chartData, this.chartData.options);
            $('#legend').html(this.chart.generateLegend());
        }
    }
    listOperations():void {
        this.apiDoc.paths.forEach((path:PathsObject) => {
            let operations:Array<OperationObject> = path.path.operations.filter((operation:OperationObject) => {
                return localStorage.getItem(operation.slug) !== null && operation.slug !== this.currentOperation.slug;
            });
            if(!_.isEmpty(operations)) {
                this.operations = this.operations.concat(operations);
            }
        });
    }
    getOperationsMap():{value:string,label:string}[] {
        return this.operations.map((operation:OperationObject) => {
            let data:any = {};
            data.value = operation.slug;
            data.label = operation.operationId;
            return data;
        });
    }
    onSelectOperation(event:any):void {
        if (event && event.hasOwnProperty('selected')) {
            let slugs:Array<string> = event.selected;
            if(!slugs) {
                this.createChart([this.currentOperation.slug]);
            } else {
                slugs.push(this.currentOperation.slug);
                this.createChart(slugs);
            }
        }
    }
}
