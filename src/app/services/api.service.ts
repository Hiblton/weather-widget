import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ApiService {

  constructor(private http: Http) {
  }

  getMethod(url: string, searchParams: Object = {}): Observable<any> {

    let params: URLSearchParams = new URLSearchParams();
    Object.keys(searchParams).map((key) => {
      params.set(key, searchParams[key]);
    });

    let options = new RequestOptions({search: params});

    return this.http.get(url, options).map((res: Response) => {
      if (res.statusText === 'OK' && res['_body']) {

        return JSON.parse(res['_body']);
      }
    })
      .catch((error: any) => {
        return Observable.throw(error.json() || 'Server error')
      });
  }

}
