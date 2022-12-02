/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class ApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getGet
   */
  static readonly GetGetPath = '/';

  /**
   * Get.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGet$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.GetGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Get.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGet(params?: {
    context?: HttpContext
  }
): Observable<any> {

    return this.getGet$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation getMapMapMapIdGet
   */
  static readonly GetMapMapMapIdGetPath = '/map/{map_id}';

  /**
   * Get Map.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMapMapMapIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMapMapMapIdGet$Response(params: {
    map_id: any;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.GetMapMapMapIdGetPath, 'get');
    if (params) {
      rb.path('map_id', params.map_id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Get Map.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getMapMapMapIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMapMapMapIdGet(params: {
    map_id: any;
    context?: HttpContext
  }
): Observable<any> {

    return this.getMapMapMapIdGet$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation createCreatePost
   */
  static readonly CreateCreatePostPath = '/create';

  /**
   * Create.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createCreatePost()` instead.
   *
   * This method doesn't expect any request body.
   */
  createCreatePost$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.CreateCreatePostPath, 'post');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Create.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createCreatePost$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  createCreatePost(params?: {
    context?: HttpContext
  }
): Observable<any> {

    return this.createCreatePost$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation getAllMapsMapsGet
   */
  static readonly GetAllMapsMapsGetPath = '/maps';

  /**
   * Get All Maps.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllMapsMapsGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllMapsMapsGet$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.GetAllMapsMapsGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Get All Maps.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllMapsMapsGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllMapsMapsGet(params?: {
    context?: HttpContext
  }
): Observable<any> {

    return this.getAllMapsMapsGet$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

}
