/**
 * @jest-environment jsdom
 */

// import {describe, it, expect} from 'vitest';
import { Observer, Subscription } from "../types";
import { fromEvent } from "./fromEvent";
import { mapTo } from "./mapTo";
import { Observable } from "./observable";
describe("mapTo operator", () => {
  it("should be a function", () => {
    expect(mapTo).toBeTruthy();
    expect(typeof mapTo).toBe("function");
  });

  it("should take 2 arguments, the source and the mapped value", () => {
    expect(mapTo.length).toEqual(2);
  });

  it("should return an observable", () => {
    // Given
    const observer: Partial<Observer> = { next() {} };
    const btnStart$ = fromEvent(document.head, "click");

    // When
    const mapToTrue$ = mapTo(btnStart$, true);
    const subscription = mapToTrue$.subscribe(observer);

    // Then
    expect(mapToTrue$.subscribe).toBeTruthy();
    expect(typeof mapToTrue$.subscribe).toEqual("function");

    expect(subscription).toBeTruthy();
    expect(typeof subscription.unsubscribe).toEqual("function");
    expect(typeof subscription.unsubscribe).toEqual("function");
  });

  it("should emit the second argument when the source emits", () => {
    // Given
    const btnStart$ = fromEvent(document.head, "click");
    const actual: boolean[] = [];

    // When
    const observer: Partial<Observer> = {
      next() {
        actual.push(true);
      },
    };
    mapTo(btnStart$, true).subscribe(observer);

    // Then
    document.head.click();
    expect(actual).toEqual([true]);
    document.head.click();
    expect(actual).toEqual([true, true]);
    document.head.click();
    expect(actual).toEqual([true, true, true]);
  });
  it("should unsubscribe from the source after unsubscribe has been called then complete", () => new Promise((done) => {
    // Given
    const intervalSubscription: Subscription = { unsubscribe() {} };
    let hit = false;

    const btnStart$ = new Observable((observer: Observer) => {
      let counter = 0;

      const id = setInterval(() => {
        observer.next(counter++);
      }, 100);

      function unsubscribe() {
        hit = true;
        clearInterval(id);
      }
      intervalSubscription.unsubscribe = unsubscribe;
      return intervalSubscription;
    });

    const actual: boolean[] = [];

    // Then
    const observer: Partial<Observer> = {
      next() {
        actual.push(true);
      },
      complete() {
        expect(actual).toEqual([true, true]);
        expect(hit).toBe(true);
        done(null);
      },
    };
    const subscription = mapTo(btnStart$, true).subscribe(observer);

    // When
    setTimeout(() => {
      subscription.unsubscribe();
    }, 300);
  }));
});
