import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppGeneralComponent } from './components/app.component';

@NgModule({
	imports: [BrowserModule, HttpModule, FormsModule],
	declarations: [
		AppGeneralComponent
	],
	bootstrap: [AppGeneralComponent]
})
export class AppModule { }
