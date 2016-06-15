import {Component} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {MaterializeHeader,MaterializeCollapseButton} from '../../directives/materialize-header';
import {ApiDocService} from '../../services/apidoc.service';

@Component({
    selector:'header',
    template:require('./header.html'),
    directives:[MaterializeHeader,MaterializeCollapseButton]
})
export class Header {
    constructor(private router:Router,private apiDocService:ApiDocService) {}
    goToPage($event:Event,...apis):void {
        $event.preventDefault();
        apis.push({path:1});
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
