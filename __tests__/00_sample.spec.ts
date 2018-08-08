describe("sum fn", () => {
    test("Sum", ()=>{
        expect(sum(1,2,3,4)).toBe(10)
    })
})

const sum = (...args) => args.reduce((prev, next) => prev + next, 0);