export interface Observer<T = any> {
  next(value: T): any;
  error(error: any): any;
  complete(): any;
}

export interface Subscription {
  unsubscribe(): void;
}

export interface Producer {
  (observer: Partial<Observer>): Subscription;
}
