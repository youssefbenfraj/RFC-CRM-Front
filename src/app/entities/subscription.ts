import { Deal } from "./deal";
import { User } from "./user";

export class subscription {
    idSubscription!: number;
    subscriptionDate!: Date;
    status!: string;
    deal!: Deal; 
    user!: User; 
}