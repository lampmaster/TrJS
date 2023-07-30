import { Observable, Subscriber } from "../core"

export const last = () => (prevObservable: Observable) => {
    return new Observable((subscriber: Subscriber) => {
        const unsubscribe = prevObservable.subscribe((value: unknown) => {
            if (prevObservable.subscriberClosed) {
                subscriber.next(value)
                subscriber.return()
                unsubscribe()
            }
        })
    })
}