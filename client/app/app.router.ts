import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TasksComponent} from "./components/tasks/tasks.component";
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {ProfileComponent} from "./components/profile/profile.component";

export const router: Routes = [
    { path: '', redirectTo: 'task', pathMatch: 'full'},
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
    { path: 'task', component: TasksComponent},
    { path: 'profile', component: ProfileComponent}
] ;

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
