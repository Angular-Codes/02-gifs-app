import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private API_KEY: string = 'OXiP38i6EBocYAuuHcIdORbjXhE5V92J';
  private _history: string[] = [];

  public results: Gif[] = [];

  get history() {
    return [...this._history];
  }

  constructor(
    private http: HttpClient
  ) { }

  searchGifs(query: string = '') {
    query = query.trim().toLowerCase();
    
    if (!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0, 10);
      this.loadGifs(query);
    }
  }

  private loadGifs(query: string = '') {
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this.API_KEY}&q=${query}&limit=10`)
      .subscribe((resp) => {
        this.results = resp.data;
      });
  }



}
