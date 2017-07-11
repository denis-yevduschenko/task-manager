import {Component} from "@angular/core";
import {UserService} from "../../services/user.services";
import {User} from "../../models/User";
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'register-form',
    templateUrl: './register.component.html',
    styleUrls:  ['register.component.css']
})
export class RegisterComponent {

    name: string;
    email: string;
    username: string;
    password: string;
    confirm: string;

    addUser(event: any) {
        event.preventDefault();
        console.log(this);

        var newUser: User = {
            _id: null,
            name: this.name,
            email: this.email,
            username: this.username,
            password: this.password,
            confirm: this.confirm
        };

        this.userService.addUser(newUser).subscribe(saved => {
            console.log(saved);
            this.router.navigate(['/task']);
        });
    }

    constructor(private userService: UserService, private router: Router) {
    }
}