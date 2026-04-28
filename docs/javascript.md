# JavaScript ইন্টারভিউ প্রশ্ন ও উত্তর (বাংলা)

---

## ফ্রেশার লেভেল

### ১. JavaScript কি?
**উত্তর:** একটা লাইটওয়েট, ইন্টারপ্রেটেড প্রোগ্রামিং ভাষা। ব্রাউজার ও সার্ভার (Node.js) উভয় জায়গায় চলে। ইউজার ইন্টারঅ্যাকশন, ডায়নামিক কনটেন্ট তৈরি, অ্যাসিঙ্ক কাজ ইত্যাদির জন্য ব্যবহৃত।

---

### ২. var, let, const এর পার্থক্য কি?
**উত্তর:**
- **var:** ফাংশন স্কোপড, রি-ডিক্লেয়ার করা যায়, hoisting হয় (undefined দিয়ে)।
- **let:** ব্লক স্কোপড, রি-ডিক্লেয়ার করা যায় না, hoisting হয় কিন্তু এক্সেস করা যায় না (temporal dead zone)।
- **const:** ব্লক স্কোপড, রি-ডিক্লেয়ার ও রি-এসাইন করা যায় না, তবে অবজেক্টের প্রপার্টি চেঞ্জ করা যায়।

**উদাহরণ:**
```js
// var
function test() {
  if (true) {
    var x = 1;
  }
  console.log(x); // 1 (function scope)
}

// let
function test2() {
  if (true) {
    let y = 2;
  }
  console.log(y); // ReferenceError (block scope)
}

// const
const obj = { name: 'John' };
obj.name = 'Jane'; // OK
obj = {}; // TypeError
```

---

### ৩. Data types কি কি?
**উত্তর:** JavaScript ৮টা ডাটা টাইপ আছে:
- **Primitive:** String, Number, Boolean, null, undefined, Symbol, BigInt
- **Non-primitive:** Object (যার মধ্যে Array, Function আছে)

**উদাহরণ:**
```js
typeof "hello"; // "string"
typeof 42; // "number"
typeof true; // "boolean"
typeof undefined; // "undefined"
typeof Symbol('id'); // "symbol"
typeof 123n; // "bigint"
typeof {}; // "object"
typeof []; // "object" (Array হল Object)
```

---

### ৪. Function কি? Function declaration ও function expression কার পার্থক্য?
**উত্তর:** একটা রিইউজেবল কোড ব্লক যা একটা কাজ করে।
- **Declaration:** `function name() {}` - hoisted হয়, যেকোনো জায়গা থেকে কল করা যায়।
- **Expression:** `const name = function() {}` - hoisted হয় না (var/let/const এর মতো), এক্সপ্রেশন পার্ট যা রিটার্ন হয়।

**উদাহরণ:**
```js
// Declaration – hoisting এর কারণে এগুলো কল করা যায় সংজ্ঞার আগেও
console.log(add(2, 3)); // 5
function add(a, b) {
  return a + b;
}

// Expression – hoisting হয় না
console.log(subtract(5, 2)); // ReferenceError
const subtract = function(a, b) {
  return a - b;
};
```

---

### ৫. Arrow function কি? এর লাভ কি?
**উত্তর:** ES6 এর সংক্ষিপ্ত ফাংশন লেখার উপায়: `const func = (x) => x * 2;`। লাভ:
- সংক্ষিপ্ত সিনট্যাক্স
- `this` ইনহেরিট করে (bind এর দরকার হয় না)
- একটা expression এর জন্য return লাগে না

**উদাহরণ:**
```js
// Regular function
const square = function(x) {
  return x * x;
};

// Arrow function
const square = (x) => x * x;

// this এর ক্ষেত্রে arrow function
const person = {
  name: 'John',
  greet: function() {
    setTimeout(() => {
      console.log(`Hello ${this.name}`); // this = person
    }, 100);
  }
};
```

---

### ৬. Closure কি?
**উত্তর:** একটা ফাংশন যা অন্য ফাংশনের ভেরিয়েবল রিমেম্বার করে, এমনকি বাহ্যিক ফাংশন এক্সিকিউট শেষ হলেও। ডেটা প্রাইভেট রাখতে ও ফাংশন রিটার্ন করতে ব্যবহৃত।

**উদাহরণ:**
```js
function outer() {
  let count = 0;
  
  return function inner() {
    count++;
    console.log(count);
  };
}

const counter = outer();
counter(); // 1
counter(); // 2
counter(); // 3
// count ভেরিয়েবল inner ফাংশনের কাছে রিমেম্বার আছে (closure)
```

---

### ৭. Scope ও Scope Chain কি?
**উত্তর:** 
- **Scope:** যেখানে ভেরিয়েবল এক্সেস করা যায়। তিন ধরনের: Global, Function, Block।
- **Scope Chain:** যখন ভেরিয়েবল খুঁজা হয় তখন আগে লোকাল, তারপর আউটার, তারপর গ্লোবাল—এই অর্ডার।

**উদাহরণ:**
```js
let global = 'global';

function outer() {
  let outerVar = 'outer';
  
  function inner() {
    let innerVar = 'inner';
    console.log(innerVar); // 'inner'
    console.log(outerVar); // 'outer' (scope chain)
    console.log(global); // 'global' (scope chain)
  }
  inner();
}
outer();
```

---

### ৮. Hoisting কি?
**উত্তর:** JavaScript অ্যাসাইনমেন্টের আগে ভেরিয়েবল ও ফাংশনের ডিক্লেয়ারেশন স্কোপের টপে নিয়ে যায়।
- **var:** undefined দিয়ে hoisted হয়
- **let/const:** hoisted হয় কিন্তু TDZ (Temporal Dead Zone) এ থাকে
- **Function declaration:** সম্পূর্ণভাবে hoisted হয়

**উদাহরণ:**
```js
console.log(x); // undefined (var hoisted)
var x = 5;

console.log(y); // ReferenceError (let in TDZ)
let y = 10;

console.log(add(2, 3)); // 5 (function declaration hoisted)
function add(a, b) {
  return a + b;
}
```

---

### ৯. Prototype ও Prototype chain কি?
**উত্তর:** 
- **Prototype:** একটা অবজেক্ট যার কাছে অন্য অবজেক্ট প্রপার্টি ইনহেরিট করতে পারে।
- **Prototype chain:** অবজেক্ট থেকে শুরু করে এর prototype এ, তারপর সেটার prototype এ—এভাবে খুঁজা হয়।

**উদাহরণ:**
```js
const parent = { greet() { return 'Hello'; } };
const child = Object.create(parent);
console.log(child.greet()); // 'Hello' (prototype chain এর মাধ্যমে)

// Constructor function
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function() {
  return `Hello ${this.name}`;
};
const p = new Person('John');
console.log(p.greet()); // 'Hello John'
```

---

### ১০. `this` কি? `this` এর মান কিভাবে নির্ধারিত হয়?
**উত্তর:** `this` হল current execution context এর অবজেক্ট। এর মান কিভাবে কল করা হয় তার উপর নির্ভর করে:
- **Method call:** `obj.method()` → `this = obj`
- **Function call:** `func()` → `this = undefined` (strict mode) বা `window` (non-strict)
- **Constructor:** `new Func()` → `this = new object`
- **Arrow function:** `this` inherit করে surrounding context থেকে
- **bind/call/apply:** explicit `this` সেট করা যায়

**উদাহরণ:**
```js
const obj = {
  name: 'John',
  greet() {
    console.log(this.name); // this = obj
  }
};
obj.greet(); // 'John'

// Arrow function
const person = {
  name: 'Jane',
  greet: () => {
    console.log(this); // this = window (surrounding context)
  }
};
```

---

### ১১. Callback কি? Callback hell কি?
**উত্তর:** একটা ফাংশন যা অন্য ফাংশনকে argument হিসেবে পাস করা হয়। Event/async কাজের রেজাল্ট হ্যান্ডেল করতে ব্যবহৃত।

**Callback hell:** অনেক nested callback যা কোড অপাঠ্য করে তোলে।

**উদাহরণ:**
```js
// Callback hell
getData(userId, function(data1) {
  getDetails(data1.id, function(data2) {
    getAddress(data2.addressId, function(data3) {
      console.log(data3); // অনেক nested!
    });
  });
});

// Promise/async দিয়ে এড়ানো যায়
const data1 = await getData(userId);
const data2 = await getDetails(data1.id);
const data3 = await getAddress(data2.addressId);
console.log(data3);
```

---

### ১२. Promise কি? States কি?
**উত্তর:** Promise একটা অবজেক্ট যা async অপারেশনের রেজাল্ট represent করে। তিনটা state আছে:
- **Pending:** কাজ চলছে, রেজাল্ট এখনো নেই
- **Fulfilled:** কাজ সফল, রেজাল্ট পাওয়া গেছে
- **Rejected:** কাজ ব্যর্থ, এরর পাওয়া গেছে

**উদাহরণ:**
```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Success');
  }, 1000);
});

promise
  .then(result => console.log(result)) // Success
  .catch(error => console.log(error));
```

---

## ইন্টারমিডিয়েট লেভেল

### ১৩. Promise chaining কি?
**উত্তর:** একের পর এক Promise execute করার পদ্ধতি। প্রতিটা `.then()` এর পর নতুন `.then()` যোগ করে পরের কাজ করা হয়।

**উদাহরণ:**
```js
fetch('/user/1')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err));

// Multiple operations
Promise.resolve(1)
  .then(x => x + 1)
  .then(x => x * 2)
  .then(x => console.log(x)); // 4
```

---

### ১४. async/await কি?
**উত্তর:** Promise লেখার সহজ উপায়। `async` ফাংশন সবসময় Promise রিটার্ন করে। `await` কীওয়ার্ড Promise সমাধান না হওয়া পর্যন্ত অপেক্ষা করে।

**উদাহরণ:**
```js
// Promise চেইন
function fetchUser(id) {
  return fetch(`/user/${id}`)
    .then(res => res.json())
    .then(data => data);
}

// async/await
async function fetchUser(id) {
  const res = await fetch(`/user/${id}`);
  const data = await res.json();
  return data;
}

// ব্যবহার
const user = await fetchUser(1);
console.log(user);
```

---

### ১৫. Error handling কিভাবে করব?
**উত্তর:** Promise এ `.catch()`, async/await এ try/catch ব্যবহার করা হয়।

**উদাহরণ:**
```js
// Promise
fetch('/user')
  .then(res => res.json())
  .catch(err => console.log('Error:', err));

// async/await
async function getUser() {
  try {
    const res = await fetch('/user');
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log('Error:', err);
  } finally {
    console.log('Done');
  }
}

getUser();
```

---

### ১६. Spread operator (...) কি?
**উত্তর:** Array বা object কে expand করতে ব্যবহৃত। Array কপি, merge, function argument পাস করতে সুবিধাজনক।

**উদাহরণ:**
```js
// Array spread
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

// Object spread
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }

// Function argument
function sum(a, b, c) {
  return a + b + c;
}
sum(...[1, 2, 3]); // 6
```

---

### ১७. Destructuring কি?
**উত্তর:** Array বা object থেকে সরাসরি ভেরিয়েবলে ভ্যালু বের করা। কোড সংক্ষিপ্ত করে।

**উদাহরণ:**
```js
// Array destructuring
const [a, b, c] = [1, 2, 3];
console.log(a); // 1

// Object destructuring
const { name, age } = { name: 'John', age: 30 };
console.log(name); // 'John'

// Nested
const { user: { name, email } } = data;

// Default value
const { status = 'active' } = {};
console.log(status); // 'active'
```

---

### ১८. Template literals কি?
**উত্তর:** ব্যাকটিক (`) দিয়ে স্ট্রিং লেখা। interpolation, multiline সাপোর্ট করে।

**উদাহরণ:**
```js
const name = 'John';
const age = 30;

// Template literal
const message = `Hello ${name}, you are ${age} years old`;
console.log(message);

// Multiline
const html = `
  <div>
    <h1>${name}</h1>
    <p>Age: ${age}</p>
  </div>
`;
```

---

### १९. map, filter, reduce কি কি কাজ করে?
**উত্তর:** Array methods যা functional programming এ ব্যবহৃত হয়।
- **map:** প্রতিটা element এ ফাংশন apply করে নতুন array রিটার্ন করে
- **filter:** শর্ত পূরণ করা elements নিয়ে নতুন array তৈরি করে
- **reduce:** array কে একটা সিঙ্গেল ভ্যালুতে কমিয়ে আনে

**উদাহরণ:**
```js
const numbers = [1, 2, 3, 4, 5];

// map
const doubled = numbers.map(x => x * 2); // [2, 4, 6, 8, 10]

// filter
const even = numbers.filter(x => x % 2 === 0); // [2, 4]

// reduce
const sum = numbers.reduce((acc, x) => acc + x, 0); // 15
```

---

### २०. `const` দিয়ে declaration করলেও object এর প্রপার্টি চেঞ্জ করা যায় কেন?
**উত্তর:** `const` শুধু ভেরিয়েবল রি-এসাইন করা থেকে বাধা দেয়, কিন্তু object এর কনটেন্ট চেঞ্জ করা বাধা দেয় না। object এর reference সেম থাকে, শুধু ইনসাইড চেঞ্জ হয়।

**উদাহরণ:**
```js
const obj = { name: 'John' };
obj.name = 'Jane'; // OK - কনটেন্ট চেঞ্জ
console.log(obj); // { name: 'Jane' }

obj = {}; // TypeError - রি-এসাইন করা যাচ্ছে না
```

---

## অ্যাডভান্সড লেভেল

### २१. Class কি? Constructor কি?
**উত্তর:** ES6 থেকে class এসেছে। Object তৈরির সহজ উপায়। Constructor হল একটা বিশেষ method যা object তৈরির সময় কল হয়।

**উদাহরণ:**
```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    console.log(`Hello ${this.name}`);
  }
}

const p = new Person('John', 30);
p.greet(); // Hello John
```

---

### २२. Inheritance কি?
**উত্তর:** একটা class এর প্রপার্টি ও method অন্য class তে পাওয়া। `extends` কীওয়ার্ড দিয়ে করা হয়।

**উদাহরণ:**
```js
class Animal {
  speak() {
    console.log('Animal speaks');
  }
}

class Dog extends Animal {
  speak() {
    console.log('Woof!');
  }
}

const dog = new Dog();
dog.speak(); // Woof!
```

---

### २३. setTimeout, setInterval কি? পার্থক্য কি?
**উত্তর:**
- **setTimeout:** একবার নির্দিষ্ট সময় পর কোড execute করে
- **setInterval:** বারবার একটা নির্দিষ্ট সময় interval এ execute করে

**উদাহরণ:**
```js
// setTimeout – একবার
setTimeout(() => console.log('After 2 seconds'), 2000);

// setInterval – বারবার
const id = setInterval(() => {
  console.log('Every 1 second');
}, 1000);

// বন্ধ করতে
clearInterval(id);
```

---

### २४. Event delegation কি?
**উত্তর:** প্যারেন্ট এলিমেন্টে event listener যোগ করে child elements এর events হ্যান্ডেল করা। মেমরি সাশ্রয়ী।

**উদাহরণ:**
```js
// Without delegation - প্রতিটা item এ listener
document.querySelectorAll('li').forEach(li => {
  li.addEventListener('click', () => console.log(li.textContent));
});

// With delegation - parent এ listener
document.querySelector('ul').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    console.log(e.target.textContent);
  }
});
```

---

### २५. `new` কীওয়ার্ড কি করে?
**উত্তর:** চারটা কাজ করে:
1. নতুন অবজেক্ট তৈরি করে
2. object এর `__proto__` কে constructor এর prototype এ যুক্ত করে
3. constructor কল করে (context `this` = নতুন object)
4. object রিটার্ন করে

**উদাহরণ:**
```js
function Func() {
  this.prop = 'value';
}

const obj = new Func();
// ১. নতুন object তৈরি
// ২. obj.__proto__ = Func.prototype
// ३. Func.call(obj)
// 4. obj রিটার্ন
```

---

### २६. localStorage, sessionStorage কি?
**উত্তর:** ব্রাউজারে ডেটা store করার উপায়।
- **localStorage:** পার্সিস্টেন্ট, ব্রাউজার বন্ধ করলেও থাকে
- **sessionStorage:** সেশন ডিউরেশন, ট্যাব বন্ধ করলে দূর হয়

**উদাহরণ:**
```js
// Set
localStorage.setItem('name', 'John');

// Get
const name = localStorage.getItem('name'); // 'John'

// Remove
localStorage.removeItem('name');

// Clear all
localStorage.clear();
```

---

### २७. JSON.stringify() এবং JSON.parse() কি কাজ করে?
**উত্তর:**
- **JSON.stringify:** Object কে JSON string এ কনভার্ট করে
- **JSON.parse:** JSON string কে object এ কনভার্ট করে

**উদাহরণ:**
```js
const obj = { name: 'John', age: 30 };

// stringify
const str = JSON.stringify(obj);
console.log(str); // '{"name":"John","age":30}'

// parse
const parsed = JSON.parse(str);
console.log(parsed); // { name: 'John', age: 30 }

// localStorage এ store করতে
localStorage.setItem('user', JSON.stringify(obj));
const user = JSON.parse(localStorage.getItem('user'));
```

---

### २८. Memoization কি?
**উত্তর:** ফাংশন কল এর রেজাল্ট cache করে, পরবর্তী একই argument এ cached রেজাল্ট দিয়ে সময় সাশ্রয় করা।

**উদাহরণ:**
```js
function fibonacci(n, cache = {}) {
  if (n in cache) return cache[n];
  if (n <= 1) return n;
  
  cache[n] = fibonacci(n - 1, cache) + fibonacci(n - 2, cache);
  return cache[n];
}

console.log(fibonacci(50)); // খুব দ্রুত (cache ব্যবহার করে)
```

---

### २९. Debounce এবং Throttle কি?
**উত্তর:** Function কল কমানোর টেকনিক (search, scroll ইত্যাদিতে)।
- **Debounce:** শেষ কল এর পর নির্দিষ্ট সময় অপেক্ষা করে function execute করে
- **Throttle:** নির্দিষ্ট সময় interval এ একবারই execute করে

**উদাহরণ:**
```js
// Debounce
function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

const search = debounce(() => {
  console.log('Searching...');
}, 500);

// User typing
input.addEventListener('input', search);

// Throttle
function throttle(func, limit) {
  let lastFunc;
  let lastRun = 0;
  return (...args) => {
    if (Date.now() - lastRun > limit) {
      func(...args);
      lastRun = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => func(...args), limit);
    }
  };
}
```

---

### ३०. RESTful API কিভাবে fetch করব?
**উত্তর:** `fetch()` API ব্যবহার করে HTTP request পাঠানো হয়।

**উদাহরণ:**
```js
// GET
async function getUser(id) {
  const res = await fetch(`/api/users/${id}`);
  return res.json();
}

// POST
async function createUser(data) {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

// PUT
async function updateUser(id, data) {
  const res = await fetch(`/api/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

// DELETE
async function deleteUser(id) {
  await fetch(`/api/users/${id}`, { method: 'DELETE' });
}
```

---

### ३१. DOM Manipulation কি? বিভিন্ন methods কি?
**উত্তর:** HTML এলিমেন্ট সিলেক্ট, মডিফাই, তৈরি, ডিলিট করা। সাধারণ methods:
- **querySelector/querySelectorAll:** CSS selector দিয়ে এলিমেন্ট খুঁজে বের করা
- **getElementById/getElementsByClassName:** ID বা class দিয়ে খুঁজা
- **createElement:** নতুন এলিমেন্ট তৈরি করা
- **appendChild/insertBefore:** child যোগ করা
- **removeChild/remove:** এলিমেন্ট মুছে ফেলা
- **textContent/innerHTML:** কনটেন্ট সেট করা

**উদাহরণ:**
```js
// Select
const el = document.querySelector('.my-class');
const els = document.querySelectorAll('li');

// Create & Append
const newDiv = document.createElement('div');
newDiv.textContent = 'Hello';
document.body.appendChild(newDiv);

// Modify
el.innerHTML = '<p>New content</p>';
el.classList.add('active');
el.style.color = 'red';

// Remove
el.remove();
```

---

### ३२. Event Listener কিভাবে যোগ করব? Event bubbling কি?
**উত্তর:** `addEventListener` দিয়ে ইভেন্ট শোনা হয়।

**Event bubbling:** child element এ event ঘটলে parent পর্যন্ত ছড়িয়ে যায়। `stopPropagation()` দিয়ে থামানো যায়।

**উদাহরণ:**
```js
// Event listener
document.querySelector('button').addEventListener('click', (e) => {
  console.log('Button clicked');
});

// Event bubbling
document.querySelector('ul').addEventListener('click', (e) => {
  console.log('Bubbled to parent:', e.target);
  // e.stopPropagation(); // বাবলিং বন্ধ করে
});

// Event capturing
document.addEventListener('click', (e) => {
  console.log('Capturing phase');
}, true); // true = capturing phase
```

---

### ३३. `== vs ===` পার্থক্য কি? Type coercion কি?
**উত্তর:**
- **==:** loose equality, type coercion হয়
- **===:** strict equality, type coercion হয় না

**Type coercion:** JavaScript স্বয়ংক্রিয়ভাবে type চেঞ্জ করে সমান হওয়ার চেষ্টা করে।

**উদাহরণ:**
```js
// Type coercion (==)
'5' == 5; // true (string convert to number)
null == undefined; // true
0 == false; // true

// Strict equality (===)
'5' === 5; // false (type ভিন্ন)
null === undefined; // false

// Truthy/Falsy
if ('0') console.log('Truthy'); // '0' truthy (non-empty string)
if (0) console.log('Falsy'); // 0 falsy
if ('') console.log('Falsy'); // empty string falsy
```

---

### ३४. Array methods কি কি? (forEach, find, some, every, includes)
**উত্তর:** Useful array methods:

**উদাহরণ:**
```js
const arr = [1, 2, 3, 4, 5];

// forEach – প্রতিটা এলিমেন্টে loop
arr.forEach((val, idx) => console.log(val, idx));

// find – প্রথম matching এলিমেন্ট
arr.find(x => x > 3); // 4

// filter – সব matching এলিমেন্ট
arr.filter(x => x > 3); // [4, 5]

// some – কোনো একটা match করলে true
arr.some(x => x > 4); // true

// every – সব match করলে true
arr.every(x => x > 0); // true

// includes – এলিমেন্ট আছে কিনা
arr.includes(3); // true

// findIndex – প্রথম matching index
arr.findIndex(x => x > 3); // 3

// map – সব এলিমেন্টে ফাংশন apply
arr.map(x => x * 2); // [2, 4, 6, 8, 10]
```

---

### ३५. String methods কি কি?
**উত্তর:** সাধারণ string methods:

**উদাহরণ:**
```js
const str = 'Hello World';

// Case
str.toLowerCase(); // 'hello world'
str.toUpperCase(); // 'HELLO WORLD'

// Search
str.indexOf('World'); // 6
str.includes('World'); // true
str.startsWith('Hello'); // true
str.endsWith('World'); // true

// Extract
str.slice(0, 5); // 'Hello'
str.substring(0, 5); // 'Hello'
str.substr(0, 5); // 'Hello' (deprecated)

// Replace
str.replace('World', 'JS'); // 'Hello JS'
str.replaceAll('l', 'L'); // 'HeLLo WorLd'

// Split & Join
str.split(' '); // ['Hello', 'World']
['a', 'b', 'c'].join('-'); // 'a-b-c'

// Trim
'  Hello  '.trim(); // 'Hello'
'  Hello  '.trimStart(); // 'Hello  '
'  Hello  '.trimEnd(); // '  Hello'

// Repeat
'ha'.repeat(3); // 'hahaha'
```

---

### ३६. Object methods কি কি? (Object.keys, Object.values, Object.entries, Object.assign)
**উত্তর:** Object manipulation methods:

**উদাহরণ:**
```js
const obj = { name: 'John', age: 30, city: 'NYC' };

// Keys, Values, Entries
Object.keys(obj); // ['name', 'age', 'city']
Object.values(obj); // ['John', 30, 'NYC']
Object.entries(obj); // [['name', 'John'], ['age', 30], ['city', 'NYC']]

// Assign – merge objects
const merged = Object.assign({}, obj, { age: 31 });
// { name: 'John', age: 31, city: 'NYC' }

// Freeze – পরিবর্তন করা যায় না
const frozen = Object.freeze(obj);
frozen.name = 'Jane'; // Error (strict mode)

// Seal – প্রপার্টি যোগ/মুছা যায় না, কিন্তু পরিবর্তন করা যায়
const sealed = Object.seal(obj);
sealed.name = 'Jane'; // OK
sealed.country = 'USA'; // Error

// hasOwnProperty
obj.hasOwnProperty('name'); // true
obj.hasOwnProperty('toString'); // false
```

---

### ३७. IIFE (Immediately Invoked Function Expression) কি?
**উত্তর:** ফাংশন ডিফাইন করার সাথে সাথে কল করা। Scope তৈরি করে ভেরিয়েবল পলিউশন এড়ায়।

**উদাহরণ:**
```js
// IIFE
(function() {
  const x = 'private';
  console.log(x); // 'private'
})();

console.log(x); // ReferenceError (x is private)

// IIFE with parameters
(function(name) {
  console.log('Hello ' + name);
})('John'); // 'Hello John'

// Arrow function IIFE
(() => {
  console.log('IIFE with arrow');
})();

// Module pattern (IIFE ব্যবহার করে)
const counter = (() => {
  let count = 0;
  return {
    increment() { count++; return count; },
    decrement() { count--; return count; }
  };
})();

counter.increment(); // 1
counter.increment(); // 2
```

---

### ३८. ES6 Modules (import/export) কি?
**উত্তর:** Code ভাগ করার আধুনিক উপায়। একটা ফাইল থেকে অন্যটাতে import/export করা যায়।

**উদাহরণ:**
```js
// math.js - export
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export default { add, subtract }; // default export

// main.js - import
import { add, subtract } from './math.js'; // named imports
import math from './math.js'; // default import
import * as mathOps from './math.js'; // import all

console.log(add(5, 3)); // 8
console.log(mathOps.add(5, 3)); // 8
```

---

### ३९. Generators ও Iterators কি?
**উত্তর:** 
- **Generator:** ফাংশন যা রিটার্ন করে iterator। `function*` এবং `yield` ব্যবহার করে।
- **Iterator:** object যার `next()` মেথড আছে।

**উদাহরণ:**
```js
// Generator function
function* count(n) {
  let i = 0;
  while (i < n) {
    yield i++; // value এবং done return করে
  }
}

const counter = count(3);
console.log(counter.next()); // { value: 0, done: false }
console.log(counter.next()); // { value: 1, done: false }
console.log(counter.next()); // { value: 2, done: false }
console.log(counter.next()); // { value: undefined, done: true }

// for...of লুপে ব্যবহার
for (const num of count(3)) {
  console.log(num); // 0, 1, 2
}

// Custom iterator
const customIterable = {
  [Symbol.iterator]() {
    let i = 0;
    return {
      next: () => ({
        value: i++,
        done: i > 3
      })
    };
  }
};

for (const val of customIterable) {
  console.log(val); // 0, 1, 2
}
```

---

### ४०. Regular Expressions (RegExp) কি?
**উত্তর:** Pattern matching এর জন্য ব্যবহৃত। `/pattern/flags` দিয়ে লেখা হয়।

**উদাহরণ:**
```js
// Create regex
const regex = /hello/i; // i = case-insensitive
const regex2 = new RegExp('hello', 'i');

// Test
regex.test('Hello World'); // true
/\d+/.test('123'); // true

// Match
'Hello World'.match(/\w+/g); // ['Hello', 'World']

// Search
'Hello World'.search(/World/); // 6

// Replace with regex
'hello hello'.replace(/hello/g, 'hi'); // 'hi hi' (g = global)

// Common patterns
/^\d+$/; // numbers only
/^[a-z]+$/; // lowercase letters
/\b\w+@\w+\.\w+\b/; // email pattern
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/; // strong password
```

---

### ४१. Event Loop, Call Stack, Callback Queue কি?
**উত্তর:** JavaScript এর execution mechanism:
- **Call Stack:** currently executing code track করে
- **Callback Queue (Task Queue):** callbacks এ থাকে (setTimeout, etc.)
- **Microtask Queue:** promises এর callbacks থাকে (higher priority)
- **Event Loop:** stack খালি হলে queue থেকে tasks move করে

**উদাহরণ:**
```js
console.log('1: Start'); // Stack এ যায় -> print হয়

setTimeout(() => {
  console.log('2: setTimeout'); // Callback queue এ যায়
}, 0);

Promise.resolve()
  .then(() => {
    console.log('3: Promise'); // Microtask queue এ যায়
  });

console.log('4: End'); // Stack এ যায় -> print হয়

// Output:
// 1: Start
// 4: End
// 3: Promise (microtask queue先)
// 2: setTimeout (callback queue)
```

---

### ४२. WeakMap এবং WeakSet কি?
**উত্তর:** Collection যা weak references রাখে। object মুছে গেলে auto cleanup হয়।
- **WeakMap:** only objects as keys, not enumerable
- **WeakSet:** only objects, not enumerable

**উদাহরণ:**
```js
// Map vs WeakMap
const map = new Map();
let obj = { id: 1 };
map.set(obj, 'value');
obj = null;
// map এ reference থাকে, garbage collect হয় না

// WeakMap
const weakMap = new WeakMap();
let obj2 = { id: 2 };
weakMap.set(obj2, 'value');
obj2 = null;
// weakMap auto cleanup হয়, memory leak হয় না

// WeakSet
const weakSet = new WeakSet();
let obj3 = { id: 3 };
weakSet.add(obj3);
weakSet.has(obj3); // true
obj3 = null; // auto remove
```

---

### ४३. Proxy ও Reflect কি?
**উত্তর:** 
- **Proxy:** object operations intercept করে (get, set, delete, etc.)
- **Reflect:** object operations perform করার standard way

**উদাহরণ:**
```js
// Proxy
const target = { name: 'John', age: 30 };
const proxy = new Proxy(target, {
  get(target, prop) {
    console.log(`Getting ${prop}`);
    return target[prop];
  },
  set(target, prop, value) {
    console.log(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
});

proxy.name; // 'Getting name'
proxy.age = 31; // 'Setting age to 31'

// Reflect
Reflect.get(target, 'name'); // 'John'
Reflect.set(target, 'name', 'Jane'); // true
Reflect.has(target, 'name'); // true
Reflect.deleteProperty(target, 'age'); // true
Reflect.ownKeys(target); // ['name']
```

---

### ४४. Symbol কি?
**উত্তর:** Unique identifier তৈরি করে। সাধারণত object এর private প্রপার্টি এর জন্য ব্যবহৃত।

**উদাহরণ:**
```js
// Create symbol
const id = Symbol('id');
const userId = Symbol('userId');

// দুইটা symbol সবসময় ভিন্ন
Symbol('id') === Symbol('id'); // false

// Object এর property এ symbol ব্যবহার
const obj = {
  name: 'John',
  [id]: 123 // Symbol যেমন key
};

obj[id]; // 123
obj.id; // undefined (Symbol property private থাকে)

// Well-known symbols
console.log(Symbol.toStringTag); // ব্যবহৃত হয় Object.prototype.toString() এ
```

---

### ४५. Call, Apply, Bind কি?
**উত্তর:** Function এর `this` context ম্যানিপুলেট করার methods:
- **call:** immediate execute, individual arguments
- **apply:** immediate execute, array of arguments
- **bind:** নতুন function রিটার্ন করে (পরে execute)

**উদাহরণ:**
```js
function greet(greeting, punctuation) {
  console.log(greeting + ' ' + this.name + punctuation);
}

const person = { name: 'John' };

// call – individual arguments
greet.call(person, 'Hello', '!'); // 'Hello John!'

// apply – array of arguments
greet.apply(person, ['Hi', '?']); // 'Hi John?'

// bind – নতুন function, পরে call করতে হয়
const boundGreet = greet.bind(person, 'Hey');
boundGreet('!'); // 'Hey John!'

// Practical: Array methods এ context pass করতে
const numbers = [1, 2, 3];
const doubled = numbers.map(function(x) {
  return x * 2 + this.multiplier;
}, { multiplier: 10 });
// [12, 14, 16]
```

---

### ४६. Polyfills কি?
**উত্তর:** পুরোনো ব্রাউজারে নতুন features কাজ করাতে code লেখা। `Array.includes` এর polyfill:

**উদাহরণ:**
```js
// ES6 Array.includes polyfill
if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement, fromIndex = 0) {
    for (let i = fromIndex; i < this.length; i++) {
      if (this[i] === searchElement) {
        return true;
      }
    }
    return false;
  };
}

[1, 2, 3].includes(2); // true (সব ব্রাউজারে)

// Object.assign polyfill
if (!Object.assign) {
  Object.assign = function(target, ...sources) {
    for (const source of sources) {
      Object.keys(source).forEach(key => {
        target[key] = source[key];
      });
    }
    return target;
  };
}
```

---

### ४७. Performance Optimization কি কি?
**উত্তর:** JavaScript performance improve করার উপায়:
- **Lazy loading:** প্রয়োজনে কোড লোড করা
- **Code splitting:** বড় bundle ছোট chunks এ ভাগ করা
- **Tree shaking:** unused code remove করা
- **Minification:** variable/function names ছোট করা
- **Debounce/Throttle:** unnecessary function calls reduce করা
- **Memoization:** রেজাল্ট cache করা

**উদাহরণ:**
```js
// Lazy loading
const module = await import('./heavy-module.js');

// Dynamic import
document.querySelector('button').addEventListener('click', async () => {
  const utils = await import('./utils.js');
  utils.heavyFunction();
});

// Image lazy loading
<img loading="lazy" src="image.jpg" />

// Code splitting with webpack
// main.js এ শুধু জরুরি code
// other.js এ heavy features যা demand এ load হয়
```

---

### ४८. Getter এবং Setter কি?
**উত্তর:** Class এ get/set keyword দিয়ে property এর value control করা।

**উদাহরণ:**
```js
class Person {
  constructor(name) {
    this._name = name; // convention: _ prefix = private
  }
  
  get name() {
    console.log('Getting name');
    return this._name;
  }
  
  set name(value) {
    console.log('Setting name');
    if (value.length < 2) {
      throw new Error('Name too short');
    }
    this._name = value;
  }
}

const p = new Person('John');
console.log(p.name); // 'Getting name' -> 'John'
p.name = 'Jane'; // 'Setting name'
p.name = 'A'; // Error: Name too short
```

---

### ४९. `for...in` vs `for...of` vs `forEach` কার পার্থক্য?
**উত্তর:**
- **for...in:** enumerable প্রপার্টি iterate করে (key)
- **for...of:** iterable values iterate করে (value)
- **forEach:** array method, callback এ value

**উদাহরণ:**
```js
const arr = [10, 20, 30];
arr.name = 'myArray';

// for...in – keys iterate (index + enumerable properties)
for (let i in arr) {
  console.log(i); // 0, 1, 2, 'name'
}

// for...of – values iterate
for (let val of arr) {
  console.log(val); // 10, 20, 30 (name exclude)
}

// forEach – values + callback
arr.forEach((val, idx) => {
  console.log(val, idx); // 10 0, 20 1, 30 2
});

// Object এ
const obj = { a: 1, b: 2 };
for (let key in obj) {
  console.log(key); // 'a', 'b'
}
// for...of obj এ error দেয় (object non-iterable)
```

---

### ५०. Context API এর মতো সাধারণ patterns কি?
**উত্তর:** Global state manage করার patterns:
- **Singleton pattern:** একটাই instance
- **Observer pattern:** state change এ notify করা
- **Module pattern:** encapsulation

**উদাহরণ:**
```js
// Singleton pattern
const store = (() => {
  let state = { count: 0 };
  
  return {
    getState() { return state; },
    setState(newState) {
      state = { ...state, ...newState };
      this.notify();
    },
    subscribers: [],
    subscribe(fn) {
      this.subscribers.push(fn);
    },
    notify() {
      this.subscribers.forEach(fn => fn(state));
    }
  };
})();

store.subscribe((state) => {
  console.log('State changed:', state);
});

store.setState({ count: 1 }); // 'State changed: { count: 1 }'
```

---

*সব গুরুত্বপূর্ণ JavaScript টপিক কভার হয়েছে!*
