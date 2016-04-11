import {Component} from 'angular2/core';
import {ApiDocService} from '../../services/apidoc.service';
import {ApiDefinition} from '../../model/api-definition';

@Component({
    selector:'home',
    template:require('./home.html')
})
export class Home {
    private apiDoc:ApiDefinition;
    private apiUrl:string;
    constructor(private apiDocService:ApiDocService) {
        this.apiDoc = new ApiDefinition();
        apiDocService.getApi().subscribe((apiDoc:ApiDefinition) => this.apiDoc = apiDoc);

        if(!localStorage.getItem('API-URL')) {
            this.apiUrl = apiDocService.getDefaultApi();
        } else {
            this.apiUrl = localStorage.getItem('API-URL');
        }

    }
}
