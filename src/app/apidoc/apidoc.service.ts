import {Injectable} from 'angular2/core';
import {Http,Response,Request,RequestOptions,Headers} from 'angular2/http';
import * as EnvConfig from '../utils/env.config';
import {Observable} from 'rxjs/Observable';
import {ApiDefinition} from '../model/apidoc';
import {Observer} from 'rxjs/Observer';
import {PathsObject,OperationObject,ApiResult,DefinitionsObject} from '../model/apidoc';

@Injectable()
export class ApiDocService {
    //TODO refacto use only this apiDoc
    private apiDoc:ApiDefinition;
    constructor(private http:Http) {}
    getApi():Observable<ApiDefinition> {
        if(this.apiDoc) {
            return Observable.create((observer:Observer<ApiDefinition>) => {
                return observer.next(this.apiDoc);
            });
        }
        //TODO config
        return this.http.get(EnvConfig.SERVER_ROOT_URL + '/v2/swagger.json').map((res:Response) => {
            this.apiDoc = new ApiDefinition(res.json());
            return this.apiDoc;
        });
    }
    sendRequest(operation:OperationObject):Observable<ApiResult> {
        let apiResult:ApiResult = new ApiResult();

        let reqOptions:RequestOptions = new RequestOptions();
        reqOptions.method = operation.name;
        reqOptions.url = this.apiDoc.baseUrl+operation.getRequestUrl(false);

        if(operation.isGetMethod()) {
            let headers:Headers = new Headers();
            headers.set('Content-Type', operation.produce.selected);
            headers.set('Accept', operation.produce.selected);
            reqOptions.headers = headers;
        }

        if(operation.isPostMethod() || operation.isPutMethod()) {
            reqOptions.body = operation.dataJson;
        } else if(operation.isPatchMethod()) {
            reqOptions.body = operation.patchJson;
        }

        console.log('Calling api with options',reqOptions);
        return this.http.request(new Request(reqOptions)).map((res:Response) => {
            apiResult.operation = operation;
            apiResult.endDate = new Date();
            if(operation.isJson()) {
                apiResult.message = res.json();
            } else {
                apiResult.message = res.text();
            }
            apiResult.status = res.status;

            return apiResult;
        });
    }
}
