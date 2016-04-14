import {MaterializeCollapsible} from './materialize-collapsible';
import {beforeEachProviders,TestComponentBuilder,injectAsync,ComponentFixture} from 'angular2/testing';
import {Component,ViewChildren,QueryList} from 'angular2/core';

describe('Directive: MaterializeCollapsible', () => {
    let fixture:ComponentFixture;

    beforeEachProviders(() => [TestComponentBuilder]);

    beforeEach(injectAsync([TestComponentBuilder], tcb => {
        return tcb
            .createAsync(Container)
            .then((f:ComponentFixture) => {
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
