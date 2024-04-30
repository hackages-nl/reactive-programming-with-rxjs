import { Observer, Producer } from "../types";

export class Observable {
    constructor(public producer: Producer){}
    
    subscribe(observer: Observer){
        return this.producer(observer);
    }
}
