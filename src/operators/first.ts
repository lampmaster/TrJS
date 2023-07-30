import { Observable, Subscriber } from "../core"

export const first = () => (prevObservable: Observable) => {
    return new Observable((subscriber: Subscriber) => {
        let unsubscribe: (() => void) | undefined

        unsubscribe = prevObservable.subscribe((value: unknown) => {
            subscriber.next(value)
            subscriber.return()
            if (unsubscribe) {
                unsubscribe()
            }
        })
    })
}