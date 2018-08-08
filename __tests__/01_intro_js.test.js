
describe('first test with JEST', () => {
    test('is it working?', () => {
        expect(2).toBe(2)
        expect(2).not.toBe(4)
    })
    test('check props', () => {
        let A = { age: 10 };
        expect(A).toHaveProperty("age");
    })
})


describe("spread operator", () => { 
    test("Spread operator with array", () => {
        let oldArray = [1,2,3]
        let newArray = [...oldArray, 4]
        expect(newArray).toEqual([1,2,3,4])
        expect(newArray).not.toContain(0)
        expect(newArray.length).toEqual(4)
    })
    test("Spread operator with object", () => {
        let oldObject = { first_name: "Miecio" }
        let newObject = { ...oldObject, last_name: "und du" }
        expect(newObject).toHaveProperty("last_name")
        expect(newObject).toHaveProperty("first_name")
    })
    test('rest operator - filter', () => {
        const filter = (...args) => args.filter(el => el === 1)
        const result = filter(1,2,3);
        expect(result).toEqual([1]);
    })
})
describe("descructing operator", () => {
    test("destructing array", () => {
        let [a,b] = [100, 200, 300, 400];
        expect(a).toBe(100)
        expect(b).toBe(200)
    })
    test('check array with from const', () => {
        const BigNumbers = [10000,9999999, 8888888];
        const [BigNumber1, , BigNumber2] = BigNumbers;
        expect(BigNumber1).toBe(10000)
        expect(BigNumber2).toBe(8888888)
    })
    test("destructing object", () => {
        let { first_name } = { first_name: "Rob", last_name: "C" };
        expect(first_name).toBe("Rob")
    })
    describe('check each props ', () => {
        let Person = null;
        beforeEach(() => {
            Person = {
                first_name: "Rob",
                last_name: "Bob",
                job: "Js dev",
                age: 1
            }
            return Person;
        })
        test("get props as variables", () => {
            let { age, job } = Person;
            expect(age).toBe(1)
        })
        test("get props as variables", () => {
            let { age, ...rest } = Person;
            expect(age).toBe(1)
            expect(rest).toHaveProperty('first_name')
            expect(rest.first_name).toEqual('Rob')
        })
    })
    test("make request options", () => {
        const defaultOptions = {
            "method": "GET",
            "credentials": "same-origin"
        }
        const requestOptions = {
            "method": "POST",
            "redirect": "follow"
        }
        const options = { ...defaultOptions, ...requestOptions };
        expect(options).toHaveProperty('redirect')
        expect(options).toHaveProperty('credentials')
    })
    test("make shallow copy", () => {
        const person = {
            age: 1,
            books: ["Hari pota", "Staś i Nel"]
        }
        const shallow = { ...person };
        expect(shallow).toHaveProperty('books')
        expect(shallow.books.length).toBe(2)

        shallow.books.push("Dictionary")
        expect(shallow.books.length).toBe(3)
        expect(person.books.length).toBe(3)

        const deepCopy = JSON.parse(JSON.stringify(person))
        deepCopy.books.unshift()
        expect(person.books.length).toBe(3)
        expect(deepCopy.books.length).toBe(3)
    })  
})