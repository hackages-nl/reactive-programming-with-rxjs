// import { describe, it, expect, DoneCallback } from 'jest';
import { Observer } from "../types";
import { of } from "./of";

describe("of operator", () => {
  it("should emit a sequence of numbers", () => new Promise((done) => {
    const source$ = of<number>(1, 2, 3, 4, 5);
    const actual: number[] = [1, 2, 3, 4, 5];

    let result: number[] = [];
    const observer: Partial<Observer> = {
      next: (val: number) => {
        result = [...result, val];
      },
      complete: () => {
        expect(actual).toEqual(result);
        done(null);
      },
    };

    source$.subscribe(observer);
  }));

  it("should emitting an object, array, and function", () => new Promise((done) => {
    const source$ = of<unknown>({ name: "Brian" }, [1, 2, 3], () => "Hello");
    const actual: any[] = [
      { name: "Brian" },
      [1, 2, 3],
      function hello(): string {
        return "Hello";
      },
    ];

    let result: any[] = [];
    const observer: Partial<Observer> = {
      next: (val: unknown) => {
        result = [...result, val];
      },
      complete: () => {
        expect(actual.length).toEqual(result.length);
        expect(actual[0]).toEqual(result[0]);
        expect(actual[1]).toEqual(result[1]);
        expect(actual[2]()).toEqual(result[2]());
        done(null);
      },
    };
    source$.subscribe(observer);
  }));
});
