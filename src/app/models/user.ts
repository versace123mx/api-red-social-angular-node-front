export class User{
    constructor(
        public name: string,
        public surname: string,
        public nick: string,
        public email: string,
        public password: string,
        public role: string,
        public imagen: string,
        public estado: boolean,
        public bio: string
    ){
        

    }
}