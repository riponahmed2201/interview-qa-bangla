# TypeScript ইন্টারভিউ প্রশ্ন ও উত্তর (বাংলা)

---

## ফ্রেশার লেভেল

### ১. TypeScript কি? JavaScript থেকে কার পার্থক্য?
**উত্তর:** TypeScript হল JavaScript এর superset যা type safety যোগ করে। সম্পূর্ণ JavaScript support করে কিন্তু static type checking এ। code compile করে JavaScript তে run করা হয়।

**পার্থক্য:**
- **TypeScript:** type annotation, interface, generics, compile-time error checking
- **JavaScript:** dynamic typing, runtime errors

**উদাহরণ:**
```ts
// TypeScript
function add(a: number, b: number): number {
  return a + b;
}
add(5, 3); // OK
add('5', 3); // Error: Argument of type 'string' is not assignable to parameter of type 'number'

// JavaScript (no error at compile time)
function add(a, b) {
  return a + b;
}
add(5, 3); // 8
add('5', 3); // '53' (unexpected result)
```

---

### २. Type annotation কি?
**উত্তর:** ভেরিয়েবল, parameter, return value এ type specify করা।

**উদাহরণ:**
```ts
// Variables
let name: string = 'John';
let age: number = 30;
let isActive: boolean = true;
let skills: string[] = ['JS', 'TS'];
let skills2: Array&lt;string&gt; = ['JS', 'TS'];

// Union type
let id: string | number = 123;
id = 'ABC123'; // both OK

// Any type (avoid when possible)
let anything: any = 'something';
anything = 123; // OK but not type-safe

// Never type
function throwError(): never {
  throw new Error('Error');
}
```

---

### ३. Interface কি?
**উত্তর:** object এর structure define করে। properties এবং methods specify করে।

**উদাহরণ:**
```ts
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // optional property
}

const user: User = {
  id: 1,
  name: 'John',
  email: 'john@example.com'
  // age এখানে না থাকলেও OK (optional)
};

// Function parameter এ
function printUser(user: User) {
  console.log(user.name);
}

// Multiple properties
interface Person {
  name: string;
  greet(): void; // method
}
```

---

### ४. Type vs Interface কার পার্থক্য?
**উত্তর:**
- **Type:** flexibility বেশি (union, tuple, primitives)
- **Interface:** extension/implementation এর জন্য

**উদাহরণ:**
```ts
// Type – flexible
type ID = string | number;
type Point = { x: number; y: number };

// Interface – extension
interface Animal {
  name: string;
}

interface Dog extends Animal {
  bark(): void;
}

// Type intersection
type Admin = User & { role: 'admin' };

// Interface merge
interface User {
  name: string;
}
interface User {
  age: number;
}
// এখন User এ both name এবং age আছে
```

---

### ५. Generic কি?
**উত্তর:** reusable code লিখতে type parameter use করা। function বা class কে flexible রাখে।

**উদাহরণ:**
```ts
// Generic function
function getArray&lt;T&gt;(items: T[]): T[] {
  return items;
}

getArray&lt;number&gt;([1, 2, 3]); // OK
getArray&lt;string&gt;(['a', 'b']); // OK

// Generic interface
interface Box&lt;T&gt; {
  content: T;
}

const numBox: Box&lt;number&gt; = { content: 123 };
const strBox: Box&lt;string&gt; = { content: 'hello' };

// Generic constraint
function logLength&lt;T extends { length: number }&gt;(item: T) {
  console.log(item.length);
}

logLength('hello'); // 5
logLength([1, 2, 3]); // 3
logLength({ length: 5 }); // 5
```

---

### ६. Union type কি?
**উত্তর:** একটা value multiple types এর মধ্যে একটা হতে পারে।

**উদাহরণ:**
```ts
// Union type
type Status = 'success' | 'error' | 'pending';
let status: Status = 'success';
status = 'error'; // OK
// status = 'failed'; // Error

// Function with union
function process(id: string | number) {
  if (typeof id === 'string') {
    console.log('String ID:', id);
  } else {
    console.log('Number ID:', id);
  }
}

// Multiple types
let value: string | number | boolean;
value = 'hello'; // OK
value = 42; // OK
value = true; // OK
```

---

### ७. Type Guard কি?
**উত:তर:** runtime এ type check করে safe একে code run করা। `typeof`, `instanceof`, custom guard ব্যবহার করা হয়।

**উদাহরণ:**
```ts
// typeof guard
function process(value: string | number) {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  return value * 2;
}

// instanceof guard
class Dog {
  bark() { console.log('Woof'); }
}

function makeSound(animal: Dog | Bird) {
  if (animal instanceof Dog) {
    animal.bark();
  }
}

// Custom type guard
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

const result = process(value);
if (isString(result)) {
  console.log(result.toUpperCase());
}
```

---

### ८. Enum কি?
**उत्तर:** একটা set of named constants। code readable রাখতে ব্যবহৃত।

**उदाहरण:**
```ts
// String enum
enum Status {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Pending = 'PENDING'
}

let userStatus: Status = Status.Active;

// Numeric enum (default)
enum Direction {
  Up = 1,
  Down = 2,
  Left = 3,
  Right = 4
}

let dir: Direction = Direction.Up; // 1

// Mixed enum
enum Mixed {
  No = 0,
  Yes = 'YES'
}
```

---

### ९. Tuple কি?
**उत्तर:** fixed length array with specific types at each position।

**उदाहरण:**
```ts
// Tuple
type Coordinate = [number, number];
const point: Coordinate = [10, 20];
// const point: Coordinate = [10, '20']; // Error

// Different types
type Response = [number, string, boolean];
const res: Response = [200, 'OK', true];

// Optional elements
type FlexibleTuple = [string, number?];
const tuple1: FlexibleTuple = ['hello']; // OK
const tuple2: FlexibleTuple = ['hello', 42]; // OK

// Rest elements
type StringNumberBooleans = [string, number, ...boolean[]];
const arr: StringNumberBooleans = ['hi', 1];
const arr2: StringNumberBooleans = ['hi', 1, true, false]; // OK
```

---

### १०. Function overloading কি?
**उत्तर:** একই function name কে multiple signatures দিয়ে implement করা।

**उदाहरण:**
```ts
// Function overloads
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: any, b: any): any {
  return a + b;
}

add(5, 3); // 8
add('hello', ' world'); // 'hello world'

// More complex
function describe(value: string): string;
function describe(value: number): string;
function describe(value: boolean): string;
function describe(value: string | number | boolean): string {
  if (typeof value === 'string') return `String: ${value}`;
  if (typeof value === 'number') return `Number: ${value}`;
  return `Boolean: ${value}`;
}
```

---

### ११. Class এ access modifier কি?
**उत्तर:** `public`, `private`, `protected` দিয়ে member access control করা।

**उदाहरण:**
```ts
class Animal {
  public name: string; // সব জায়গা থেকে access করা যায়
  private age: number; // শুধু class এর মধ্যে access করা যায়
  protected energy: number; // class ও derived class এ access

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    this.energy = 100;
  }

  private getAge() {
    return this.age;
  }
}

class Dog extends Animal {
  bark() {
    console.log(this.name); // OK (public)
    console.log(this.energy); // OK (protected)
    // console.log(this.age); // Error (private)
  }
}

const dog = new Dog('Buddy', 5);
console.log(dog.name); // OK
// console.log(dog.age); // Error (private)
```

---

### १२. Constructor shorthand কি?
**उत्तर:** parameter এ access modifier দিয়ে automatically property initialize করা।

**उदाहरण:**
```ts
// Normal
class Person {
  name: string;
  age: number;
  
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

// Shorthand
class Person {
  constructor(public name: string, public age: number) {}
}

const p = new Person('John', 30);
console.log(p.name); // 'John'
```

---

## ইন্টারমিডিয়েট লেভেল

### १३. Abstract class কি?
**उत्तर:** directly instantiate করা যায় না, শুধু extend করার জন্য। abstract methods implement করতে হয়।

**उदाहरण:**
```ts
abstract class Vehicle {
  abstract start(): void; // must implement
  
  stop() {
    console.log('Stopping');
  }
}

class Car extends Vehicle {
  start() {
    console.log('Car starting');
  }
}

// const vehicle = new Vehicle(); // Error
const car = new Car();
car.start(); // 'Car starting'
```

---

### १४. Decorator কি?
**उत्तर:** class, method, property এ metadata যোগ করা। `@` দিয়ে লেখা হয়।

**उदाहरण:**
```ts
// Enable experimentalDecorators in tsconfig.json

function logged(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function(...args: any[]) {
    console.log(`Calling ${propertyKey}...`);
    return originalMethod.apply(this, args);
  };
  
  return descriptor;
}

class Calculator {
  @logged
  add(a: number, b: number) {
    return a + b;
  }
}

const calc = new Calculator();
calc.add(5, 3); // 'Calling add...' then 8
```

---

### १५. Conditional type কি?
**उत्तर:** type যা condition এর উপর ভিত্তি করে নির্ধারিত হয়। `T extends U ? X : Y`

**उदाहरण:**
```ts
// Conditional type
type IsString&lt;T&gt; = T extends string ? true : false;

type A = IsString&lt;'hello'&gt;; // true
type B = IsString&lt;123&gt;; // false

// Practical example
type Flatten&lt;T&gt; = T extends Array&lt;infer U&gt; ? U : T;

type Str = Flatten&lt;string[]&gt;; // string
type Num = Flatten&lt;number&gt;; // number

// Utility types (built-in conditional types)
type NonNull&lt;T&gt; = T extends null | undefined ? never : T;
type Keys&lt;T&gt; = T extends object ? keyof T : never;
```

---

### १६. Mapped type কি?
**उत्तर:** existing type থেকে নতুন type তৈরি করা।

**उदाहरण:**
```ts
// Mapped type
type Getters&lt;T&gt; = {
  [K in keyof T as `get${Capitalize&lt;string & K&gt;}`]: () =&gt; T[K];
};

interface User {
  name: string;
  age: number;
}

type UserGetters = Getters&lt;User&gt;;
// {
//   getName: () =&gt; string;
//   getAge: () =&gt; number;
// }

// Readonly mapping
type Readonly&lt;T&gt; = {
  readonly [K in keyof T]: T[K];
};

// Nullable mapping
type Nullable&lt;T&gt; = {
  [K in keyof T]: T[K] | null;
};
```

---

### १७. Intersection type কি?
**उत्तर:** multiple types কে combine করা। সব properties থাকতে হয়।

**उदाहरण:**
```ts
interface Name {
  name: string;
}

interface Age {
  age: number;
}

// Intersection
type Person = Name & Age;

const person: Person = {
  name: 'John',
  age: 30
}; // both required

// Function intersection
type Admin = User & { role: 'admin' };
```

---

### १८. Namespace কি?
**उत्तर:** code organize করতে logical grouping। deprecated, modules prefer করা হয়।

**उदाहरण:**
```ts
namespace Utils {
  export function add(a: number, b: number) {
    return a + b;
  }
  
  export const PI = 3.14;
}

Utils.add(5, 3);

// Nested namespace
namespace Math {
  export namespace Geometry {
    export function area(radius: number) {
      return PI * radius * radius;
    }
  }
}
```

---

### १९. Type assertion (casting) কি?
**उत्तर:** developer বলে TypeScript কে এটা কি type, compiler trust করে।

**उदाहरण:**
```ts
// Type assertion
let x: any = 'hello';
let len: number = (x as string).length; // x string এ cast
let len2: number = (&lt;string&gt;x).length; // older syntax

// Useful with unknown
function process(value: unknown) {
  if (typeof value === 'string') {
    console.log((value as string).toUpperCase());
  }
}

// Force type
const div = document.getElementById('app') as HTMLDivElement;
```

---

### २०. Utility types কি কি?
**उत्तर:** built-in types যা common type transformation এ সাহায্য করে।

**उदाहरण:**
```ts
interface User {
  id: number;
  name: string;
  email: string;
}

// Partial – all properties optional
type PartialUser = Partial&lt;User&gt;;
// { id?: number; name?: string; email?: string; }

// Required – all properties required
type RequiredUser = Required&lt;PartialUser&gt;;
// { id: number; name: string; email: string; }

// Pick – select specific properties
type UserPreview = Pick&lt;User, 'id' | 'name'&gt;;
// { id: number; name: string; }

// Omit – exclude specific properties
type UserWithoutEmail = Omit&lt;User, 'email'&gt;;
// { id: number; name: string; }

// Record – create type with specific keys
type Status = 'active' | 'inactive' | 'pending';
type UserStatus = Record&lt;Status, User&gt;;

// Readonly – make all properties readonly
type ReadonlyUser = Readonly&lt;User&gt;;

// Extract – extract matching types
type StringOrNumber = string | number | boolean;
type Strings = Extract&lt;StringOrNumber, string&gt;; // string

// Exclude – exclude matching types
type NonString = Exclude&lt;StringOrNumber, string&gt;; // number | boolean

// ReturnType – get function return type
type GetUserReturn = ReturnType&lt;typeof getUser&gt;; // User
```

---

## অ্যাডভান্সড লেভেল

### २१. Generic constraint কি?
**उत्तर:** generic type কে limit করা specific constraints দিয়ে।

**उदाहरण:**
```ts
// Constraint
function getProperty&lt;T, K extends keyof T&gt;(obj: T, key: K) {
  return obj[key];
}

const user = { name: 'John', age: 30 };
getProperty(user, 'name'); // OK
// getProperty(user, 'email'); // Error (not in user)

// Class constraint
function create&lt;T&gt;(constructor: new () =&gt; T): T {
  return new constructor();
}

class MyClass {
  getValue() { return 42; }
}

const instance = create(MyClass); // OK
```

---

### २२. keyof operator কि?
**उत्तर:** type এর সব properties এর union নিয়ে নতুন type তৈরি করা।

**उदाहरण:**
```ts
interface User {
  id: number;
  name: string;
  email: string;
}

type UserKeys = keyof User; // 'id' | 'name' | 'email'

function getProperty&lt;K extends keyof User&gt;(user: User, key: K) {
  return user[key];
}

getProperty(user, 'name'); // OK
// getProperty(user, 'age'); // Error
```

---

### २३. typeof operator কি?
**उत्तर:** value থেকে type নিয়ে নতুন type তৈরি করা।

**उदाहरण:**
```ts
const user = {
  name: 'John',
  age: 30,
  email: 'john@example.com'
};

type User = typeof user;
// {
//   name: string;
//   age: number;
//   email: string;
// }

// Function এ
function getUserInfo() {
  return { id: 1, name: 'John' };
}

type UserInfo = ReturnType&lt;typeof getUserInfo&gt;;
```

---

### २४. infer keyword কि?
**उत्तर:** conditional type এ type variable declare করা। nested type extract করতে ব্যবহৃত।

**उदाहरण:**
```ts
// Extract function return type
type GetReturnType&lt;T&gt; = T extends (...args: any[]) =&gt; infer R ? R : never;

function greet() {
  return 'Hello';
}

type Greeting = GetReturnType&lt;typeof greet&gt;; // string

// Extract array element
type GetArrayElement&lt;T&gt; = T extends (infer U)[] ? U : never;

type StringArray = GetArrayElement&lt;string[]&gt;; // string
type NumberArray = GetArrayElement&lt;number[]&gt;; // number
```

---

### २५. as const assertion কि?
**उत्तर:** literal type inference force করা। value change না করে.

**उदाहरण:**
```ts
// Without as const
let color = 'red'; // type: string
// can do: color = 'blue'

// With as const
let color = 'red' as const; // type: 'red'
// cannot change to 'blue'

// Array
const colors = ['red', 'green', 'blue'] as const;
// type: readonly ['red', 'green', 'blue']

// Object
const config = {
  api: 'https://api.example.com',
  port: 3000
} as const;
// properties readonly এবং literal types
```

---

### २६. Discriminated Union (Tagged Union) কি?
**उत्तर:** একটা common field দিয়ে union distinguish করা।

**उदाहरण:**
```ts
type Shape = 
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; side: number }
  | { kind: 'rectangle'; width: number; height: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'square':
      return shape.side ** 2;
    case 'rectangle':
      return shape.width * shape.height;
  }
}

// Type narrowing automatically happens based on 'kind'
```

---

### २७. Async/Await এ type safety কি?
**उत्तर:** Promise return type explicit specify করা এবং error handling।

**उदाहरण:**
```ts
// Return type explicit
async function fetchUser(id: number): Promise&lt;User&gt; {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  return data as User;
}

// Error handling
async function getUserSafely(id: number): Promise&lt;User | null&gt; {
  try {
    return await fetchUser(id);
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Generic with Promise
async function genericFetch&lt;T&gt;(url: string): Promise&lt;T&gt; {
  const response = await fetch(url);
  return response.json();
}

const user = await genericFetch&lt;User&gt;('/api/users/1');
```

---

### २८. Module augmentation কि?
**उत्तर:** existing module এ নতুন declaration যোগ করা।

**उदाहरण:**
```ts
// In your app code
declare module 'express' {
  interface Request {
    user?: User;
  }
}

// Now you can use req.user safely
app.get('/', (req, res) =&gt; {
  if (req.user) {
    console.log(req.user.name); // No error
  }
});
```

---

### २९. Triple-slash directives কि?
**उत्तर:** type definition file reference করার special comments।

**उदाहरण:**
```ts
/// &lt;reference path="./types.d.ts" /&gt;
/// &lt;reference lib="dom" /&gt;
/// &lt;reference types="node" /&gt;

// এখন সব type available
```

---

### ३०. TypeScript compilation options (tsconfig.json) কি?
**उत्तर:** TypeScript compiler behavior control করা।

**उदाहरण:**
```json
{
  "compilerOptions": {
    "target": "ES2020",              // output JavaScript version
    "module": "commonjs",            // module system
    "lib": ["ES2020", "DOM"],        // available types
    "strict": true,                  // enable all strict checks
    "esModuleInterop": true,         // CommonJS interop
    "skipLibCheck": true,            // skip library type checking
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,       // allow JSON import
    "declaration": true,             // generate .d.ts files
    "outDir": "./dist",              // output directory
    "rootDir": "./src",              // source directory
    "noImplicitAny": true,           // error on implicit any
    "strictNullChecks": true,        // strict null checking
    "noImplicitThis": true,          // error on implicit this
    "allowUnreachableCode": false,   // warn unreachable code
    "noImplicitReturns": true        // require all paths return
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

---

### ३१. Advanced generic patterns কি?
**उत्तर:** complex generic scenarios solve করা।

**उदाहरण:**
```ts
// Default generic parameter
type Container&lt;T = string&gt; = {
  value: T;
};

const strContainer: Container = { value: 'hello' };
const numContainer: Container&lt;number&gt; = { value: 42 };

// Multiple constraints
function merge&lt;T extends object, U extends object&gt;(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

// Generic recursion
type Deep&lt;T&gt; = T extends object ? { [K in keyof T]: Deep&lt;T[K]&gt; } : T;

type UserDeep = Deep&lt;User&gt;; // recursive deep copy type
```

---

### ३२. Type predicate (type guard function) কি?
**उत्तर:** custom type guard function যা boolean রিটার্ন করে এবং type narrow করে।

**उदाहरण:**
```ts
// Type predicate
function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj &&
    typeof (obj as User).id === 'number' &&
    typeof (obj as User).name === 'string'
  );
}

function process(data: unknown) {
  if (isUser(data)) {
    console.log(data.name); // data এখন User type
  }
}
```

---

### ३३. Array&lt;infer T&gt; pattern কि?
**उत्तर:** array এ element type extract করা।

**उदाहरण:**
```ts
type GetArrayType&lt;T&gt; = T extends Array&lt;infer U&gt; ? U : never;

type NumberArray = GetArrayType&lt;number[]&gt;; // number
type StringArray = GetArrayType&lt;string[]&gt;; // string
type AnyArray = GetArrayType&lt;any[]&gt;; // any

// Recursive
type Flatten&lt;T&gt; = T extends Array&lt;infer U&gt; ? Flatten&lt;U&gt; : T;

type Nested = Flatten&lt;[[[number]]]&gt;; // number
```

---

### ३४. Declaration merging कि?
**उत्तर:** same name এর multiple declarations merge হয়ে একটা single definition তৈরি করে।

**उदाहरण:**
```ts
// Interface merging
interface User {
  name: string;
}

interface User {
  age: number;
}

// Final User = { name: string; age: number; }

// Namespace merging
namespace Utils {
  export function add(a: number, b: number) {
    return a + b;
  }
}

namespace Utils {
  export function subtract(a: number, b: number) {
    return a - b;
  }
}

// Utils both functions এ access করতে পারে
```

---

### ३५. Function property typing कि?
**उत्तर:** function এর properties এবং methods type safe করা।

**उदाहरण:**
```ts
interface Logger {
  (message: string): void;
  level: number;
  prefix: string;
}

const logger = ((message: string) =&gt; {
  console.log(`[${logger.prefix}] ${message}`);
}) as Logger;

logger.level = 1;
logger.prefix = 'APP';

logger('Hello'); // [APP] Hello
```

---

### ३६. Overload resolution কि?
**उत्तर:** multiple function signature থেকে সঠিকটা বেছে নেওয়া।

**उदाहरण:**
```ts
function process(x: string): string;
function process(x: number): number;
function process(x: string | number): string | number {
  if (typeof x === 'string') {
    return x.toUpperCase();
  }
  return x * 2;
}

const str = process('hello'); // type: string
const num = process(42); // type: number
```

---

### ३७. ThisType utility कि?
**उत्तर:** object literal এ `this` context explicitly type করা।

**उदाहरण:**
```ts
interface User {
  id: number;
  name: string;
  greet(this: User): void;
}

const user: User = {
  id: 1,
  name: 'John',
  greet() {
    console.log(this.name); // this: User
  }
};

// Or with ThisType
type MyThis = ThisType&lt;{ age: number }&gt;;
const obj: MyThis = {
  age: 30,
  getAge() {
    return this.age; // this has age property
  }
};
```

---

### ३८. Loose auto-typing কि?
**उत्तर:** TypeScript কিভাবে type infer করে বিভিন্ন context এ।

**उदाहरण:**
```ts
// Inferred types
let x = 'hello'; // type: string
let y = 42; // type: number
let z = true; // type: boolean
let arr = [1, 2, 3]; // type: number[]
let obj = { name: 'John' }; // type: { name: string }

// Contextual typing
const handler: (e: MouseEvent) =&gt; void = (e) =&gt; {
  // e automatically: MouseEvent
  console.log(e.clientX);
};

// Return type inference
function createUser(name: string) {
  return { name, id: 1 }; // type: { name: string; id: number }
}
```

---

### ३९. Nullish coalescing operator কि?
**उत्तर:** `??` operator, `null` বা `undefined` check করে, অন্য falsy values নয়।

**उदाहरण:**
```ts
// Difference from || operator
const a = null;
const b = a || 'default'; // 'default'
const c = a ?? 'default'; // 'default'

const d = 0;
const e = d || 'default'; // 'default' (0 is falsy)
const f = d ?? 'default'; // 0 (0 is not null/undefined)

const g = '';
const h = g || 'default'; // 'default' ('' is falsy)
const i = g ?? 'default'; // '' ('' is not null/undefined)

// Optional chaining combined
const user = getUserData();
const name = user?.profile?.name ?? 'Unknown';
```

---

### ४०. Optional chaining operator কि?
**उत्तर:** `?.` safely access করে nested properties/methods.

**उदाहरण:**
```ts
const user = { profile: { name: 'John' } };
const name = user?.profile?.name; // 'John'
const age = user?.profile?.age; // undefined (no error)

// Array access
const arr = [1, 2, 3];
const item = arr?.[5]; // undefined

// Method call
const greeting = user?.greet?.(); // calls greet if exists

// vs traditional
// const name = user && user.profile && user.profile.name;
// const name = user?.profile?.name; // much cleaner
```

---

### ४१. Type narrowing strategies कि?
**उत्तर:** union type কে narrow down করে specific type এ।

**उदाहरण:**
```ts
function process(x: string | number | boolean) {
  // typeof narrowing
  if (typeof x === 'string') {
    x.toUpperCase(); // x: string
  } else if (typeof x === 'number') {
    x.toFixed(2); // x: number
  }
  
  // Truthiness narrowing
  if (x) {
    // x: string | number (boolean false removed)
  }
  
  // Equality narrowing
  if (x === null) {
    // ...
  }
  
  // Control flow narrowing
  if (typeof x === 'string' && x.length &gt; 0) {
    // x: string with length &gt; 0
  }
}
```

---

### ४२. const assertion with `as const` vs `readonly` কি?
**उत्तर:** both make immutable কিন্তু ভিন্ন way এ।

**उदाहरण:**
```ts
// as const
const config = {
  name: 'app',
  port: 3000
} as const;
// type: { readonly name: 'app'; readonly port: 3000 }

// readonly
interface Config {
  readonly name: string;
  readonly port: number;
}

const config: Config = {
  name: 'app',
  port: 3000
};
// type: { readonly name: string; readonly port: number }

// as const is stricter (literal types)
// readonly allows variables (string, number types)
```

---

### ४३. Error handling type safety कि?
**उत्तर:** error handling properly type check করা।

**उदाहरण:**
```ts
// Result type pattern
type Result&lt;T, E = Error&gt; =
  | { success: true; data: T }
  | { success: false; error: E };

async function fetchUser(id: number): Promise&lt;Result&lt;User&gt;&gt; {
  try {
    const response = await fetch(`/api/users/${id}`);
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}

// Usage
const result = await fetchUser(1);
if (result.success) {
  console.log(result.data.name); // safe
} else {
  console.log(result.error.message); // safe
}
```

---

### ४४. Recursive type definition কि?
**उत्तर:** type নিজেকে reference করতে পারে recursive structure define করতে।

**उदाहरण:**
```ts
// Tree structure
interface TreeNode&lt;T&gt; {
  value: T;
  children?: TreeNode&lt;T&gt;[];
}

const tree: TreeNode&lt;number&gt; = {
  value: 1,
  children: [
    {
      value: 2,
      children: [{ value: 4 }, { value: 5 }]
    },
    { value: 3 }
  ]
};

// JSON-like structure
type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

const json: JsonValue = {
  name: 'John',
  age: 30,
  tags: ['dev', 'ts'],
  nested: {
    deep: true,
    array: [1, 2, { key: 'value' }]
  }
};
```

---

### ४५. Performance tips কि?
**उत्तर:** TypeScript code efficiently লিখা।

**उदाहरण:**
```ts
// 1. Avoid deep nesting
// Bad
type Deep = A & B & C & D & E & F & G & H;

// Good
type Combined = A & B;
type More = Combined & C;

// 2. Use const assertion for literals
const colors = ['red', 'green', 'blue'] as const; // not string[]

// 3. Avoid excessive method chaining type inference
const result = value
  .map(x =&gt; x * 2) // type inferred
  .filter(x =&gt; x &gt; 5) // type inferred
  .reduce((acc, x) =&gt; acc + x, 0); // type inferred

// 4. Use ambient declarations for 3rd party libs
declare module 'some-lib' {
  interface SomeInterface {
    customProp: string;
  }
}
```

---

### ४६. Template Literal Types কি?
**उत्तर:** ES6 template literals এর type-level equivalent। string manipulation at type level।

**उदाहरण:**
```ts
// Basic template literal types
type EventName = 'click' | 'hover' | 'focus';
type EventHandler&lt;T extends EventName&gt; = `on${Capitalize&lt;T&gt;}`;

type ClickHandler = EventHandler&lt;'click'&gt;; // 'onClick'
type HoverHandler = EventHandler&lt;'hover'&gt;; // 'onHover'

// Advanced: CSS class names
type Size = 'small' | 'medium' | 'large';
type Color = 'red' | 'blue' | 'green';
type Variant = `${Size}-${Color}`; // 'small-red' | 'small-blue' | etc.

// API endpoints
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Endpoint&lt;T extends HttpMethod&gt; = `/${Lowercase&lt;T&gt;}`;

type GetEndpoint = Endpoint&lt;'GET'&gt;; // '/get'
type PostEndpoint = Endpoint&lt;'POST'&gt;; // '/post'

// Extract from template
type ExtractMethod&lt;T&gt; = T extends `/${infer M}` ? Uppercase&lt;M&gt; : never;
type Method = ExtractMethod&lt;'/get'&gt;; // 'GET'
```

---

### ४७. Distributive Conditional Types কি?
**उत्तर:** union types এর সাথে conditional types এর behavior। union এর প্রতিটা member এ individually apply হয়।

**उदाहरण:**
```ts
// Distributive behavior
type ToArray&lt;T&gt; = T extends any ? T[] : never;

type Union = string | number | boolean;
type ArrayUnion = ToArray&lt;Union&gt;; // string[] | number[] | boolean[]

// Non-distributive (prevent with [])
type ToArrayNonDist&lt;T&gt; = [T] extends [any] ? T[] : never;
type SingleArray = ToArrayNonDist&lt;Union&gt;; // (string | number | boolean)[]

// Practical: Filter union types
type NonNullable&lt;T&gt; = T extends null | undefined ? never : T;

type Filtered = NonNullable&lt;string | number | null | undefined&gt;; // string | number

// Extract function types
type FunctionType&lt;T&gt; = T extends (...args: any[]) =&gt; any ? T : never;

type Funcs = FunctionType&lt;string | (() =&gt; void) | number&gt;; // () =&gt; void
```

---

### ४८. Advanced Decorator Patterns কি?
**उत्तर:** complex decorator scenarios এবং patterns।

**उदाहरण:**
```ts
// Method decorator with metadata
function validate(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;
  
  descriptor.value = function(...args: any[]) {
    // Validation logic
    for (let i = 0; i &lt; args.length; i++) {
      if (args[i] === undefined) {
        throw new Error(`Argument ${i} is required`);
      }
    }
    return method.apply(this, args);
  };
}

// Property decorator
function required(target: any, propertyKey: string) {
  const symbol = Symbol();
  
  Object.defineProperty(target, propertyKey, {
    get() {
      return this[symbol];
    },
    set(value) {
      if (value === undefined || value === null) {
        throw new Error(`${propertyKey} is required`);
      }
      this[symbol] = value;
    },
    enumerable: true,
    configurable: true
  });
}

// Class decorator
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

// Parameter decorator
function logParameter(target: any, propertyKey: string, parameterIndex: number) {
  console.log(`Parameter at index ${parameterIndex} in ${propertyKey}`);
}

class User {
  @required
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  
  @validate
  greet(@logParameter message: string) {
    return `${message} ${this.name}`;
  }
}

@sealed
class Admin extends User {
  // Cannot add new properties/methods
}
```

---

### ४९. Declaration Files (.d.ts) কি?
**उत्तर:** type definitions for JavaScript libraries। external modules এর types define করা।

**उदাহरण:**
```ts
// my-library.d.ts
declare module 'my-library' {
  export interface Config {
    apiKey: string;
    timeout?: number;
  }
  
  export function init(config: Config): void;
  export function fetchData&lt;T&gt;(endpoint: string): Promise&lt;T&gt;;
  
  export class ApiClient {
    constructor(config: Config);
    get&lt;T&gt;(path: string): Promise&lt;T&gt;;
    post&lt;T&gt;(path: string, data: any): Promise&lt;T&gt;;
  }
  
  // Global declarations
  global {
    interface Window {
      myLib: typeof import('my-library');
    }
  }
}

// Ambient module for existing JS
declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.json' {
  const content: any;
  export default content;
}

// Triple-slash reference
/// &lt;reference types="node" /&gt;
/// &lt;reference path="./custom-types.d.ts" /&gt;
```

---

### ५०. TypeScript with React Patterns কি?
**उत्तर:** React এ TypeScript এর advanced usage patterns।

**उदाहरण:**
```tsx
// Generic component props
interface ListProps&lt;T&gt; {
  items: T[];
  renderItem: (item: T, index: number) =&gt; React.ReactNode;
  onItemClick?: (item: T) =&gt; void;
}

function List&lt;T&gt;({ items, renderItem, onItemClick }: ListProps&lt;T&gt;) {
  return (
    &lt;ul&gt;
      {items.map((item, index) =&gt; (
        &lt;li key={index} onClick={() =&gt; onItemClick?.(item)}&gt;
          {renderItem(item, index)}
        &lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}

// HOC with generics
function withLoading&lt;T extends {}&gt;(
  Component: React.ComponentType&lt;T&gt;
) {
  return function WithLoadingComponent(props: T & { loading?: boolean }) {
    const { loading, ...rest } = props;
    
    if (loading) return &lt;div&gt;Loading...&lt;/div&gt;;
    return &lt;Component {...(rest as T)} /&gt;;
  };
}

// Custom hooks with generics
function useLocalStorage&lt;T&gt;(
  key: string, 
  initialValue: T
): [T, (value: T | ((prev: T) =&gt; T)) =&gt; void] {
  const [storedValue, setStoredValue] = useState&lt;T&gt;(() =&gt; {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((prev: T) =&gt; T)) =&gt; {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// Event handlers
type ButtonEvent = React.MouseEvent&lt;HTMLButtonElement&gt;;
type InputEvent = React.ChangeEvent&lt;HTMLInputElement&gt;;

const handleClick = (event: ButtonEvent) =&gt; {
  console.log(event.currentTarget);
};

const handleChange = (event: InputEvent) =&gt; {
  console.log(event.target.value);
};
```

---

### ५१. Advanced Module Resolution কি?
**उत्तर:** TypeScript কিভাবে modules resolve করে এবং configure করে।

**उदाहरण:**
```json
// tsconfig.json module resolution
{
  "compilerOptions": {
    "moduleResolution": "node", // or "classic"
    "baseUrl": "./src",
    "paths": {
      "@/*": ["*"],
      "@/components/*": ["components/*"],
      "@/utils/*": ["utils/*"]
    },
    "rootDirs": ["src", "generated"],
    "typeRoots": ["./node_modules/@types", "./custom-types"]
  }
}

// Path mapping usage
import { Button } from '@/components/Button';
import { api } from '@/utils/api';
import * as config from '@/config';

// Module augmentation for path mapping
declare module '@/utils/api' {
  export function customEndpoint(): Promise&lt;any&gt;;
}

// Dynamic imports with types
const loadModule = async (): Promise&lt;typeof import('./module')&gt; =&gt; {
  return import('./module');
};

// Conditional exports
export { default as Component } from './Component';
export { helper } from './utils';
export type { Props } from './types';
```

---

### ५२. TypeScript Compiler API Concepts কি?
**उत्तर:** TypeScript compiler এর internal APIs এবং usage।

**उदাহরণ:**
```ts
// Basic compiler API usage
import * as ts from 'typescript';

const source = `
  interface User {
    name: string;
    age: number;
  }
  
  const user: User = { name: 'John', age: 30 };
`;

const result = ts.transpile(source, {
  target: ts.ScriptTarget.ES2020,
  module: ts.ModuleKind.CommonJS
});

console.log(result); // Transpiled JavaScript

// AST manipulation
function analyzeCode(code: string) {
  const sourceFile = ts.createSourceFile(
    'temp.ts',
    code,
    ts.ScriptTarget.Latest,
    true
  );
  
  function visit(node: ts.Node) {
    if (ts.isInterfaceDeclaration(node)) {
      console.log(`Found interface: ${node.name.text}`);
    }
    ts.forEachChild(node, visit);
  }
  
  visit(sourceFile);
}

// Custom transformer
const transformer: ts.TransformerFactory&lt;ts.SourceFile&gt; = (context) =&gt; {
  return (sourceFile) =&gt; {
    function visit(node: ts.Node): ts.Node {
      if (ts.isCallExpression(node) && 
          ts.isIdentifier(node.expression) && 
          node.expression.text === 'console.log') {
        // Replace console.log with custom logger
        return ts.factory.createCallExpression(
          ts.factory.createIdentifier('logger'),
          undefined,
          node.arguments
        );
      }
      return ts.visitEachChild(node, visit, context);
    }
    
    return ts.visitNode(sourceFile, visit);
  };
};
```

---

### ५३. Advanced Error Handling Patterns কি?
**उत्तर:** complex error scenarios এবং type-safe error handling।

**उदाहरण:**
```ts
// Custom error classes
class ValidationError extends Error {
  constructor(
    message: string,
    public field: string,
    public value: any
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

class NetworkError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public response?: any
  ) {
    super(message);
    this.name = 'NetworkError';
  }
}

// Error union types
type ApiError = ValidationError | NetworkError | Error;

// Result type with detailed errors
type Result&lt;T, E extends Error = Error&gt; = 
  | { success: true; data: T }
  | { success: false; error: E };

// Async error handling
async function safeApiCall&lt;T&gt;(
  apiCall: () =&gt; Promise&lt;T&gt;
): Promise&lt;Result&lt;T, ApiError&gt;&gt; {
  try {
    const data = await apiCall();
    return { success: true, data };
  } catch (error) {
    if (error instanceof ValidationError || 
        error instanceof NetworkError) {
      return { success: false, error };
    }
    return { success: false, error: new Error('Unknown error') };
  }
}

// Error boundary pattern (React-like)
class ErrorBoundary {
  private errors: Error[] = [];
  
  catch&lt;T&gt;(fn: () =&gt; T): Result&lt;T, Error&gt; {
    try {
      return { success: true, data: fn() };
    } catch (error) {
      this.errors.push(error as Error);
      return { success: false, error: error as Error };
    }
  }
  
  getErrors(): readonly Error[] {
    return this.errors;
  }
}

// Type-safe error throwing
function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function processUser(user: any): asserts user is User {
  assert(typeof user === 'object' && user !== null, 'User must be an object');
  assert(typeof user.name === 'string', 'User name must be a string');
  assert(typeof user.age === 'number', 'User age must be a number');
}
```

---

### ५४. Type-level Programming কি?
**उत्तर:** TypeScript এর type system ব্যবহার করে computation at compile time।

**उदाहरण:**
```ts
// Boolean logic at type level
type And&lt;A extends boolean, B extends boolean&gt; = A extends true 
  ? B extends true ? true : false 
  : false;

type Or&lt;A extends boolean, B extends boolean&gt; = A extends true 
  ? true 
  : B extends true ? true : false;

type Not&lt;A extends boolean&gt; = A extends true ? false : true;

// Arithmetic at type level
type Add&lt;A extends number, B extends number&gt; = 
  [...BuildTuple&lt;A&gt;, ...BuildTuple&lt;B&gt;]['length'];

type BuildTuple&lt;N extends number, T extends any[] = []&gt; = 
  T['length'] extends N ? T : BuildTuple&lt;N, [...T, any]&gt;;

// String manipulation
type Length&lt;S extends string&gt; = Split&lt;S, ''&gt;['length'];
type Split&lt;S extends string, D extends string&gt; = 
  S extends `${infer T}${D}${infer U}` ? [T, ...Split&lt;U, D&gt;] : [S];

// Advanced: Fibonacci at type level
type Fibonacci&lt;N extends number&gt; = 
  N extends 0 ? 0 :
  N extends 1 ? 1 :
  Add&lt;Fibonacci&lt;Subtract&lt;N, 1&gt;&gt;, Fibonacci&lt;Subtract&lt;N, 2&gt;&gt;&gt;;

// Type-level sorting (simplified)
type Sort&lt;T extends number[]&gt; = 
  T extends [infer F extends number, infer R extends number[]]
    ? Insert&lt;F, Sort&lt;R&gt;&gt;
    : [];

type Insert&lt;N extends number, T extends number[]&gt; = 
  T extends [infer F extends number, ...infer R extends number[]]
    ? N extends F ? [N, F, ...R] : [F, ...Insert&lt;N, R&gt;]
    : [N];
```

---

### ५५. Advanced Utility Types কি?
**उत्तर:** complex type transformations এবং utility patterns।

**उदाहरण:**
```ts
// Deep partial
type DeepPartial&lt;T&gt; = {
  [K in keyof T]?: T[K] extends object ? DeepPartial&lt;T[K]&gt; : T[K];
};

// Deep readonly
type DeepReadonly&lt;T&gt; = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly&lt;T[K]&gt; : T[K];
};

// Function parameter extraction
type Parameters&lt;T extends (...args: any) =&gt; any&gt; = T extends (...args: infer P) =&gt; any ? P : never;
type ReturnType&lt;T extends (...args: any) =&gt; any&gt; = T extends (...args: any) =&gt; infer R ? R : any;

// Constructor parameters
type ConstructorParameters&lt;T extends new (...args: any) =&gt; any&gt; = 
  T extends new (...args: infer P) =&gt; any ? P : never;

// Instance type from constructor
type InstanceType&lt;T extends new (...args: any) =&gt; any&gt; = T extends new (...args: any) =&gt; infer R ? R : any;

// Promise unwrapping
type Awaited&lt;T&gt; = T extends PromiseLike&lt;infer U&gt; ? U : T;

// Union to intersection
type UnionToIntersection&lt;U&gt; = 
  (U extends any ? (k: U) =&gt; void : never) extends (k: infer I) =&gt; void ? I : never;

type Result = UnionToIntersection&lt;{ a: string } | { b: number }&gt;; // { a: string } & { b: number }

// Flatten union
type Flatten&lt;T&gt; = T extends readonly (infer U)[] ? U : T;

// String literal union to object
type StringToObject&lt;T extends string&gt; = {
  [K in T]: K;
};

type Colors = 'red' | 'green' | 'blue';
type ColorObject = StringToObject&lt;Colors&gt;; // { red: 'red', green: 'green', blue: 'blue' }

// Strict extract
type StrictExtract&lt;T, U&gt; = T extends U ? U extends T ? T : never : never;

// Nominal typing (simulate)
type Brand&lt;T, Brand&gt; = T & { __brand: Brand };
type UserId = Brand&lt;string, 'UserId'&gt;;
type PostId = Brand&lt;string, 'PostId'&gt;;

const userId = '123' as UserId;
const postId = '456' as PostId;
// userId = postId; // Error: different brands
```

---

### ५६. TypeScript with Angular Patterns কি?
**उत्तर:** Angular এ TypeScript এর advanced usage।

**उदाहरण:**
```ts
// Injectable service with generics
@Injectable({
  providedIn: 'root'
})
export class ApiService&lt;T&gt; {
  constructor(private http: HttpClient) {}

  getAll(): Observable&lt;T[]&gt; {
    return this.http.get&lt;T[]&gt;(this.endpoint);
  }

  getById(id: number): Observable&lt;T&gt; {
    return this.http.get&lt;T&gt;(`${this.endpoint}/${id}`);
  }

  create(item: Omit&lt;T, 'id'&gt;): Observable&lt;T&gt; {
    return this.http.post&lt;T&gt;(this.endpoint, item);
  }

  update(id: number, item: Partial&lt;T&gt;): Observable&lt;T&gt; {
    return this.http.patch&lt;T&gt;(`${this.endpoint}/${id}`, item);
  }

  delete(id: number): Observable&lt;void&gt; {
    return this.http.delete&lt;void&gt;(`${this.endpoint}/${id}`);
  }
}

// Component with strict typing
@Component({
  selector: 'app-user-list',
  template: `
    &lt;div *ngFor="let user of users"&gt;
      {{ user.name }} ({{ user.age }})
    &lt;/div&gt;
  `
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  private destroy$ = new Subject&lt;void&gt;();

  constructor(private userService: ApiService&lt;User&gt;) {}

  ngOnInit() {
    this.userService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe(users =&gt; this.users = users);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

// Guard with type safety
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable&lt;boolean | UrlTree&gt; | Promise&lt;boolean | UrlTree&gt; | boolean | UrlTree {
    return this.authService.isAuthenticated().pipe(
      map(isAuth =&gt; isAuth || this.router.createUrlTree(['/login']))
    );
  }
}

// Resolver with generics
export class UserResolver implements Resolve&lt;User&gt; {
  constructor(private userService: ApiService&lt;User&gt;) {}

  resolve(route: ActivatedRouteSnapshot): Observable&lt;User&gt; {
    const id = +route.params['id'];
    return this.userService.getById(id).pipe(
      catchError(() =&gt; {
        // Handle error, maybe redirect
        return EMPTY;
      })
    );
  }
}
```

---

### ५७. Declaration Merging Advanced Patterns কি?
**उत्तर:** complex declaration merging scenarios।

**उदाहरण:**
```ts
// Interface + namespace merging
interface Vector2D {
  x: number;
  y: number;
}

namespace Vector2D {
  export function create(x: number, y: number): Vector2D {
    return { x, y };
  }
  
  export function add(a: Vector2D, b: Vector2D): Vector2D {
    return { x: a.x + b.x, y: a.y + b.y };
  }
}

// Usage
const v1 = Vector2D.create(1, 2);
const v2 = Vector2D.create(3, 4);
const sum = Vector2D.add(v1, v2);

// Class + interface merging
class MyClass {
  constructor(public value: number) {}
}

interface MyClass {
  computed: string;
}

MyClass.prototype.computed = 'computed value';

// Function + interface merging
function greet(name: string): string;
function greet(name: string, age: number): string;

interface greet {
  defaultMessage: string;
}

greet.defaultMessage = 'Hello!';

// Implementation
function greet(name: string, age?: number): string {
  if (age) {
    return `${greet.defaultMessage} I'm ${name}, ${age} years old.`;
  }
  return `${greet.defaultMessage} I'm ${name}.`;
}

// Enum + namespace merging
enum Color {
  Red = 'RED',
  Blue = 'BLUE'
}

namespace Color {
  export function isPrimary(color: Color): boolean {
    return color === Color.Red || color === Color.Blue;
  }
  
  export function toHex(color: Color): string {
    switch (color) {
      case Color.Red: return '#FF0000';
      case Color.Blue: return '#0000FF';
      default: return '#000000';
    }
  }
}
```

---

### ५८. TypeScript Tooling এবং Ecosystem কি?
**उत्तर:** TypeScript development tools এবং ecosystem।

**उदाहरण:**
```ts
// TSLint/ESLint configuration for TypeScript
// .eslintrc.js
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    '@typescript-eslint/recommended-requiring-type-checking'
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error'
  }
};

// Prettier configuration
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}

// TypeScript project references
// tsconfig.json
{
  "files": [],
  "references": [
    { "path": "./packages/core" },
    { "path": "./packages/ui" },
    { "path": "./packages/api" }
  ]
}

// packages/core/tsconfig.json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "../../dist/core",
    "rootDir": "."
  },
  "include": ["src/**/*"],
  "exclude": ["**/*.test.ts"]
}

// Build tools integration
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

---

### ५९. Performance Optimization with TypeScript কি?
**उत्तर:** TypeScript code এর performance optimize করার techniques।

**उदাহরণ:**
```ts
// 1. Type instantiation optimization
// Bad: Deep generic instantiation
type DeepGeneric&lt;T&gt; = T extends object 
  ? { [K in keyof T]: DeepGeneric&lt;T[K]&gt; } 
  : T;

// Good: Use conditional types carefully
type ShallowGeneric&lt;T&gt; = T extends object 
  ? { [K in keyof T]: T[K] } 
  : T;

// 2. Avoid excessive type computation
// Bad: Computed every time
type BadType&lt;T&gt; = T extends string 
  ? `prefix_${T}` 
  : T extends number 
    ? T 
    : never;

// Good: Pre-compute where possible
type StringType = `prefix_${string}`;
type GoodType&lt;T&gt; = T extends string 
  ? StringType 
  : T extends number 
    ? T 
    : never;

// 3. Use const assertions for large objects
const config = {
  api: { baseUrl: 'https://api.example.com', timeout: 5000 },
  features: ['auth', 'dashboard', 'reports'] as const,
  permissions: {
    admin: ['read', 'write', 'delete'] as const,
    user: ['read'] as const
  } as const
} as const;

// 4. Type caching with interfaces
interface User {
  readonly id: number;
  readonly name: string;
  readonly email: string;
}

// Avoid recreating types
type UserUpdate = Partial&lt;Pick&lt;User, 'name' | 'email'&gt;&gt;;
type UserCreate = Omit&lt;User, 'id'&gt;;

// 5. Lazy type evaluation
type Lazy&lt;T&gt; = T extends object ? T : T;

// 6. Compiler options for performance
// tsconfig.json
{
  "compilerOptions": {
    "skipLibCheck": true,        // Skip type checking of declaration files
    "incremental": true,         // Enable incremental compilation
    "tsBuildInfoFile": ".tsbuildinfo",
    "isolatedModules": true,     // Ensure each file can be transpiled independently
    "preserveWatchOutput": true  // Keep watch mode output
  }
}

// 7. Bundle splitting with dynamic imports
const loadHeavyModule = async (): Promise&lt;typeof import('./heavy-module')&gt; =&gt; {
  return import('./heavy-module');
};

// With type safety
type HeavyModule = typeof import('./heavy-module');
const loadModule = (): Promise&lt;HeavyModule&gt; =&gt; import('./heavy-module');
```

---

### ६०. Advanced Type Guards এবং Assertions কি?
**उत्तर:** complex type narrowing এবং assertion patterns।

**उदाहरण:**
```ts
// Advanced type guards
function isArrayOf&lt;T&gt;(
  value: unknown, 
  guard: (item: unknown) =&gt; item is T
): value is T[] {
  return Array.isArray(value) && value.every(guard);
}

function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj &&
    'email' in obj &&
    typeof (obj as User).id === 'number' &&
    typeof (obj as User).name === 'string' &&
    typeof (obj as User).email === 'string'
  );
}

// Assertion functions
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error('Value must be a string');
  }
}

function assertIsDefined&lt;T&gt;(value: T): asserts value is NonNullable&lt;T&gt; {
  if (value === null || value === undefined) {
    throw new Error('Value must be defined');
  }
}

// Advanced assertion with generics
function assertType&lt;T&gt;(
  value: unknown, 
  guard: (value: unknown) =&gt; value is T,
  message = 'Type assertion failed'
): asserts value is T {
  if (!guard(value)) {
    throw new Error(message);
  }
}

// Usage
function processData(data: unknown) {
  assertType(data, isUser, 'Data must be a valid user');
  // data is now User
  
  assertIsDefined(data.email);
  // data.email is now string (not string | undefined)
  
  console.log(data.email.toUpperCase());
}

// Custom type guards with generics
function hasProperty&lt;T, K extends string&gt;(
  obj: T, 
  prop: K
): obj is T & Record&lt;K, unknown&gt; {
  return typeof obj === 'object' && obj !== null && prop in obj;
}

function hasStringProperty&lt;T, K extends string&gt;(
  obj: T, 
  prop: K
): obj is T & Record&lt;K, string&gt; {
  return hasProperty(obj, prop) && typeof obj[prop] === 'string';
}

// Advanced narrowing with control flow
function processValue(value: string | number | boolean | null | undefined) {
  if (value == null) return; // null | undefined removed
  
  if (typeof value === 'boolean') {
    // value: boolean
    return value ? 'true' : 'false';
  }
  
  if (typeof value === 'number') {
    // value: number
    return value.toFixed(2);
  }
  
  // value: string (remaining possibility)
  return value.toUpperCase();
}

// Exhaustive checking
type Shape = { kind: 'circle'; radius: number } | { kind: 'square'; side: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'square':
      return shape.side ** 2;
    default:
      // TypeScript will error if we miss a case
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}
```

---

*সব Advanced TypeScript topics কভার হয়েছে! এখন senior developers ও এই প্রশ্নগুলো থেকে উপকৃত হতে পারবেন।*
