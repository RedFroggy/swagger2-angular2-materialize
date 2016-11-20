/**
 * Simple select unit tests
 * Created by Michael DESIGAUD on 19/11/2016.
 */

import {TestBed, ComponentFixture, async} from '@angular/core/testing';
import {SimpleMaterializeSelectComponent} from './simple-materialize-select';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';


let comp:    SimpleMaterializeSelectComponent;
let fixture: ComponentFixture<SimpleMaterializeSelectComponent>;
let selectEl:      DebugElement;

// Component inputs
let expectedModel: any;
let expectedOptions: [{label: string, value: string}] = [
    {label: 'Application Json', value: 'application/json'},
    {label: 'Application Xml', value: 'application/xml'}];

describe('SimpleMaterializeSelectComponent', () => {
    beforeEach(() => {

        // refine the test module by declaring the test component
        TestBed.configureTestingModule({
            declarations: [SimpleMaterializeSelectComponent]
        }).compileComponents();

        // create component and test fixture
        fixture = TestBed.createComponent(SimpleMaterializeSelectComponent);

        // get test component from the fixture
        comp = fixture.componentInstance;

        selectEl = fixture.debugElement.query(By.css('select'));

        expectedModel = {};
        comp.model = expectedModel;
        comp.options = expectedOptions;
        comp.selected = expectedOptions[0].value;

        spyOn(console, 'log');
        spyOn(comp, 'refresh').and.callThrough();

        fixture.detectChanges(); // trigger initial data binding
    });

    it('Should be correctly initialized', () => {
        expect(selectEl).toBeDefined();
        expect(comp['multiple']).toBeFalsy();
        expect(comp['selectInput']).toBeDefined();
        expect(comp.refresh).toHaveBeenCalled();

        // Test  html is ok
        expect(selectEl.children.length).toBe(expectedOptions.length);
    });

    it('OnChange event should work correctly', async (() => {
        comp.selectValueChange.subscribe((value: any) => {
            expect(value).toBeDefined();
            expect(value).toEqual({selected: expectedOptions[0].value});
        });

        $(selectEl.nativeElement).trigger('change');

        expect(console.log).toHaveBeenCalledWith(expectedOptions[0].value);
        expect(comp.model.selected).toBe(expectedOptions[0].value);
        expect(comp.isSelected(expectedOptions[0])).toBeTruthy();
        expect(comp.isDisabled(expectedOptions[0])).toBeNull();
    }));
});

