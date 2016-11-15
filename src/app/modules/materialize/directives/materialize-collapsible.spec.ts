/// <reference path="../../../../../node_modules/@types/jasmine/index.d.ts" />

import {MaterializeCollapsible} from './materialize-collapsible';
import { ComponentFixture, TestBed } from '@angular/core/testing';

let comp:MaterializeCollapsible;


describe('Directive: MaterializeCollapsible', () => {
    let fixture:ComponentFixture<any>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ MaterializeCollapsible ], // declare the test component
        });

        let fixture: ComponentFixture<MaterializeCollapsible> = TestBed.createComponent(MaterializeCollapsible);

        comp = fixture.componentInstance; // MaterializeCollapsible test instance

    });

    it('Initialization should be ok', () => {
        let directive:MaterializeCollapsible = fixture.componentInstance.children.first;
        expect(directive).toBeDefined();
    });
});
