describe("typescript - https://blog.mariusschulz.com/2016/09/27/typescript-2-0-non-nullable-types", () => {
    describe("1. TypeScript 2.0: Non-Nullable Types", () =>{
        test("non nullable types (only with config strickNullChecks)", () => {
            // in tsconfig.json => add
            // { "compilerOptions" : {"strictNullChecks" : true}}
            // null and undefined are not in primitive type
            
            let name:string;
            // name = null;         // Error
            // name = undefined;    // Error
            name = "Rob";           // OK
            expect(name).toBe("Rob");
            
            let isVisible:boolean;
            isVisible = true;           // OK
            isVisible = false;          // OK
            // isVisible = null;        // Error
            // isVisible = undefined;   // Error
            expect(isVisible).toBeFalsy()
    
    
            let nameNullable:string | null;
            nameNullable = null;
            nameNullable = "name";
            // nameNullable = undefined;    // Error
            nameNullable = null;
            expect(nameNullable).toBeNull()
        })    


        test('non nullable objects', () => {
            type Osoba = {
                imie: string,
                imieniny?: string | undefined
            }
            let Agatangel:Osoba = { imie: "agatangel", imieniny: undefined }
            let Andromeda:Osoba = { imie: "andromeda", imieniny: "7 sierpnia" }
            let Dobiemiar:Osoba = { imie: "dobiemiar" }
            expect(Agatangel).toHaveProperty('imieniny')
            expect(Andromeda).toHaveProperty('imieniny')
            expect(Dobiemiar).not.toHaveProperty('imieniny')
        })


        test('non nullable function params', () => {
            const fn = (arg: string | null) => {
                if(arg == null){
                    return 0;
                }
                return arg.length
            }
            const fn2 = (args: string | null):number => {
                return args ? args.length : 0;
            }
            expect(fn("a")).toBe(1)
            expect(fn(null)).toBe(0)
            expect(fn2("a")).toBe(1)
            expect(fn2(null)).toBe(0)
    
            const fn3 = (args: Array<number> | null) => {
                return args ? args.length : 0;
            }
            expect(fn3([1, 2])).toBe(2)
            // expect(fn3([""])).toBe(2) // Error
            expect(fn3(null)).toBe(0)
    
            type numberNull = number | null;
            const fn4 = (callback?: () => numberNull):numberNull => {
                if(typeof callback === "function"){
                    return callback();
                }
                return null;
            }
            expect(fn4( () => fn2(null) )).toBe(0)
            expect(fn4( () => fn2("1") )).toBe(1)
            expect(fn4( () => { return null; } )).toBe(null)
        })

        test("coomon type null and undefined", () => {
            type NullOrUndefined = null | undefined;

            let imie: string | NullOrUndefined;
            imie = "niezamysł"
            imie = null
            imie = undefined;

            let wiek: number | NullOrUndefined;
            wiek = 10;
            wiek = null;
            wiek = undefined;
        })

        test("remove null type ", () => {
            const fn = (args: string):number | null => {
                const isWin = args.length >= 2; 
                return isWin ? 10 : null;
            }
            // "non null assertion"
            // po dodaniu na koncu ! typ zmiennej zmienia sie
            // usuwany jest typ null :o
            const result:number = fn("tekst")!;
            expect(result).toBe(10)
            
        })
    })

    describe('2. TypeScript 2.0: Control Flow Based Type Analysis', () => {
        // wolne tlumaczenie? Analiza przepływu na z wykorzystaniem typow
        // translator: "Analiza typu sterowania przepływem sterowania"
        // WG dokumentacji: "With TypeScript 2.0, the type checker analyses 
        //  all possible flows of control in statements and expressions to 
        //  produce the most specific type possible (the narrowed type) 
        //  at any given location for a local variable or parameter that is 
        //  declared to have a union type.
        // -- co to jest type checked? defninicja?

        test("check command type", () => {
            let akcja: string | string[];

            akcja = "operacja"
            expect(akcja.toUpperCase()).toBe("OPERACJA")

            akcja = ["a", "b"]
            expect(akcja.join(",")).toBe("a,b");
        })

        test("fn check command type ", () => {
            const fn = (args: string | string[]) => {
                // control flow and check expression
                if(typeof args === "string"){ 
                    return args.toUpperCase()
                }
                return args.join(',')
            }
            expect(fn("a")).toBe("A")
            expect(fn(['a','b'])).toBe("a,b")
        })

        test('verify strict type check', () => {
            type Osoba = {
                imie: string,
                imieniny? : string | null | undefined
            }
            const pobierzSygnature = (osoba: Osoba) => {
                const { imie, imieniny } = osoba;
                if(!imieniny){
                    return imie;
                }
                return `${imie} - ${imieniny}`;
            }
            let largus:Osoba = { imie: "Largus", imieniny: "8 sierpnia"}
            expect(pobierzSygnature(largus)).toBe("Largus - 8 sierpnia")
            let niegosław:Osoba = { imie: "Niegosław"}
            expect(pobierzSygnature(niegosław)).toBe("Niegosław")
        })

        test("local vars without assigment - type guard", () => {
            let imie: string;
            // Error: Variable 'imie' is used before being assigned.
            // console.log(imie); // Error 
            imie = "niegosław"
            // console.log(imie) // OK
            let imieniny: string | undefined;
            // jesli podamy w typie undefined, bedzie mozna uzywac tej zmiennej
            // console.log(imieniny) // OK
        })

        test("type guard in flatted fn", () => {
            const liczby = [1,2,3,[4,5],6,[7,8,9]]
            const flatten = (args: (number | number[])[]) : number[] => {
                const flattend:number[] = [];
                for(const el of args){
                    if(Array.isArray(el)){
                        flattend.push(...el);
                    }else{
                        flattend.push(el);
                    }
                }
                return flattend;
            }
            expect(flatten(liczby)).toEqual([1,2,3,4,5,6,7,8,9])

            const flattenGeneric = <T>(args: (T | T[])[]) : T[] => {
                const flattend:T[] = [];
                for(const el of args){
                    if(Array.isArray(el)){
                        flattend.push(...el);
                    }else{
                        flattend.push(el);
                    }
                }
                return flattend;
            }
            expect(flattenGeneric(liczby)).toEqual([1,2,3,4,5,6,7,8,9])
        })

        test("type guard - own fn", () => {
            const liczby = [1,2,3,[4,5],6,[7,8,9]]
            const isFlat = <T>(args: (T | T[])[]) : args is T[] => {
                return !args.some(Array.isArray);
            }
            // if(isFlat(liczby)){
            //     liczby;
            // }
            expect(isFlat(liczby)).toBeFalsy()
        })
    })

    describe(" 3. TypeScript 2.0: Acquiring Type Declaration Files", () => {
        test("check node_modules for folder @types", () => {
            // od wersji 2.0 tsc @types sa normalnymi paczkami npm
            // dzieki czemu mozemy zajmowac sie tymi zaleznosciami
            // tak jak kazda inna paczka: wersje, zaleznosci i aktualizacje

            // $ npm i @types/lodash
            expect(1).toBe(1)
        })
    })
    
    describe("4. TypeScript 2.0: Read-Only Properties", () => {
        test("@TODO", () => {
            
        })
    })
})
