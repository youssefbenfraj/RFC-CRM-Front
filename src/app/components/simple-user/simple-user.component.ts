import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-simple-user',
  templateUrl: './simple-user.component.html',
  styleUrls: ['./simple-user.component.css']
})
export class SimpleUserComponent {
  selectedUser: any = {};

  constructor( private changeDetector: ChangeDetectorRef) {
    this.getUserFromLocalStorage();
  }

  
  
  triggerChangeDetection(){
    this.changeDetector.detectChanges();
  }

  getUserFromLocalStorage() {
    const userData = localStorage.getItem('user'); // Use 'user' as the key
    if (userData) {
      this.selectedUser = JSON.parse(userData);
      console.log(this.selectedUser); // Log the user object separately
    }
  }
}
