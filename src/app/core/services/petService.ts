import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Especie {
  id: string;
  name: string;
}

export interface Raca {
  id: string;
  name: string;
  speciesId: string;
}

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private especiesUrl = 'https://localhost:7295/api/Specie';
  private racasUrl = 'https://localhost:7295/api/Breed';

  constructor(private http: HttpClient) {}

  getEspecies(): Observable<Especie[]> {
    return this.http.get<Especie[]>(this.especiesUrl);
  }

  getRacas(): Observable<Raca[]> {
    return this.http.get<Raca[]>(this.racasUrl);
  }
}