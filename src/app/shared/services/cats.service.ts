import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CatsService {
  private urlCats = environment.URL_BASE;
  private apiKey = environment.API_KEY;

  constructor(private http: HttpClient) { }

  getCats() {
    const url = `${this.urlCats}/breeds`;
    const headers = new HttpHeaders().set('X-API-Key', this.apiKey);
    return this.http.get(url, { headers });
  }

  imageCat(idReference:string){
      return this.http.get(`${this.urlCats}/images/${idReference}`);
  }
}
