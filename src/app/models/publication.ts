export class Publication{
    constructor(
        public _id:string,
        public text: string,
        public user: string,
        public estado: string,
        public file: string,
        public create_at: string
    ){

    }
}