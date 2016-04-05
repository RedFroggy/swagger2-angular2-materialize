import {Component,OnInit, forwardRef, Inject} from 'angular2/core';
import {ApiDocService} from '../apidoc.service';
import {ApiDefinition,PathsObject} from '../../model/apidoc';
import {ValuesPipe,CountPipe,TagFilterPipe} from '../../pipes/pipes';
import {ApiMain} from '../main/api.main';
import {Router} from 'angular2/router';
import {MaterializeCollapsible} from '../../directive/materialize-collapsible';
import {MaterializeCollection} from '../../directive/materialize-collection';

@Component({
    selector:'left-menu',
    template:require('./left-menu.html'),
    pipes:[ValuesPipe,CountPipe,TagFilterPipe],
    directives:[MaterializeCollapsible,MaterializeCollection]
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
        this.apiDoc.paths.forEach( (path:PathsObject,idx:number) => {
            if(path.name === apiPath.name) {
                index = idx;
            }
        });
        this.router.navigate(['ApiDocList',{path:index+1}]);
    }
}
