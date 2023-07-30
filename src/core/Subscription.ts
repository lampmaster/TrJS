export class Subscription {
    #unsubscribeAction: () => void

    add(cb: () => void) {
        this.#unsubscribeAction = cb
    }

    unsubscribe() {
        this.#unsubscribeAction()
    }
}