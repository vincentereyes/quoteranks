import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AllauthorsComponent } from './allauthors/allauthors.component';
import { NewauthorComponent } from './newauthor/newauthor.component';
import { EditauthorComponent } from './editauthor/editauthor.component';
import { ViewComponent } from './view/view.component';
import { NewquoteComponent } from './newquote/newquote.component';

const routes: Routes = [
	{ path: '', component: AllauthorsComponent},
	{ path: 'new', component: NewauthorComponent},
	{ path: 'edit', component: EditauthorComponent},
	{ path: 'quotes/:id', component: ViewComponent},
	{ path: 'write/:id', component: NewquoteComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }