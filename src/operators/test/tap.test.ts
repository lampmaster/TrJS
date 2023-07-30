import { interval } from "../../observables"
import { tap } from "../tap"

jest.useFakeTimers()

describe('Testing tap', () => {
    it('Should log all values from the parent observable', () => {
        const callback = jest.fn()
        let counter = 0

        const unsubscribe = interval(1000).pipe(tap((value) => {
            expect(value).toBe(counter)
        })).subscribe((value) => {
            expect(value).toBe(counter)
            counter++
            callback()
        })

        jest.advanceTimersByTime(3000)
        unsubscribe()
        
        expect(callback).toBeCalledTimes(3)
    })
})