import { Observable, Subscriber } from "../core"

export const delay = (delay: number) => (prevObservable: Observable) => {
    return new Observable((subscriber: Subscriber) => {
        let unsubscribe
        const timerId = setTimeout(() => {
            unsubscribe = prevObservable.subscribe((value: unknown) => {
                if (subscriber.closed) {
                    if (unsubscribe) {
                        unsubscribe()
                    }
                    clearTimeout(timerId)
                } else {
                    subscriber.next(value)
                }
            })
        }, delay)
        
    })
}