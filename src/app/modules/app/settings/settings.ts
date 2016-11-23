import {Component} from '@angular/core';
import {ApiDocService} from '../../../services/apidoc.service';
import {ApiDefinition} from '../../../model/api-definition';
import * as Config from '../../../utils/env.config';
import {ThemeableComponent} from '../themeable.component';

@Component({
    selector: 'settings',
    template: require('./settings.html'),
})
export class SettingsComponent extends ThemeableComponent {
    private chartOptions: any;
    private chartType: {selected: string};
    private currentTheme: {selected: string};
    private apiDoc: ApiDefinition;
    private apiUrl: string;
    private selectedType: string;
    private selectedTheme: string;
    private themes: Array<any>;
    constructor(private apiDocService: ApiDocService) {
        super();
        this.chartType = {selected: null};
        this.currentTheme = {selected: null};
        this.chartOptions = [
            {label: 'Line chart', value: Config.CHART_TYPE_LINE, selected: true},
            {label: 'Bar chart', value: Config.CHART_TYPE_BAR}
        ];

        this.apiDoc = new ApiDefinition();
        apiDocService.getApi().subscribe((apiDoc: ApiDefinition) => this.apiDoc = apiDoc);

        if (!localStorage.getItem(Config.LOCAL_STORAGE_CHART_TYPE)) {
            localStorage.setItem(Config.LOCAL_STORAGE_CHART_TYPE, this.chartOptions[0].value);
        } else {
            this.selectedType = localStorage.getItem(Config.LOCAL_STORAGE_CHART_TYPE);
        }

        if (!localStorage.getItem(Config.LOCAL_STORAGE_API_URL)) {
            this.apiUrl = apiDocService.getDefaultApi();
        } else {
            this.apiUrl = localStorage.getItem(Config.LOCAL_STORAGE_API_URL);
        }

        this.createThemes();
    }
    createThemes(): void {

        this.themes = Config.THEMES;

        if (!localStorage.getItem(Config.LOCAL_STORAGE_THEME)) {
            localStorage.setItem(Config.LOCAL_STORAGE_THEME, this.themes[0].value);
        } else {
            this.selectedTheme = localStorage.getItem(Config.LOCAL_STORAGE_THEME);
        }
    }
    validSettings(): void {
        if (this.chartType && this.chartType.selected) {
            localStorage.setItem(Config.LOCAL_STORAGE_CHART_TYPE, this.chartType.selected);
        }
        if (this.apiUrl) {
            localStorage.setItem(Config.LOCAL_STORAGE_API_URL, this.apiUrl);
        }
        if (this.currentTheme && this.currentTheme.selected) {
            localStorage.setItem(Config.LOCAL_STORAGE_THEME, this.currentTheme.selected);
        }
        window.location.reload();
    }
}

