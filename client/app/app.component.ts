import { Component } from '@angular/core';
import {TaskService} from './services/task.services'
import {UserService} from "./services/user.services";
import {Router} from "@angular/router";
import {User} from "./Models/User";

@Component({
    moduleId:module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    providers:[TaskService, UserService]
})
export class AppComponent {
    public user: User;
    constructor (private userService: UserService, private router: Router){
        if (localStorage.getItem("user")) {
            this.user = JSON.parse(localStorage.getItem("user"));
        }
    }

    logout(){
        this.userService.logout();
        this.router.navigate(['login']);
        this.user = null;
    }
}