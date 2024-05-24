import { User } from "./user";
import { likePost } from "./likePost"; // Import LikePost
import { comment } from "./comment";

export class Post {
    idPost!: number;
    titlePost!: string;
    contentPost!: string;
    category!: string;
    status!: string; 
    timestamp!: Date;
    user!: User;
    comments!: comment[]; 
    likePosts!: likePost[];
    showComments: boolean = false; // Initially, comments are hidden

}