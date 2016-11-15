import {MaterializeModal} from './materialize-modal';
import {Component,ElementRef,NgZone,ViewChild} from '@angular/core';
import {PathsObject} from '../../../model/apidoc';
import {OperationObject} from '../../../model/api-operation';
import {ApiDefinition} from '../../../model/api-definition';
import {ApiDocService} from '../../../services/apidoc.service';
import {MultipleMaterializeSelect} from '../select/multiple-materialize-select';
import * as Config from '../../../utils/env.config';

@Component({
    selector:'chart-modal',
    template:require('./chart-modal.html'),
})
export class ChartModal extends MaterializeModal {
    @ViewChild('operationSelect') operationSelect:MultipleMaterializeSelect;
    private chart:LinearInstance;
    private chartData:any;
    private operations:Array<OperationObject>;
    private chartOperations:Array<OperationObject>;
    private currentOperation:OperationObject;
    private selectedOperation:any;
    constructor(public el: ElementRef,private zone:NgZone,private apiDocService:ApiDocService) {
        super(el);
        this.operations = [];
        this.chartOperations = [];
        this.resetData();
        this.selectedOperation = {};
        this.currentOperation = new OperationObject();
        this.apiDocService.getApi().subscribe((apiDoc:ApiDefinition) => this.apiDoc = apiDoc);
    }
    resetData():void {
        this.chartData = {
            labels: [],
            datasets: [],
            options:{
                animation: false,
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
        let r = () => { return Math.floor(Math.random()*256);};
        return 'rgba(' + r() + ',' + r() + ',' + r() + ',0.5)';
    }
    getContext():any {
        let canvas:any = $(this.el.nativeElement).find('canvas')[0];
        return canvas.getContext('2d');
    }
    showGraph(operation:OperationObject):void {
        this.currentOperation = operation;
        this.resetData();
        this.openModal(null);
        setTimeout(() => this.operationSelect.refresh(),0);
        this.zone.run(()=> {
            this.listOperations();
            this.createChart(this.operations);
        });
    }
    getDataSetByType():any {
        let chartType:string = this.getChartType();
        let dataSet:any = {
            label: '',
            strokeColor: 'rgba(220,220,220,1)',
            data: []
        };
       if(chartType === Config.CHART_TYPE_LINE) {
           dataSet.pointColor = 'rgba(220,220,220,1)';
           dataSet.pointStrokeColor = '#fff';
           dataSet.pointHighlightFill = '#fff';
           dataSet.pointHighlightStroke = 'rgba(220,220,220,1)';
       } else {
           dataSet.highlightFill = 'rgba(220,220,220,0.75)';
           dataSet.highlightStroke = 'rgba(220,220,220,1)';
       }
        return dataSet;
    }
    createChart(operations:Array<OperationObject>):void {
        if(operations && !_.isEmpty(operations)) {

            this.resetData();
            let max:number = 0;

            operations.forEach((operation:OperationObject) => {

                operation.chartColor = this.getRandomColor();

                let dataSetData = this.getDataSetByType();
                dataSetData['backgroundColor'] = operation.chartColor;

                let requestTimes:{date:Date,time:number}[] = JSON.parse(localStorage.getItem(operation.slug));
                if(requestTimes.length > max) {
                    this.chartData.labels = [];
                    max = requestTimes.length;
                    for(let i:number = 0;i<max;i++) {
                        this.chartData.labels.push(i + 1);
                    }
                }

                dataSetData.data = _.map(requestTimes,'time');
                dataSetData.label = operation.summary;

                this.chartData.datasets.push(dataSetData);
            });

            this.chartOperations = operations;

            let ctx:any = this.getContext();

            let chartType:string = this.getChartType();
            if(chartType === Config.CHART_TYPE_LINE) {
                console.log(this.chartData);
                this.chart = Chart.Line(ctx,{data:this.chartData, options:this.chartData.options});
            } else {
                this.chart = Chart.Bar(ctx, {data:this.chartData, options:this.chartData.options});
            }
        }
    }
    getChartType():string {
        return localStorage.getItem(Config.LOCAL_STORAGE_CHART_TYPE) ? localStorage.getItem(Config.LOCAL_STORAGE_CHART_TYPE) : Config.CHART_TYPE_BAR;
    }
    listOperations():void {
        this.operations = [];
        this.apiDoc.paths.forEach((path:PathsObject) => {
            let operations:Array<OperationObject> = path.path.operations.filter((operation:OperationObject) => {
                return localStorage.getItem(operation.slug) !== null;
            });
            if(!_.isEmpty(operations)) {
                this.operations = this.operations.concat(operations);
            }
        });
    }
    getOperationsMap():{value:string,label:string}[] {
        return this.operations.map((operation:OperationObject) => {
            let data:any = {};
            data.value = operation.operationId;
            data.label = operation.operationId;
            data.disabled = operation.operationId === this.currentOperation.operationId;
            data.selected = true;
            return data;
        });
    }
    onSelectOperation(event:any):void {
        if (event && event.hasOwnProperty('selected')) {
            let operations:Array<OperationObject> = [];
            if(!event.selected) {
                this.createChart([this.currentOperation]);
            } else {
                operations = this.apiDoc.getOperationsByProperty(event.selected,'operationId');
                operations.push(this.currentOperation);
                this.createChart(operations);
            }
        }
    }
}
