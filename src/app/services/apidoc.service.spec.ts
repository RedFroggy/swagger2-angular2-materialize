import {ApiDocService} from './apidoc.service';
import {
    Http, BaseRequestOptions, XHRBackend, HttpModule, Response, ResponseOptions, Request,
    RequestOptionsArgs
} from '@angular/http';
import {async, TestBed, inject} from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';

import * as HttpApiMocks from './api_http_mocks';
import {ApiDefinition} from '../model/api-definition';
import {ContactObject, LicenseObject} from '../model/apidoc';
import {Observable} from 'rxjs';

/**
 * Apidoc service unit tests
 * Created by Michael DESIGAUD on 20/11/2016.
 */

describe('ApiDocService', () => {

    let apiDoc: ApiDefinition;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                BaseRequestOptions,
                MockBackend,
                ApiDocService,
                {
                    deps: [
                        MockBackend,
                        BaseRequestOptions
                    ],
                    provide: Http,
                    useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    }
                }
            ],
            imports: [
                HttpModule
            ]
        });
        TestBed.compileComponents();
    }));

    it('Initialization should be ok', async(inject([MockBackend, ApiDocService], (backend: MockBackend, service: ApiDocService) => {
        expect(service.apiUrl).toBe(HttpApiMocks.API_MOCK_URL);
        expect(service.apiValid).toBeFalsy();
    })));

    it('getApi method', async(inject([MockBackend, ApiDocService], (backend: MockBackend, service: ApiDocService) => {
        backend.connections.subscribe(
            (connection: MockConnection) => {
                connection.mockRespond(new Response(
                    new ResponseOptions({
                        body: JSON.stringify(HttpApiMocks.HTTP_GET_API_MOCK)
                    })));
            });

        service.getApi().subscribe((api: any) => {
            apiDoc = new ApiDefinition(HttpApiMocks.HTTP_GET_API_MOCK);
            expect(api).toBeDefined();
            expect(service.apiValid).toBeTruthy();
            expect(apiDoc).toBeDefined();

            expect(apiDoc.info).toBeDefined();
            expect(apiDoc.info.contact).toBeDefined();
            expect(apiDoc.info.contact).toEqual(new ContactObject(HttpApiMocks.HTTP_GET_API_MOCK.info.contact));
            expect(apiDoc.info.license).toBeDefined();
            expect(apiDoc.info.license).toEqual(new LicenseObject(HttpApiMocks.HTTP_GET_API_MOCK.info.license));
            expect(apiDoc.info.description).toBeDefined();
            expect(apiDoc.info.description).toEqual(HttpApiMocks.HTTP_GET_API_MOCK.info.description);
            expect(apiDoc.info.title).toBeDefined();
            expect(apiDoc.info.title).toEqual(HttpApiMocks.HTTP_GET_API_MOCK.info.title);

            expect(apiDoc.paths).toBeDefined();
            expect(apiDoc.paths.length).toBe(Object.keys(HttpApiMocks.HTTP_GET_API_MOCK.paths).length);
            expect(apiDoc.definitions.length).toBe(Object.keys(HttpApiMocks.HTTP_GET_API_MOCK.definitions).length);
            expect(apiDoc.tags.length).toBe(Object.keys(HttpApiMocks.HTTP_GET_API_MOCK.tags).length);

            expect(apiDoc.externalDocs).toBeDefined();
            expect(apiDoc.externalDocs.description).toBeDefined();
            expect(apiDoc.externalDocs.description).toEqual(HttpApiMocks.HTTP_GET_API_MOCK.externalDocs.description);
            expect(apiDoc.externalDocs.url).toBeDefined();
            expect(apiDoc.externalDocs.url).toEqual(HttpApiMocks.HTTP_GET_API_MOCK.externalDocs.url);
        });
    })));
});
