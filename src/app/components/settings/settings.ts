import {Component} from 'angular2/core';
import {SimpleMaterializeSelect} from '../materialize/select/simple-materialize-select';
import {ApiDocService} from '../../services/apidoc.service';
import {ApiDefinition} from '../../model/api-definition';
import * as Config from '../../utils/env.config';

@Component({
    selector:'settings',
    template:require('./settings.html'),
    directives:[SimpleMaterializeSelect]
})
export class Settings {
    private chartOptions:any;
    private chartType:{selected:string};
    private apiDoc:ApiDefinition;
    private apiUrl:string;
    private selectedType:string;
    constructor(private apiDocService:ApiDocService) {
        this.chartType = {};
        this.chartOptions = [{label:'Line chart',value:Config.CHART_TYPE_LINE,selected:true},{label:'Bar chart',value:Config.CHART_TYPE_BAR}];

        this.apiDoc = new ApiDefinition();
        apiDocService.getApi().subscribe((apiDoc:ApiDefinition) => this.apiDoc = apiDoc);

        if(!localStorage.getItem(Config.LOCAL_STORAGE_CHART_TYPE)) {
            localStorage.setItem(Config.LOCAL_STORAGE_CHART_TYPE,this.chartOptions[0].value);
        } else {
            this.selectedType = localStorage.getItem(Config.LOCAL_STORAGE_CHART_TYPE);
        }

        if(!localStorage.getItem(Config.LOCAL_STORAGE_API_URL)) {
            this.apiUrl = apiDocService.getDefaultApi();
        } else {
            this.apiUrl = localStorage.getItem(Config.LOCAL_STORAGE_API_URL);
        }
    }
    validSettings():void {
        if(this.chartType && this.chartType.selected) {
            localStorage.setItem(Config.LOCAL_STORAGE_CHART_TYPE, this.chartType.selected);
        }
        if(this.apiUrl) {
            localStorage.setItem(Config.LOCAL_STORAGE_API_URL,this.apiUrl);
        }
        window.location.reload();
    }
}
