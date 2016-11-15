import {PipeTransform,Pipe} from '@angular/core';
import {PathsObject} from '../model/apidoc';
import {OperationObject} from '../model/api-operation';

import * as _ from 'lodash';

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
    transform(value: Array<PathsObject>, args: any): any {
        if(!args || _.isEmpty(args)) {
            return value;
        }
        return value.filter((path:PathsObject) => {
            let data:Array<OperationObject> = path.path.operations.filter((operation:OperationObject) => {
                return operation.tags && operation.tags.indexOf(args) !== -1;
            });
            return data && !_.isEmpty(data);
        });
    }
}

@Pipe({ name: 'searchFiler',  pure: false })
export class SearchFilterPipe implements PipeTransform {
    transform(value: Array<PathsObject>, args: any): any {
        let filter:any = args;
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
                return path.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1;
            });
        } else {
            return value;
        }
    }
}