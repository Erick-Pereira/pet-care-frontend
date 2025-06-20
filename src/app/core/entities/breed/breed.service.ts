import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class BreedService {
  private defaultLink: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getBreeds(speciesId?: string): Observable<any[]> {
    let url = `${this.defaultLink}/breed`;
    if (speciesId) {
      url += `?filter=speciesId eq "${speciesId}"`;
    }
    return this.http.get<any[]>(url);
  }
}
