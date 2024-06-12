import { interval } from "../../observables"
import { filter } from "../filter"

jest.useFakeTimers()

describe('Testing filter', () => {
    it('Should emit only even numbers', () => {
        const callback = jest.fn()
        const eventPredicate = (value: number) => value % 2 === 0

        const unsubscribe = interval(1000).pipe(filter(eventPredicate)).subscribe((value) => {
            expect(eventPredicate(value)).toBeTruthy()
            callback()
        })

        jest.advanceTimersByTime(5000)
        unsubscribe()
        
        expect(callback).toBeCalledTimes(3)
    })
})