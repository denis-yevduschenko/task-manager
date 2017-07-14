import {Component, OnInit} from "@angular/core";
import {Task} from "../../models/Task";
import 'rxjs/add/operator/switchMap';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {UserService} from "../../services/user.services";
import {TaskService} from "../../services/task.services";

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
        private taskService: TaskService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.route.params
            .switchMap((params: ParamMap) => this.taskService.getTask(+params['id']))
            .subscribe(task => {
                this.task = task[0];
                this.task.created_at = new Date(this.task.created_at);
                this.task.deadline = new Date(this.task.deadline);
            })
    }
}