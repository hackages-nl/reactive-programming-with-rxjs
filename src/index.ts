
import { fromEvent } from "./lib/fromEvent";
import { btnCancel, btnStart, millisecondsToStr, timerDisplay } from "./utils";

/// create an observable
const timer$ = fromEvent(btnStart, "click");

const subscription = timer$.subscribe({
    next(value: number){
        // timerDisplay.innerHTML = millisecondsToStr(value);
        console.log(value)
    },
    error(){},
    complete(){},
})

// fromEvent(btnCancel, "click").subscribe({
//     next(){
//         subscription.unsubscribe()
//     }
// })



