import { from } from "../from"

describe('Testing from', () => {
    it('Should emit all values all values from the array', () => {
        const arr = [1,2,3,4]
        let index = 0
        from(arr).subscribe(value => {
            expect(value).toBe(arr[index++])
        })

        expect(index).toBe(4)
    })

    it('Should emit all letters from the string', () => {
        const str = 'some string'
        let index = 0
        from(str).subscribe(value => {
            expect(value).toBe(str[index++])
        })

        expect(index).toBe(11)
    })

    it('Should emit all values from the setter', () => {
        const setter = new Set([1, 2, 3, 4])
        const iterator = setter[Symbol.iterator]()
        let counter = 0

        from(new Set([1, 2, 3, 4])).subscribe(subscribtionValue => {
            const value = iterator.next().value
            expect(subscribtionValue).toBe(value)
            counter++
        })

        expect(counter).toBe(4)
    })
})