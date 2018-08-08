describe("typescript - evolution", () => {
    test("01 - null and undefined = non nullable types", () => {
        let name:string;

        name = "Rob";
        name = null;
        name = undefined;
        
        expect(2).toBe(2);
    })    
})
