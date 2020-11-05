import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private http: HttpClient) { }

  getTypes(): Observable<any> {
    return this.http.get('https://localhost:44347/api/Categories');
  }

  addType(CategoryName: string, CategoryDesc: string): Observable<any> {
    const body = {
      CategoryName,
      CategoryDesc
    };
    console.log(body)

    return this.http.post('https://localhost:44347/api/Categories', body);
  }

  editCategory(CategoryID: string, CategoryName: string, CategoryDesc: string): Observable<any> {
    const body = {
      CategoryID,
      CategoryName,
      CategoryDesc
    };
    console.log(body)

    return this.http.put('https://localhost:44347/api/Categories/' + CategoryID, body);
  }

  delete(id): Observable<any> {

    return this.http.delete('https://localhost:44347/api/Categories/' + id);
  }
}
