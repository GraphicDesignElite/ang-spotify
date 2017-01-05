import { Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: `login.component.html`,
})
export class LoginComponent {
    showDetails: boolean = false;

    displayDetails(){
        this.showDetails = !this.showDetails;
    }
}