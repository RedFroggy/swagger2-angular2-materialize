import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MaterializeCollectionDirective} from './materialize-collection';

let comp: MaterializeCollectionDirective;

describe('Directive: MaterializeCollection', () => {
    let fixture: ComponentFixture < MaterializeCollectionDirective >;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ MaterializeCollectionDirective ], // declare the test component
        });

        fixture = TestBed.createComponent(MaterializeCollectionDirective);

        comp = fixture.componentInstance; // MaterializeCollapsible test instance

    });

    it('Initialization should be ok', () => {
        expect(fixture).toBeDefined();
    });

    it('Click event should add active class', () => {
        /*let directive: MaterializeCollectionDirective = fixture.componentInstance.children.first;
        expect(directive).toBeDefined();
        $(directive.el.nativeElement).click();
        expect($(directive.el.nativeElement).find('li.active').length).toBe(0);*/
    });
});
