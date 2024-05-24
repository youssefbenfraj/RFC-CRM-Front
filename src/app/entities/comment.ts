import { Post } from "./post";
import { User } from "./user";

export class comment{
    id!: number;
    post!: Post; 
    user!: User; 
    content!: string;
    timestamp!: Date;
}