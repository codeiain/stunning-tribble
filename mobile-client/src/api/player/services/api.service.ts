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

import { Player } from '../models/player';

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
   * Path part for operation addPlayerPlayerPost
   */
  static readonly AddPlayerPlayerPostPath = '/player';

  /**
   * Add Player.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addPlayerPlayerPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addPlayerPlayerPost$Response(params: {
    context?: HttpContext
    body: Player
  }
): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.AddPlayerPlayerPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
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
   * Add Player.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addPlayerPlayerPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addPlayerPlayerPost(params: {
    context?: HttpContext
    body: Player
  }
): Observable<any> {

    return this.addPlayerPlayerPost$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation getPlayerPlayerPlayerIdGet
   */
  static readonly GetPlayerPlayerPlayerIdGetPath = '/player/{player_id}';

  /**
   * Get Player.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPlayerPlayerPlayerIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPlayerPlayerPlayerIdGet$Response(params: {
    player_id: any;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.GetPlayerPlayerPlayerIdGetPath, 'get');
    if (params) {
      rb.path('player_id', params.player_id, {});
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
   * Get Player.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPlayerPlayerPlayerIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPlayerPlayerPlayerIdGet(params: {
    player_id: any;
    context?: HttpContext
  }
): Observable<any> {

    return this.getPlayerPlayerPlayerIdGet$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation updatePlayerPlayerPlayerIdPost
   */
  static readonly UpdatePlayerPlayerPlayerIdPostPath = '/player/{player_id}';

  /**
   * Update Player.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePlayerPlayerPlayerIdPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePlayerPlayerPlayerIdPost$Response(params: {
    player_id: string;
    context?: HttpContext
    body: Player
  }
): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.UpdatePlayerPlayerPlayerIdPostPath, 'post');
    if (params) {
      rb.path('player_id', params.player_id, {});
      rb.body(params.body, 'application/json');
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
   * Update Player.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updatePlayerPlayerPlayerIdPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePlayerPlayerPlayerIdPost(params: {
    player_id: string;
    context?: HttpContext
    body: Player
  }
): Observable<any> {

    return this.updatePlayerPlayerPlayerIdPost$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

}
