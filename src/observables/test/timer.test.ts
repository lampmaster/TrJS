import { timer } from "../timer"

jest.useFakeTimers()

describe('Testing interval', () => {
    it('Should emit 0 after 1 second', () => {
        let shouldBeZero

        timer(1000).subscribe(value => {
            expect(value).toBe(0)
            shouldBeZero = value
        })

        jest.advanceTimersByTime(1000)

        expect(shouldBeZero).toBe(0)
    })

    it('Should not emit zero if subscription closed earlier than 1 second', () => {
        let shouldBeUndefined

        const unsubscribe = timer(1000).subscribe(value => {
            expect(value).toBe(0)
            shouldBeUndefined = value
        })

        jest.advanceTimersByTime(100)
        unsubscribe()

        expect(shouldBeUndefined).toBeUndefined()
    })
})