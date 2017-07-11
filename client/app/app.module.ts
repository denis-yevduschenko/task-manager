import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { PieComponent } from './components/pie/pie.component';
import { RegisterComponent } from "./components/register/register.component";
import { FormsModule} from '@angular/forms';
import { routes } from './app.router';
import {LoginComponent} from "./components/login/login.component";
import {ProfileComponent} from "./components/profile/profile.component";


@NgModule({
    imports: [BrowserModule, HttpModule, FormsModule, routes],
    declarations: [AppComponent, TasksComponent, PieComponent, RegisterComponent, LoginComponent, ProfileComponent],
    bootstrap: [AppComponent]
})
export class AppModule { 
    
}