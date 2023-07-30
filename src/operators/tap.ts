import { Observable, Subscriber } from "../core"

export const tap = (cb: (x: unknown) => void) => (prevObservable: Observable) => {
    return new Observable((subscriber: Subscriber) => {
        const unsubscribe = prevObservable.subscribe((value: unknown) => {
            if (subscriber.closed) {
                unsubscribe()
            } else {
                cb(value)
                subscriber.next(value)
            }
        })
    })
}