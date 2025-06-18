import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private apiUrl = 'https://localhost:7295/api/Pet'; // URL base da API

  constructor(private http: HttpClient) { }

  getPetById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
