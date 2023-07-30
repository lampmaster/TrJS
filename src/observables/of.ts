import { Observable, Subscriber } from "../core"

export function of(...args: any) {
    const observable = new Observable((suscriber: Subscriber) => {
        for (const el of args) {
            if (suscriber.closed) {
                return
            }

            suscriber.next(el)
        }

        suscriber.return()
    })

    return observable
}