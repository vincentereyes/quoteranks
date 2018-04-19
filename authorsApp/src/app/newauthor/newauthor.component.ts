import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Activatedroute, Params, Router } from '@angular/router'

@Component({
  selector: 'app-newauthor',
  templateUrl: './newauthor.component.html',
  styleUrls: ['./newauthor.component.css']
})
export class NewauthorComponent implements OnInit {
	newAuthor: any;
  constructor(private _httpService: HttpService,
  	private _router: Router) { }

  ngOnInit() {
  	this.newAuthor = { name: ""}
  }
  addAuthor(name){
  	this.newAuthor.name = name
  	let observable = this._httpService.addAuthor(this.newAuthor)
  	observable.subscribe(data => {
  		if(data.message == "Error"){
  			console.log(data.error)
  			this.error = data.error.name.message
  		}
  		else {
  			this._router.navigate([''])
  		}
  	})
  }
}
