import {Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {BaseResourceModel} from '../models/base-resource.model';

export abstract class BaseResourceService<T extends BaseResourceModel> {

  protected http:HttpClient;

  protected constructor(
    protected apiPath: string,
    protected injector:Injector,
    protected jsonDataToResouceFn: (jsonData: any) => T
  ) {
      this.http = injector.get(HttpClient);
  }

  getAll():Observable<T[]>{
    return this.http.get(this.apiPath)
      .pipe(
        map(this.jsonDataToResources.bind(this)),
        catchError(this.handleError)
      )
  }

  getById(id: number): Observable<T> {
    const url = `${this.apiPath}/${id}`;
    return this.http.get(url).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)

    )
  }

  create(resource: T): Observable<T> {
    return this.http.post(this.apiPath,  resource).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)
    )
  }

  update(resource: T): Observable<T> {
    const url = `${this.apiPath}/${resource.id}`;
    return this.http.put(url,  resource).pipe(
      map(() => resource),
      catchError(this.handleError)
    )
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }

  // PROTECTED METHODS
  protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];
    // jsonData.forEach(element => resources.push(element as T));
    jsonData.forEach(element => resources.push(this.jsonDataToResouceFn(element)));
    return  resources;
  }

  protected handleError(error: any): Observable<any> {
    console.error('ERRO NA REQUISIÇÂO => ', error);
    return throwError(error);
  }

  protected jsonDataToResource(jsonData: any): T {
    // return jsonData as T;
    return this.jsonDataToResouceFn(jsonData);
  }

}
