import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getArticles(): Observable<any> {
    console.log(`${environment.apiUrl}`)
    return this.http.get(`${environment.apiUrl}/Articles`);
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

    return this.http.post(`${environment.apiUrl}/Articles`, body);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/Articles/${id}`);
  }

  editArticle(ArticleID: string,
    Title: string,
    SubTitle: string,
    Description: string,
    Category: string,
    Current_Time: string,
    Headlines: string,
    Slideshow: string
  ): Observable<any> {
    const body = {
      ArticleID,
      Title,
      SubTitle,
      Description,
      Category,
      Current_Time,
      Headlines,
      Slideshow
    };
    console.log(body)
    return this.http.put(`${environment.apiUrl}/Articles/${ArticleID}`, body);

  }
}
