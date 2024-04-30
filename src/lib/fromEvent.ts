/**
 * @jest-environment jsdom
 */

/**
 * @jest-environment jsdom
 */

import { Observer } from "../types";
import { Observable } from "./observable";

export function fromEvent(
  el: HTMLElement,
  eventName: "click" | "change" | "error" | "input"
) {
    function fromEventProducer(observer: Observer){
      try {
      el.addEventListener(eventName, observer.next);

      return {
        unsubscribe(){
          el.removeEventListener(eventName, observer.next);
          observer.complete();
        }
      }
     } catch (error) {
      observer.error("You should provide a valid html element"); 
      observer.complete();
     } 
    }
  return new Observable(fromEventProducer);
}

