import { Observable } from "../core/Observable"
import { Subscriber } from "../core/Subscriber"

export function timer(delay: number) {
    const observable = new Observable((subscriber: Subscriber) => {
        let intervalId = setTimeout(() => {
            if (!subscriber.closed) {
                subscriber.next(0)
            }
            clearTimeout(intervalId)
        }, delay)
    })

    return observable
}