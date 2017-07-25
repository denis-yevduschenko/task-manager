import {Component} from "@angular/core";
import {UserService} from "../../services/user.services";
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'login-form',
    templateUrl: './login.component.html',
    styleUrls:  ['login.component.css']
})
export class LoginComponent {

    username: string;
    password: string;
    message: string;


    login(event: any) {
        let vm = this;
        event.preventDefault();
        const data = {
            username : this.username,
            password : this.password
        };

        this.userService.auth(data).subscribe(user => {
            let localUser = {
                "name": user.name,
                "token": user.auth_token,
                "email": user.email
            };
            localStorage.setItem("user", JSON.stringify(localUser));
            this.userService.loginUser(user);
            this.router.navigate(['/task']);
        },
        err => {
            this.message = this.getErrorMessage(err);
            setTimeout(function () {
                vm.message = "";
            }, 5000);
        });
    }

    public getErrorMessage(err: string): string{
        let str = String(err);
        if (str.indexOf("400") != -1){
            return "Required fields is empty."
        }
        if (str.indexOf("401") != -1){
            return "Wrong username or password."
        }
        return "Unknown problem.";
    }

    constructor(private userService: UserService, private router: Router) {}
}
