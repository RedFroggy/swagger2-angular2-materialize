/// <reference path="../../../../../node_modules/@types/jasmine/index.d.ts" />

import {MaterializeCollapsibleDirective} from './materialize-collapsible';
import { ComponentFixture, TestBed } from '@angular/core/testing';

let comp: MaterializeCollapsibleDirective;


describe('Directive: MaterializeCollapsible', () => {
    let fixture: ComponentFixture<MaterializeCollapsibleDirective>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ MaterializeCollapsibleDirective ], // declare the test component
        });

        fixture = TestBed.createComponent(MaterializeCollapsibleDirective);
        comp = fixture.componentInstance; // MaterializeCollapsible test instance

    });

    it('Initialization should be ok', () => {
        /*let directive: MaterializeCollapsibleDirective = fixture.componentInstance.children.first;
        expect(directive).toBeDefined();*/
    });
});
