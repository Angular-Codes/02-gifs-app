import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private API_KEY: string = 'OXiP38i6EBocYAuuHcIdORbjXhE5V92J';
  private baseUrl: string = 'https://api.giphy.com/v1/gifs';
  private _history: string[] = [];

  public results: Gif[] = [];

  get history() {
    return [...this._history];
  }

  constructor(
    private http: HttpClient
  ) { 
    this._history = JSON.parse(localStorage.getItem('history')!) || [];
    this._history.length && this.loadGifs(this._history[0]);
  }

  searchGifs(query: string = '') {
    query = query.trim().toLowerCase();
    
    if (!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0, 10);
      this.loadGifs(query);
      localStorage.setItem('history', JSON.stringify(this._history));
    }
  }

  loadGifs(query: string) {

    const params = new HttpParams()
                          .set('api_key', this.API_KEY)
                          .set('limit', '10')
                          .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.baseUrl}/search`, { params })
      .subscribe((resp) => {
        this.results = resp.data;
      });
  }

}
