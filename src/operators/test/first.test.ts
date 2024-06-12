import { of } from "../../observables"
import { first } from "../first"

describe('Testing first', () => {
    it('Should emit only first value', () => {
        const callback = jest.fn()
        of(1, 2, 3).pipe(first()).subscribe(callback)

        expect(callback).toBeCalledWith(1)
        expect(callback).toBeCalledTimes(1)
    })
})