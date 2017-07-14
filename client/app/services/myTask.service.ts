import {Injectable} from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Task } from '../models/Task';
import { Router } from "@angular/router";

@Injectable()
export class MyTaskService {

    constructor(private http: Http) {
        console.log('User Service Initialised ...');
    }

    getTask(id: number){
        return this.http.get('/tasks/task/' + id)
            .map(res => res.json());
    }

}
