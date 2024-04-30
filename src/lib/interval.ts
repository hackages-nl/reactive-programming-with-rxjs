import { Observer } from "../types";
import { Observable } from "./observable";


export function interval(period: number) {
  function intervalProducer(observer: Partial<Observer>){
    let counter = 0;

    const id = setInterval(() => {
      observer.next(counter++);
    }, period);

    return {
      unsubscribe(){
        clearInterval(id);
        if(observer.complete){
          observer.complete();
        }
      }
    }
  }
  return new Observable(intervalProducer);
}
