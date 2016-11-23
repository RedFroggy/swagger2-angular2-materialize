import {Component} from '@angular/core';
import {ApiDocService} from '../../../services/apidoc.service';
import {ApiDefinition} from '../../../model/api-definition';
import {ThemeableComponent} from '../themeable.component';

@Component({
    selector: 'home',
    template: require('./home.html')
})
export class HomeComponent extends ThemeableComponent {
    private apiDoc: ApiDefinition;
    constructor(private apiDocService: ApiDocService) {
        super();
        this.apiDoc = new ApiDefinition();
        apiDocService.getApi().subscribe((apiDoc: ApiDefinition) => this.apiDoc = apiDoc);
    }
}
