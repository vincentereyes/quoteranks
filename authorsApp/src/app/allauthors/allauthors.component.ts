import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-allauthors',
  templateUrl: './allauthors.component.html',
  styleUrls: ['./allauthors.component.css']
})
export class AllauthorsComponent implements OnInit {
	authors = [];
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
  	this.getAuthors();
  }

  getAuthors(){
  	let observable = this._httpService.getAuthors();
  	observable.subscribe(data => {
  		this.authors = data.data
  	})
  }
  delete(id){
  	let observable = this._httpService.deleteAuthor(id);
  	observable.subscribe(data => {
  		this.getAuthors()
  	})
  }
  grab(author){
  	console.log(author)
  	this._httpService.grab(author)
  }
  view(author){
  	this._httpService.view(author)
  }
}
