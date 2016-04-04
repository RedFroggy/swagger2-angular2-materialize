import {Component,OnInit, forwardRef, Inject} from 'angular2/core';
import {ApiDocService} from '../apidoc.service';
import {ApiDefinition} from '../../model/apidoc';
import {ValuesPipe,CountPipe} from '../../pipes/pipes';
import {ApiMain} from '../main/api.main';
import {PathsObject} from '../../model/apidoc';
import {Router} from 'angular2/router';

@Component({
    selector:'left-menu',
    template:require('./left-menu.html'),
    pipes:[ValuesPipe,CountPipe]
})
export class LeftMenu implements OnInit {
    apiDoc:ApiDefinition;
    constructor(private apiDocService:ApiDocService, private router:Router) {
        this.apiDoc = new ApiDefinition();
    }
    ngOnInit():void {
        this.apiDocService.getApi().subscribe((apiDoc:ApiDefinition) => this.apiDoc = apiDoc);
    }
    onSelectApi(event:Event,index:number):void {
        event.preventDefault();
        this.router.navigate(['ApiDocList',{path:index+1}]);
    }
}
