import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TasksComponent} from "./components/tasks/tasks.component";
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {TaskDetailComponent} from "./components/task-detail/task-detail.component";
import {ErrorComponent} from "./components/error/error.component";
import {TeamComponent} from "./components/team/team.component";

export const router: Routes = [
    { path: '', redirectTo: 'task', pathMatch: 'full'},
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
    { path: 'error', component: ErrorComponent},
    { path: 'task', component: TasksComponent},
    { path: 'team', component: TeamComponent},
    { path: 'detail/:id', component: TaskDetailComponent },
] ;

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
