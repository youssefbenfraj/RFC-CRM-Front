  import { Component, OnInit } from '@angular/core';
  import { Deal } from 'src/app/entities/deal';
  import { DealService } from 'src/app/services/deal.service';
  import { User } from 'src/app/entities/user';
  import { subscription } from 'src/app/entities/subscription';
  import { SubscriptionService } from 'src/app/services/subscription.service';
  
  
  @Component({
    selector: 'app-deal',
    templateUrl: './deal.component.html',
    styleUrls: ['./deal.component.css']
  })
  export class DealComponent implements OnInit {
    deals: Deal[] = [];
    selectedUser: any = {};
    selectedDeal!: Deal; // The deal to which the user wants to subscribe
    newSubscriptionContent!: string;
  
    constructor(
      private dealService: DealService,
      private subscriptionService: SubscriptionService,
    ) {}
  
    ngOnInit(): void {
      this.getUserFromLocalStorage();
      this.getDeals();
    }
  
    getUserFromLocalStorage() {
      const userData = localStorage.getItem('user');
      if (userData) {
        this.selectedUser = JSON.parse(userData);
        console.log(this.selectedUser);
      }
    }
  
    createSubscription(deal: Deal) {
      if (!this.selectedUser) {
        console.error('No user is logged in');
        return;
      }
  
      const newSubscription: subscription = {
        idSubscription: 0, // Will be set by the backend
        subscriptionDate: new Date(), // Current subscription date
        status: 'ACTIVE', // Status of the subscription
        deal: deal, // The deal to which the user is subscribing
        user: this.selectedUser, // The user subscribing to the deal
      };
  
      this.subscriptionService.createSubscription(deal.idDeal, this.selectedUser.idUser, newSubscription).subscribe({
        next: (response) => {
          console.log('Subscription created:', response);
          alert('Subscription created successfully!'); // Display success message
        },
        error: (err) => {
          console.error('Error creating subscription:', err);
          alert(err.error); // Display error message
        },
      });
    }
    
    getDeals(): void {
      this.dealService.getDeals().subscribe(
        deals => {
          this.deals = deals;
          console.log('Deals:', this.deals);
        },
        error => {
          console.error('Error fetching deals:', error);
        }
      );
    }
  }
  