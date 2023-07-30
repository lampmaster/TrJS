import { interval } from "../../observables"
import { delay } from "../delay"

jest.useFakeTimers()

describe('Testing delay', () => {
    it('Should emit value only after 1 second', () => {
        const callback = jest.fn()
        interval(1000).pipe(delay(1000)).subscribe(callback)

        jest.advanceTimersByTime(1999)
        expect(callback).not.toBeCalled()
        jest.advanceTimersByTime(1)
        expect(callback).toBeCalled()
    })
    it('Should not emit value if subscription closed earlier', () => {
        const callback = jest.fn()
        const unsubscribe = interval(1000).pipe(delay(1000)).subscribe(callback)

        jest.advanceTimersByTime(1999)
        expect(callback).not.toBeCalled()
        unsubscribe()
        jest.advanceTimersByTime(1)
        expect(callback).not.toBeCalled()
    })
})