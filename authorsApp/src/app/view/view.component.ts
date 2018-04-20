import { Component, OnInit } from '@angular/core';
import { Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
	author: any;
  constructor(
    private _router: Router,
    private _httpService: HttpService
    ) { }

  ngOnInit() {
  	this.author = { _id : 0}
  	let observable = this._httpService.grabId(this._httpService.author._id);
  	observable.subscribe(data => {
  		this.author = data["data"]

  		this.author.quotes.sort(function(a, b){
  			return b.vote - a.vote;
  		})
  	})
  }
  delete(quote){
  	let observable = this._httpService.delete(quote)
  	observable.subscribe(data => {
  		console.log(data)
  		if((data as any).message == "Success"){
  			this.ngOnInit()
  		}
  	})

  }
  up(quote){
  		let observable = this._httpService.up(quote)
  		observable.subscribe(data => {
  			if((data as any).message == "Success"){
  				this.ngOnInit()
  			}
  		})
  	}
  	down(quote){
  		let observable = this._httpService.down(quote)
  		observable.subscribe(data => {
  			if((data as any).message == "Success"){
  				this.ngOnInit()
  			}
  		})
  	}
}
