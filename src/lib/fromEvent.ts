/**
 * @jest-environment jsdom
 */

/**
 * @jest-environment jsdom
 */

import { Observer } from "../types";

export function fromEvent(
  el: HTMLElement,
  eventName: "click" | "change" | "error" | "input"
) {

  return {
    subscribe(observer: Partial<Observer>){

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
  }
}

