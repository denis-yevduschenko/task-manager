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
import {TaskDetailComponent} from "./components/task-detail/task-detail.component";
import {ErrorComponent} from "./components/error/error.component";
import {TeamComponent} from "./components/team/team.component";


@NgModule({
    imports: [BrowserModule, HttpModule, FormsModule, routes],
    declarations: [AppComponent, TasksComponent, PieComponent, RegisterComponent, LoginComponent,
                    TeamComponent, TaskDetailComponent, ErrorComponent],
    bootstrap: [AppComponent]
})
export class AppModule { 
    
}