import {Component,OnInit, forwardRef, Inject} from 'angular2/core';
import {ApiDocService} from '../apidoc.service';
import {ApiDefinition} from '../../model/apidoc';
import {ValuesPipe,CountPipe} from '../../pipes/pipes';
import {ApiMain} from '../main/api.main';
import {PathsObject} from '../../model/apidoc';

@Component({
    selector:'left-menu',
    templateUrl:'./app/apidoc/left-menu/left-menu.html',
    pipes:[ValuesPipe,CountPipe]
})
export class LeftMenu implements OnInit {
    apiDoc:ApiDefinition;
    constructor(private apiDocService:ApiDocService, @Inject(forwardRef(() => ApiMain)) private apiMain:ApiMain) {
        this.apiDoc = new ApiDefinition();
    }
    ngOnInit():void {
        this.apiDocService.getApi().subscribe((apiDoc:ApiDefinition) => {
            this.apiDoc = apiDoc;
            this.onSelectApi(null,apiDoc.paths[0]);
        });
    }
    onSelectApi(event:Event,apiPath:PathsObject):void {
        if(event) {
            event.preventDefault();
        }
        this.apiMain.selectListMode(apiPath);
    }
}
