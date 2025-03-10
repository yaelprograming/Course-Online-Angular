export enum role {
    Teacher = 'teacher',
    Student = 'student',
    Admin = 'admin'
}
export class User {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public role: role
    ) { }
}
export type partUser = Partial<User>;