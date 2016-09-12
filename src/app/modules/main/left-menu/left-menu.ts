import {Component} from '@angular/core';
import {ApiDocService} from '../../../services/apidoc.service';
import {ApiDefinition} from '../../../model/api-definition';
import {PathsObject} from '../../../model/apidoc';
import {Router} from "@angular/router";


@Component({
    selector:'left-menu',
    template:require('./left-menu.html'),
})
export class LeftMenu {
    private apiDoc:ApiDefinition;
    constructor(private apiDocService:ApiDocService, private router:Router) {
        this.apiDoc = new ApiDefinition();
        apiDocService.getApi().subscribe((apiDoc:ApiDefinition) => {
            this.apiDoc = apiDoc;
        });
    }
    onSelectApi(event:Event,apiPath:PathsObject):void {
        event.preventDefault();
        let index:number = 0;
        // This would also work (in most cases):
        // console.log(`index of clicked path ${apiPath.name} is ${this.apiDoc.paths.indexOf(apiPath)}`);
        this.apiDoc.paths.forEach( (path:PathsObject,idx:number) => {
            if(path.name === apiPath.name) {
                index = idx;
            }
        });
        // console.log(`calculated index is: ${index}`)
        this.markApiPathSelected(apiPath);
        this.router.navigate(['apis', index+1]);
    }
    markApiPathSelected (path: PathsObject) {
        this.apiDoc.paths.forEach((path: PathsObject) => path.selected = false);
        path.selected = true;
    }
}
