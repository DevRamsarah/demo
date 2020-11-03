import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getArticles(): Observable<any> {
    return this.http.get('https://localhost:44347/api/Articles');
  }

  addArticle(
    Title: string,
    SubTitle: string,
    Description: string,
    Category: string,
    Current_Time: string,
    Headlines: string,
    Slideshow: string
  ): Observable<any> {
    const body = {
      Title,
      SubTitle,
      Description,
      Category,
      Current_Time,
      Headlines,
      Slideshow
    };
    console.log(body)

    return this.http.post('https://localhost:44347/api/Articles', body);
  }
}
