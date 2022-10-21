import { Component } from '@angular/core';
import { GifsService } from '../../gifs/service/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  get results(){
    return this.gifsService.history;
  }

  constructor(
    private gifsService: GifsService
  ) { }

  search( query: string ){
    this.gifsService.loadGifs( query );
  }

}
