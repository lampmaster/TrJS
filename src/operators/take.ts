import { Observable, Subscriber } from "../core"

export const take = (limit: number) => (prevObservable: Observable) => {
    let counter = 0
    
    if (limit < 0) {
        limit = 0
    }

    const operatorObservable =  new Observable((subscriber: Subscriber) => {
        let unsubscribe: (() => void) | undefined
        unsubscribe = prevObservable.subscribe((value: unknown) => {
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