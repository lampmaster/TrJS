import { Subscription } from "./Subscription"
import { SubscriptionCb } from "./types"

export class Subscriber {
    #closed: boolean = false
    #subsriptionCb: SubscriptionCb
    #subscription: Subscription

    constructor(cb: SubscriptionCb, subscription: Subscription) {
        this.#subsriptionCb = cb
        this.#subscription = subscription
        this.#subscription.add(() => this.#closed = true)
    }

    next(value: unknown) {
        if (!this.#closed) {
            this.#subsriptionCb(value)
        }
    }

    return() {
        this.#closed = true
        this.#subscription.unsubscribe()
        
    }

    throw(err: any) {
        if (!this.closed) {
            this.#closed = true
            this.#subscription.unsubscribe()
        }
    }

    get closed() {
        return this.#closed
    }
}