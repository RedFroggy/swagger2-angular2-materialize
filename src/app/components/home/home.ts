import {Component} from 'angular2/core';
import {ApiDocService} from '../../services/apidoc.service';
import {ApiDefinition} from '../../model/api-definition';

@Component({
    selector:'home',
    template:require('./home.html')
})
export class Home {
    private apiDoc:ApiDefinition;
    constructor(private apiDocService:ApiDocService) {
        this.apiDoc = new ApiDefinition();
        apiDocService.getApi().subscribe((apiDoc:ApiDefinition) => this.apiDoc = apiDoc);
    }
}
