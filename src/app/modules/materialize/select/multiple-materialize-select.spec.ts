/**
 * Multiple select unit tests
 * Created by Michael DESIGAUD on 20/11/2016.
 */


import {TestBed, ComponentFixture, async} from '@angular/core/testing';
import {MultipleMaterializeSelectComponent} from './multiple-materialize-select';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';


let comp:    MultipleMaterializeSelectComponent;
let fixture: ComponentFixture<MultipleMaterializeSelectComponent>;
let selectEl:      DebugElement;

// Component inputs
let expectedModel: any;
let expectedOptions: [{label: string, value: string, selected: boolean, disabled: boolean}] = [
    {label: 'Application Json', value: 'application/json', selected: true, disabled : false},
    {label: 'Application Xml', value: 'application/xml', selected: false, disabled : false}];

describe('MultipleMaterializeSelectComponent', () => {
    beforeEach(() => {

        // refine the test module by declaring the test component
        TestBed.configureTestingModule({
            declarations: [MultipleMaterializeSelectComponent]
        }).compileComponents();

        // create component and test fixture
        fixture = TestBed.createComponent(MultipleMaterializeSelectComponent);

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
        expect(comp['multiple']).toBeTruthy();
        expect(comp['selectInput']).toBeDefined();
        expect(comp.refresh).toHaveBeenCalled();

        // Test  html is ok
        expect(selectEl.children.length).toBe(expectedOptions.length);

        let ul = $(comp['selectInput']).prev();
        expect(ul).toBeDefined();
        expect(ul.children('li').toArray().length).toBe(expectedOptions.length);
    });

    it('OnChange event should work correctly', async (() => {
        comp.selectValueChange.subscribe((value: any) => {
            expect(value).toBeDefined();
            expect(value).toEqual({selected: [expectedOptions[0].value]});
        });

        $(selectEl.nativeElement).trigger('change');

        expect(comp.model.selected).toEqual([expectedOptions[0].value]);
        expect(comp.isSelected(expectedOptions[0])).toBeTruthy();
        expect(comp.isDisabled(expectedOptions[0])).toBeUndefined();
    }));
});
