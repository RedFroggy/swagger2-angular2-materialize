
import {Component} from '@angular/core';
import {ApiDocService} from '../../../services/apidoc.service';
import {ApiDefinition} from '../../../model/api-definition';
import {OperationObject} from '../../../model/api-operation';
import {LeftMenu} from '../left-menu/left-menu';
import {PathsObject, DefinitionsObject} from '../../../model/apidoc';
import {TypeModal} from '../../materialize/modals/type.modal';
import {ChartModal} from '../../materialize/modals/chart-modal';
import {Router, ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
    selector:'doc-list',
    template:require('./list.html'),
    // directives:[LeftMenu,TypeModal,ChartModal]
})
export class ApiDocList {
    private apiPath:PathsObject;
    private definition:DefinitionsObject;
    private pathId:number;
    private apiDoc:ApiDefinition;

    private sub: Subscription;

    constructor(private apiDocService:ApiDocService, private router:Router, private route: ActivatedRoute) {}

    ngOnInit() {
        this.apiPath = new PathsObject();
        this.definition = new DefinitionsObject();
        this.apiDoc = new ApiDefinition();

        this.sub = this.route.params.subscribe(params => {
            this.pathId = +params['path'];

            this.apiDocService.getApi().subscribe((apiDoc:ApiDefinition) => {
                this.apiDoc = apiDoc;
                this.apiPath = this.apiDocService.apiDoc.paths[this.pathId-1];
                if(!this.apiPath) {
                    this.router.navigate(['apis', 1]);
                }
            });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    hasStats(operation:OperationObject):boolean {
        if(operation && localStorage.getItem(operation.slug) !== null) {
            let requestTimes:{date:Date,time:number}[] = JSON.parse(localStorage.getItem(operation.slug));
            return requestTimes && !_.isEmpty(requestTimes);
        }
        return false;
    }
    goToDetailPage(event:Event,index:number):void {
        event.preventDefault();
        this.router.navigate(['apis', this.pathId, 'detail', index+1]);
    }
}

