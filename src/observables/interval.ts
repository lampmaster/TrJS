import { Observable, Subscriber } from "../core"


export function interval(delay: number) {
    if (delay <= 0) {
        delay = 1
    }

    const observable = new Observable((subscriber: Subscriber) => {
        let counter = 0
        let intervalId = setInterval(() => {
            if (subscriber.closed) {
                clearInterval(intervalId)
            } else {
                subscriber.next(counter++)
            }
        }, delay)
    
    })


    return observable
}