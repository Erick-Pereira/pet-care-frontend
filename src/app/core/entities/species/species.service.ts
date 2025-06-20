import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class SpeciesService {
  private defaultLink: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getSpecies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.defaultLink}/specie`);
  }
}
