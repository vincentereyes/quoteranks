import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Params, Router } from '@angular/router'
@Component({
  selector: 'app-editauthor',
  templateUrl: './editauthor.component.html',
  styleUrls: ['./editauthor.component.css']
})
export class EditauthorComponent implements OnInit {
	author: any;
	error: any;
  constructor(private _httpService: HttpService,
  	private _router: Router) { }

  ngOnInit() {
  	this.author = this._httpService.author
  }
  save(name){
  	let observable = this._httpService.save(name)
  	observable.subscribe(data => {
  		if((data as any).message == "Error"){
  			this.error = data["error"].name.message
  		}
  		else {
  			this._router.navigate([''])
  		}
  	})
  }
}
 