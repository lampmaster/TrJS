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

    // [Symbol.asyncIterator]() {
    //     return {
    //         [Symbol.asyncIterator]: () => {
    //             return this
    //         },

    //         return: (value) => {
    //             this.#done = true
    //             return Promise.resolve({done: this.#done, value})
    //         },

    //         next: () => {
    //             return new Promise((resolve) => {
    //                 if (this.#done) {
    //                     resolve({done: this.#done, value: undefined})
    //                 } 

    //                 if (this.subscribtions.size > 0) {

    //                 }
    //             })
    //         }
    //     }
    // }
}