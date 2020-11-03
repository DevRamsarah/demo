import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getComments(): Observable<any> {
    return this.http.get('https://localhost:44347/api/Comment');
  }
  addComment(
    UserID: string,
    PostID: string,
    CommentDes: string,
    Current_Time: string,
    Trend: string,
    Anonyma: string
  ): Observable<any> {
    const body = {
      UserID,
      PostID,
      CommentDes,
      Current_Time,
      Trend,
      Anonyma
    };
    console.log(body)

    return this.http.post('https://localhost:44347/api/Comment', body);
  }
}
