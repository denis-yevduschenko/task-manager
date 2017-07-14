import {Component, OnInit} from "@angular/core";
import {Task} from "../../models/Task";
import 'rxjs/add/operator/switchMap';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MyTaskService} from "../../services/myTask.service";
import {UserService} from "../../services/user.services";

@Component({
    moduleId: module.id,
    selector: 'task-detail',
    templateUrl: './task-detail.component.html',
    styleUrls:  ['task-detail.component.css']
})
export class TaskDetailComponent implements OnInit{
    task: Task;

    ngOnInit(): void {
        UserService.checkCredentials(this.router);
    }

    constructor(
        private myTaskService: MyTaskService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.route.params
            .switchMap((params: ParamMap) => this.myTaskService.getTask(+params['id']))
            .subscribe(task => {
                this.task = task[0];
                this.task.created_at = new Date(this.task.created_at);
                this.task.deadline = new Date(this.task.deadline);
            })
    }
}