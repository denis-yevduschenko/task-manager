import { Component, OnOnit } from '@angular/core';
import { TaskService } from '../../services/task.services';
import { Task } from '../../../../models/Task';
import {UserService} from "../../services/user.services";
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'tasks',
    templateUrl: 'tasks.component.html',
})
export class TasksComponent implements OnOnit{
    tasks: Task[];
    title: string;

    updateStatus(task: Task) {
        var _task = {
            _id: task._id,
            title: task.title,
            detail: task.detail,
            implementer: task.implementer,
            isDone: !task.isDone
        }

        this.taskService.updateStatus(_task)
            .subscribe(data => {
                task.isDone = !task.isDone;
                console.log('updated inside tasks component');
                this.taskService.tasksUpdated.emit(this.tasks);
            },
            error => {
                this.router.navigate(['error'], { queryParams: { err: error } });
            })
    }

    addTask(event: any) {
        event.preventDefault();
        console.log(this.title);
        let user;

        if (localStorage.getItem("user")) {
            user = JSON.parse(localStorage.getItem("user"));
        }

        let newTask: Task = {
            title: this.title,
            description: this.description,
            author: user._id,
            assignee: this.assignee,
            deadline: this.deadline,
            sub_task: this.sub_task,
            created_at: new Date(),
            status: false
        };

        this.taskService.addTask(newTask)
            .subscribe(savedTask => {
                this.tasks.push(savedTask);
                this.title = "";
                this.description = "";
                this.assignee = "";
                this.deadline = "";
                this.sub_task = "";
                this.taskService.tasksUpdated.emit(this.tasks);
            },
            error => {
                this.router.navigate(['error'], { queryParams: { err: error } });
            })

    }

    deleteTask(id: any) {
        var tasks = this.tasks;
        this.taskService.deleteTask(id).subscribe(data => {
            if (data.n == 1) {
                for (var i = 0; i < tasks.length; i++) {
                    if (tasks[i]._id == id) {
                        tasks.splice(i, 1);
                        this.taskService.tasksUpdated.emit(this.tasks);
                    }
                }
            }
        },
        error => {
            this.router.navigate(['error'], { queryParams: { err: error } });
        });

    }

    ngOnInit(){
        UserService.checkCredentials(this.router);
    }

    constructor(private taskService: TaskService, private router: Router) {
        this.taskService
            .getTasks()
            .subscribe(tasks => {
                this.tasks = tasks;
                this.taskService.tasksUpdated.emit(this.tasks);
            },
            error => {
                this.router.navigate(['login']);
            });
    }
}