import { Observable, Subscriber } from "../core"

export const filter = (predicate: (x: unknown) => boolean) => (prevObservable: Observable) => {
    return new Observable((subscriber: Subscriber) => {
        const unsubscribe = prevObservable.subscribe((value: unknown) => {
            if (subscriber.closed) {
                unsubscribe()
            } else if(predicate(value)) {
                subscriber.next(value)
            }
        })
    })
}