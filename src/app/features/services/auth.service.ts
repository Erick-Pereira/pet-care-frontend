import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:7295/api/Auth/login';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(username: string, password: string): Observable<any> {
    const body = { username, password };

    return this.http.post<any>(this.apiUrl, body).pipe(
      tap(response => {
        const token = response.token;
        if (token) {
          const expireDate = new Date();
          expireDate.setHours(expireDate.getHours() + 1);
          this.cookieService.set('auth_token', token, expireDate);
        }
      })
    );
  }
}

