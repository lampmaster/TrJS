import { Observable, Subscriber } from "../core"


export function from<T>(iterable: Iterable<T>) {
    const observable = new Observable((suscriber: Subscriber) => {
        for (const el of iterable) {
            if (suscriber.closed) {
                return
            }

            suscriber.next(el)
        }

        suscriber.return()
    })

    return observable
}