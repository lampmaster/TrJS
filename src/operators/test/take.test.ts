import { interval } from "../../observables"
import { take } from "../take"

jest.useFakeTimers()

describe('Testing take', () => {
    it('Should emit only 2 first values', () => {
        const callback = jest.fn()
        interval(1000).pipe(take(2)).subscribe(callback)

        jest.advanceTimersByTime(4000)
        expect(callback).toBeCalledTimes(2)
    })
    it('Should emit 0 values when an argument in take === 0', () => {
        const callback = jest.fn()
        interval(1000).pipe(take(0)).subscribe(callback)

        jest.advanceTimersByTime(4000)
        expect(callback).toBeCalledTimes(0)
    })
    it('Should emit 0 values when an argument in take < 0', () => {
        const callback = jest.fn()
        interval(1000).pipe(take(-1)).subscribe(callback)

        jest.advanceTimersByTime(4000)
        expect(callback).toBeCalledTimes(0)
    })
})