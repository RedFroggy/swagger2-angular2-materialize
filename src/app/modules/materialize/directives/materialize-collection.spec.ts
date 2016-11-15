import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MaterializeCollection} from './materialize-collection';

let comp:MaterializeCollection;

describe('Directive: MaterializeCollection', () => {
    let fixture:ComponentFixture<any>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ MaterializeCollection ], // declare the test component
        });

        let fixture: ComponentFixture<MaterializeCollection> = TestBed.createComponent(MaterializeCollection);

        comp = fixture.componentInstance; // MaterializeCollapsible test instance

    });

    it('Initialization should be ok', () => {
        expect(fixture).toBeDefined();
    });

    it('Click event should add active class', () => {
        let directive:MaterializeCollection = fixture.componentInstance.children.first;
        expect(directive).toBeDefined();
        /*$(directive.el.nativeElement).click();
        expect($(directive.el.nativeElement).find('li.active').length).toBe(0);*/
    });
});
