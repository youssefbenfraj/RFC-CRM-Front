import { Role } from "./role";

export class User {
    idUser!: number;
    name!: string;
    email!: string;
    country!: string;
    password!: string;
    role!: Role;
}

