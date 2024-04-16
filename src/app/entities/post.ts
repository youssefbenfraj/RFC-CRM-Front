import { User } from "./user";
export class Post {
    idPost!: number;
    titlePost!: string;
    contentPost!: string;
    category!: string;
    status!: string; 
    timestamp!: Date;
    user!: User;
}
