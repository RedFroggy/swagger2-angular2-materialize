
import {Component,DynamicComponentLoader, Injector,Inject,forwardRef} from 'angular2/core';
import {ApiDocService} from '../apidoc.service';
import {ApiDefinition} from '../../model/apidoc';
import {ApiDocDetail} from '../detail/detail';
import {Host} from 'angular2/core';
import {RouteParams,Router} from 'angular2/router';
import {LeftMenu} from '../left-menu/left-menu';
import {ApiMain} from '../main/api.main';
import {PathsObject, OperationObject, DefinitionsObject} from '../../model/apidoc';
import {TypeModal} from '../modals/type.modal';

@Component({
    selector:'doc-list',
    template:require('./list.html'),
    directives:[LeftMenu,TypeModal]
})
export class ApiDocList {
    private apiPath:PathsObject;
    private definition:DefinitionsObject;
    private pathId:number;
    private apiDoc:ApiDefinition;
    constructor(private apiDocService:ApiDocService, private router:Router,private routeParams:RouteParams) {
        this.apiPath = new PathsObject();
        this.definition = new DefinitionsObject();
        this.apiDoc = new ApiDefinition();

        this.apiDocService.getApi().subscribe((apiDoc:ApiDefinition) => {
            this.apiDoc = apiDoc;
            this.pathId = parseInt(routeParams.get('path'));
            this.apiPath = this.apiDocService.apiDoc.paths[this.pathId-1];
            if(!this.apiPath) {
                this.router.navigate(['ApiDocList', {path: 1}]);
            }
        });
    }
    hasStats(index:number):boolean {
        return false;
    }
    goToDetailPage(event:Event,index:number):void {
        event.preventDefault();
        this.router.navigate(['ApiDocDetail',{path:this.pathId,operation:index+1}]);
    }
}

