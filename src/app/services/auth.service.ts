import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7295/api/Auth/login';

  constructor(
    private http: HttpClient,
    @Inject(CookieService) private cookieService: CookieService
  ) {}

  login(username: string, password: string): Observable<{ token: string }> {
    const body = { username, password };

    return this.http.post<{ token: string }>(this.apiUrl, body).pipe(
      tap((response: { token: string }) => {
        const token = response.token;
        if (token) {
          const expireDate = new Date();
          expireDate.setHours(expireDate.getHours() + 1);
          this.cookieService.set('auth_token', token, expireDate);
        }
      })
    );
  }

  isAuthenticated(): boolean {
    const token = this.cookieService.get('auth_token');
    return !!token;
  }
}

