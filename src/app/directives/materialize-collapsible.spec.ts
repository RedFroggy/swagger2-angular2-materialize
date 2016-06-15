import {MaterializeCollapsible} from './materialize-collapsible';
import {beforeEachProviders,injectAsync} from '@angular/core/testing';
import {TestComponentBuilder,ComponentFixture} from '@angular/compiler/testing';
import {Component,ViewChildren,QueryList} from '@angular/core';

describe('Directive: MaterializeCollapsible', () => {
    let fixture:ComponentFixture<any>;

    beforeEachProviders(() => [TestComponentBuilder]);

    beforeEach(injectAsync([TestComponentBuilder], tcb => {
        return tcb
            .createAsync(Container)
            .then((f:ComponentFixture<any>) => {
                f.detectChanges();
                fixture = f;
            });
    }));

    it('Initialization should be ok', () => {
        let directive:MaterializeCollapsible = fixture.componentInstance.children.first;
        expect(directive).toBeDefined();
    });
});

@Component({
    selector: 'container',
    template: `<ul materialize-collapsible></ul>`,
    directives: [MaterializeCollapsible]
})
export class Container {
    @ViewChildren(MaterializeCollapsible) children:QueryList<MaterializeCollapsible>;
}
