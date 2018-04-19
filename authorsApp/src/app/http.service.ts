import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
	author: any;
  constructor(private _http: HttpClient) { }

  getAuthors(){
  	return this._http.get('/authors')
  }
  addAuthor(newAuthor){
  	console.log(newAuthor)
  	return this._http.post('/author', newAuthor)
  }
  deleteAuthor(id){
  	console.log(id)
  	return this._http.delete('/author/delete/' + id)
  }
  grab(author){
  	this.author = author;
  }
  grabId(id){
  	return this._http.get('/' + id)
  }
  save(name){
  	this.author.name = name;
  	return this._http.put('/author/edit/' + this.author._id, this.author)
  }
  view(author){
  	this.author = author;
  }
  newQuote(quote){
  	return this._http.put('/author/quote/' + this.author._id, quote)
  }
  delete(quote){
  	return this._http.put('/author/' + this.author._id, quote)
  }
  up(quote){
  	return this._http.put('/author/up/' + this.author._id, quote)
  }
  down(quote){
  	return this._http.put('/author/down/' + this.author._id, quote)
  }
}
