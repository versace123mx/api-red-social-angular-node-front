export class Message{
    constructor(
        public _id:string,
        public emmiter:string,
        public receiver: string,
        public text: string,
        public estado: boolean,
        public view: boolean,
        public create_at: string
    ){

    }
}