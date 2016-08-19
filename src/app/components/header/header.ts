import {Component} from '@angular/core';
import {MaterializeHeader,MaterializeCollapseButton} from '../../directives/materialize-header';
import {ApiDocService} from '../../services/apidoc.service';
import {Router} from "@angular/router";

@Component({
    selector:'header',
    template:require('./header.html'),
    directives:[MaterializeHeader,MaterializeCollapseButton]
})
export class Header {
    constructor(private router:Router,private apiDocService:ApiDocService) {}
    constructor(private apiDocService:ApiDocService) {}
    goToPage($event:Event,...apis):void {
        $event.preventDefault();
        apis.push(1);
        this.router.navigate(apis);
    }
    onChangeApi(event:Event):void {
        event.preventDefault();
        $('#modal1').openModal();
    }
    onCloseModal(event):void {
        event.preventDefault();
        $('#modal1').closeModal();
    }
}
