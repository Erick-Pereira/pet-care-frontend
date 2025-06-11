import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Importando Observable
import { environment } from 'src/environments/environment'; // Se estiver usando ambiente para URL base

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  private defaultLink: string = environment.apiUrl || 'https://localhost:7295/'; // Exemplo de uso de ambiente

  constructor(private http: HttpClient) {}

  // Método de login que agora retorna um Observable
  public logar(username: string, password: string): Observable<any> {
    // Chamando a API de login e retornando um Observable
    return this.http.post(`${this.defaultLink}auth/login`, { username, password });
  }

}
