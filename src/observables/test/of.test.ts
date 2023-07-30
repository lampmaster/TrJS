import { of } from "../of"

describe('Testing from', () => {
    it('Should emit all values', () => {
        const args = [1,2,3,4]
        let index = 0
        of(...args).subscribe(value => {
            expect(value).toBe(args[index++])
        })

        expect(index).toBe(4)
    })

    it('Should emit all values when values are different', () => {
        const args = [1, 'a', [], {}, null]
        let index = 0
        of(...args).subscribe(value => {
            expect(value).toBe(args[index++])
        })

        expect(index).toBe(5)
    })
})