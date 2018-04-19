import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';

import { AppComponent } from './app.component';
import { AllauthorsComponent } from './allauthors/allauthors.component';
import { NewauthorComponent } from './newauthor/newauthor.component';
import { EditauthorComponent } from './editauthor/editauthor.component';

import { FormsModule } from '@angular/forms';
import { ViewComponent } from './view/view.component';
import { NewquoteComponent } from './newquote/newquote.component';

@NgModule({
  declarations: [
    AppComponent,
    AllauthorsComponent,
    NewauthorComponent,
    EditauthorComponent,
    ViewComponent,
    NewquoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
