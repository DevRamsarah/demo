import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any> {
    return this.http.get('https://localhost:44347/api/Posts');
  }

  addPost(
    UserID: any,
    PostDes: any,
    Headlines: boolean,
    Current_Time: any,
    CategoryID: any,
    Like: any,
    Dislike: any,

  ): Observable<any> {
    const body = {

      UserID,
      PostDes,
      Headlines,
      Current_Time,
      CategoryID,
      Like,
      Dislike,

    };
    console.log(body)

    return this.http.post('https://localhost:44347/api/Posts', body);
  }

  delete(id): Observable<any> {

    return this.http.delete('https://localhost:44347/api/Posts/' + id);
  }
}
