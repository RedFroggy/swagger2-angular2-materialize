import {PipeTransform,Pipe} from 'angular2/core';

///<reference path="../../../../../typings/lodash/lodash.d.ts" />

@Pipe({ name: 'values',  pure: false })
export class ValuesPipe implements PipeTransform {
    transform(value: any, args: any[] = null): any {
        return value ? Object.keys(value).map((key) => {return {value:value[key],key:key};}) : value;
    }
}

@Pipe({ name: 'count',  pure: false })
export class CountPipe implements PipeTransform {
    transform(value: any, args: any[] = null): any {
        return value && _.isArray(value)? value.length : 0;
    }
}
