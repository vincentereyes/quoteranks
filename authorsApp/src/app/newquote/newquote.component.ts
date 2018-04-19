import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-newquote',
  templateUrl: './newquote.component.html',
  styleUrls: ['./newquote.component.css']
})
export class NewquoteComponent implements OnInit {
	newQuote: any;
	error: any;
  constructor(private _httpService: HttpService,
  	private _router: Router;) { }

  ngOnInit() {
  	this.newQuote = {quote: ""};
  	this.author = this._httpService.author;
  	console.log(this.author)
  }
  onSubmit() {
  	let observable = this._httpService.newQuote(this.newQuote);
  	observable.subscribe(data => {
  		let index = this.author.quotes.length;
  		if (data.message == "Error") {
  			this.error = data.error["quotes." + index + ".quote"].message;
  		} else {
  			this._router.navigate(['/quotes/' + this.author._id])
  		}
  	})
  }



}
