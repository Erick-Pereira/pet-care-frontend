import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  private defaultLink: string = environment.apiUrl || 'https://localhost:7295/';

  constructor(private http: HttpClient) {}

  public register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.defaultLink}auth/register`, { username, password });
  }

}
