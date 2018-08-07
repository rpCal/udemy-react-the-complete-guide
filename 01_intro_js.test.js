
describe('first test of jest', () => {
    test('is it working?', () => {
        expect(2).toBe(2)
        expect(2).not.toBe(4)
    })
    test('check type', () => {
        let A = { age: 10 };
        expect(A).toHaveProperty("age");
    })
})