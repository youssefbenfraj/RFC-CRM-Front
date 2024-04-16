import { Component, OnInit } from '@angular/core';
import { Deal } from 'src/app/entities/deal';
import { DealService } from 'src/app/services/deal.service';

@Component({
  selector: 'app-deal',
 
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.css']
})
export class DealComponent {
  deals: Deal[] = [];


  constructor(private dealService: DealService) { }

  ngOnInit(): void {
    this.getDeals();
  }

  getDeals(): void {
    this.dealService.getDeals().subscribe(
      deals => {
        this.deals = deals;
        console.log('Deals:', this.deals); // Log the deals array to the console
      },
      error => {
        console.error('Error fetching deals:', error); // Log any errors to the console
      }
    );
  }
}
