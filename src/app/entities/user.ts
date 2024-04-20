import { Role } from "./role";

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
}

