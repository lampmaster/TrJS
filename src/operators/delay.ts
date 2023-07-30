import { Observable, Subscriber } from "../core"

export const delay = (delay: number) => (prevObservable: Observable) => {
    return new Observable((subscriber: Subscriber) => {
        setTimeout(() => {
            const unsubscribe = prevObservable.subscribe((value: unknown) => {
                if (subscriber.closed) {
                    unsubscribe()
                } else {
                    subscriber.next(value)
                }
            })
        }, delay)
        
    })
}