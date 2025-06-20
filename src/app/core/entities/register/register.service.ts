import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterPayloadDTO } from './register-payload.dto';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private defaultLink: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public register(payload: RegisterPayloadDTO): Observable<any> {
    return this.http.post(`${this.defaultLink}/pet/register`, payload);
  }
}
