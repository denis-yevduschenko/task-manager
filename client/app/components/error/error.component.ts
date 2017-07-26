import {Component, OnInit} from '@angular/core';

import {Router, ActivatedRoute} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'error',
    templateUrl: 'error.component.html',
})
export class ErrorComponent implements OnInit{
    errorMessage: string;

    ngOnInit(){
        this.route
            .queryParams
            .subscribe(params => {
                this.errorMessage = params['err'] || '';
            });
    }

    constructor(private route: ActivatedRoute, private router: Router) {}
}