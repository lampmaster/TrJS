import { Observable, Subscriber } from "../core"

export const take = (limit: number) => (prevObservable: Observable) => {
    let counter = 0

    const operatorObservable =  new Observable((subscriber: Subscriber) => {
        const unsubscribe  = prevObservable.subscribe((value: unknown) => {
            if (counter >= limit) {
                unsubscribe()
                subscriber.return()
            } else {
                counter++
                subscriber.next(value)
            }
        })
    })

    return operatorObservable
}