import { Subscriber } from "./Subscriber"
import { Subscription } from "./Subscription"
import { SubscriptionCb, UnaryFunction } from "./types"

export class Observable {
    #observer: (subscriber: Subscriber) => void
    #subscriber: Subscriber

    constructor(observer: (subscriber: Subscriber) => void) {
        this.#observer = observer
    }

    subscribe(cb: SubscriptionCb) {
        const subscription = new Subscription()
        this.#subscriber = new Subscriber(cb, subscription)
        this.#observer(this.#subscriber)

        return () => {
            subscription.unsubscribe()
        }
    }

    pipe(...fns: UnaryFunction[]): Observable {
        return fns.reduce((prev, fn) => fn(prev), this)
    }

    get subscriberClosed() {
        return this.#subscriber.closed
    }
}