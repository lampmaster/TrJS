import { interval } from "../interval"

jest.useFakeTimers()

describe('Testing interval', () => {
    it('Should emit 4 values in 4 seconds', () => {
        let counter = 0
        interval(1000).subscribe(value => {
            expect(value).toBe(counter++)
        })

        jest.advanceTimersByTime(4000)
        expect(counter).toBe(4)
    })

    it('Should emit 2 values in 2 seconds and then close subscription', () => {
        let counter = 0
        const unsubscribe = interval(1000).subscribe(value => {
            expect(value).toBe(counter++)
        })

        jest.advanceTimersByTime(2000)
        unsubscribe()
        jest.advanceTimersByTime(2000)

        expect(counter).toBe(2)
    })
    it('Should set interval to 1 if interval is negative', () => {
        let counter = 0
        const unsubscribe = interval(-1000).subscribe(value => {            
            expect(value).toBe(counter++)
        })

        jest.advanceTimersByTime(10)
        unsubscribe()

        expect(counter).toBe(10)
    })
})