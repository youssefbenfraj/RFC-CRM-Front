import { subscription } from "./subscription"; 

export class Deal {
    idDeal!: number;
    title!: string;
    description!: string;
    expectedCloseDate!: Date;
    timestamp!: Date;
    subscriptions!: subscription[]; 
}