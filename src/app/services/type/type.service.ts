import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private http: HttpClient) { }

  getTypes(): Observable<any> {
    return this.http.get('https://localhost:44347/api/Category');
  }

  addType(CategoryName: string, CategoryDesc: string): Observable<any> {
    const body = {
      CategoryName,
      CategoryDesc
    };
    console.log(body)

    return this.http.post('https://localhost:44347/api/Category', body);
  }

}
