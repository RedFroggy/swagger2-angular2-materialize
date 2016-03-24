import {Component} from 'angular2/core';
import {ApiDocService} from '../apidoc/apidoc.service';
import {Response} from 'angular2/http';
import {ApiDefinition} from '../model/apidoc';

@Component({
    selector:'home',
    templateUrl:'./app/home/home.html',
    providers:[ApiDocService]
})
export class Home {
    apiDoc:ApiDefinition;
    constructor(private apiDocService:ApiDocService) {
        this.apiDoc = new ApiDefinition();
    }
    ngOnInit():void {
        this.apiDocService.getApi().subscribe((apiDoc:ApiDefinition) => this.apiDoc = apiDoc);
    }
}
