import { Role } from "./role";
import { Post } from "./post"; 
import { subscription } from "./subscription";
import { likePost } from "./likePost";
import { comment } from "./comment";


export class User {
    idUser!: number;
    firstName!: string;
    lastName!: string;
    birthDay!: Date;
    address!: string;
    mail!: string;
    telNumber!: string;
    role!: Role;
    password!: string;
    approuvement!: boolean;
    posts!: Post[]; 
    comments!: comment[]; 
    likePosts!: likePost[]; 
    subscriptions!: subscription[]; 
    propic!: string; // Profile Picture
}