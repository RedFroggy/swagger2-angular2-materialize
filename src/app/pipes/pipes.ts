import {PipeTransform,Pipe} from 'angular2/core';
import {PathsObject,OperationObject} from '../model/apidoc';

///<reference path="../../../typings/browser/ambient/lodash/index.d.ts" />

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

@Pipe({ name: 'tagFiler',  pure: false })
export class TagFilterPipe implements PipeTransform {
    transform(value: Array<PathsObject>, args: string[] = null): any {
        if(!args || _.isEmpty(args)) {
            return value;
        }
        return value.filter((path:PathsObject) => {
            let data:Array<OperationObject> = path.path.operations.filter((operation:OperationObject) => {
                return operation.tags && operation.tags.indexOf(args[0]) !== -1;
            });
            return data && !_.isEmpty(data);
        });
    }
}

@Pipe({ name: 'searchFiler',  pure: false })
export class SearchFilterPipe implements PipeTransform {
    transform(value: Array<PathsObject>, args: string[] = null): any {
        let filter:any = args[0];
        if (filter && _.isArray(value)) {

            let allUndefined:boolean = true;
            Object.keys(filter).forEach((key:string) => {
                if(filter[key]) {
                    allUndefined = false;
                }
            });

            if(allUndefined) {
                return value;
            }

            return value.filter((path:PathsObject) => {
                console.log(path.name.toLowerCase(),filter.name.toLowerCase());
                return path.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1;
            });
        } else {
            return value;
        }
    }
}
