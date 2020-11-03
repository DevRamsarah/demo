import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get('https://localhost:44347/api/Users');
  }
  addUser(Email: string, Password: string, LastName: string, FirstName: string, UserName: string, Age: number, Gender: boolean, Role: string): Observable<any> {
    const body = {
      Email: Email,
      Password: Password,
      LastName: LastName,
      FirstName: FirstName,
      UserName: UserName,
      Age: Age,
      Gender: Gender,
      Role: Role,

    };
    console.log(body)

    return this.http.post('https://localhost:44347/api/Users', body);
  }
}
