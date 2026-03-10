# NestJS ইন্টারভিউ প্রশ্ন ও উত্তর (বাংলা)

সূত্র অনুযায়ী বাছাইকৃত ১৫টি NestJS ইন্টারভিউ প্রশ্ন ও সংক্ষিপ্ত উত্তর।  
সূত্র: `https://climbtheladder.com/nestjs-interview-questions/`

---

## ১) Dependency Injection (DI) কী? সুবিধা কী?
**উত্তর:** DI মানে ক্লাস নিজে ডিপেন্ডেন্সি তৈরি না করে বাইরের IoC container থেকে **inject** করে নেয় (Nest container)।  
সুবিধা: **Modularity** (loosely coupled), **Testability** (mock inject করা সহজ), **Maintainability** (ডিপেন্ডেন্সি বদলালেও কম কোড পরিবর্তন)।

**উদাহরণ (constructor injection):**

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceA {
  hello() {
    return 'Hello';
  }
}

@Injectable()
export class ServiceB {
  constructor(private readonly serviceA: ServiceA) {}
  hi() {
    return this.serviceA.hello();
  }
}
```

---

## ২) NestJS Module এর role কী? Module কীভাবে তৈরি করো?
**উত্তর:** Module হলো ফিচার অনুযায়ী **controllers + providers** গ্রুপ করার ইউনিট। অ্যাপ অর্গানাইজ/স্কেল করা সহজ হয়।  
`@Module({ controllers, providers, imports, exports })` দিয়ে তৈরি হয়।

```ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

---

## ৩) `/hello` রুটে GET দিয়ে “Hello World” রিটার্ন করা controller লিখো
```ts
import { Controller, Get } from '@nestjs/common';

@Controller('hello')
export class HelloController {
  @Get()
  getHello() {
    return 'Hello World';
  }
}
```

---

## ৪) Exception handle কীভাবে করো? (Exception Filter)
**উত্তর:** NestJS এ built-in HTTP exceptions আছে, আর custom error response দিতে **Exception Filter** ব্যবহার করা হয়।

```ts
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();
    res.status(exception.getStatus()).json({
      statusCode: exception.getStatus(),
      path: req.url,
      message: exception.message,
    });
  }
}
```

---

## ৫) Middleware কী? NestJS এ কীভাবে implement করো?
**উত্তর:** রুট হ্যান্ডলারের **আগে** চলা ফাংশন/ক্লাস—logging, auth, request modify ইত্যাদিতে।  
Nest এ `NestMiddleware` ইমপ্লিমেন্ট করে module এর `configure()`-এ apply করা হয়।

```ts
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log(req.method, req.url);
    next();
  }
}
```

---

## ৬) Custom decorator বানিয়ে method নাম/args লগ (আইডিয়া)
**উত্তর:** NestJS এ custom decorator দিয়ে extra metadata/behavior যোগ করা যায়। ইন্টারভিউতে মূল কথা: **decorator = reusable cross-cutting logic**।

*(নোট: production-এ সাধারণত Interceptor/Logger ব্যবহার করা হয়।)*

---

## ৭) Incoming request validate কীভাবে করো? (class-validator)
**উত্তর:** DTO তে validation decorators, তারপর global `ValidationPipe`।

```ts
// dto
import { IsInt, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsInt()
  age: number;
}
```

---

## ৮) Guards কী? কীভাবে ব্যবহার করো?
**উত্তর:** Guard ঠিক করে রিকোয়েস্ট route handler-এ যাবে কিনা (auth/role)। `CanActivate` implement করে `@UseGuards()`।

```ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    return Boolean(req.headers.authorization);
  }
}
```

---

## ৯) External API থেকে ডাটা ফেচ করে service → controller ইনজেক্ট (কনসেপ্ট)
**উত্তর:** Service এ HTTP client ব্যবহার করে data fetch, controller এ constructor injection।  
আজকাল Nest এ `HttpModule`/`HttpService` (Axios) বা native `fetch`—দুটোই দেখা যায়।

---

## ১০) Caching implement কীভাবে করো?
**উত্তর:** `CacheModule` + (ক) method-level caching বা (খ) `CacheInterceptor` দিয়ে response cache।

---

## ১১) Interceptors কী? একটা use-case বলো
**উত্তর:** controller method চলার **আগে/পরে** লজিক—logging, response transform, timing, caching, exception mapping।  
`NestInterceptor` implement করে `@UseInterceptors()`।

---

## ১২) Pipes কী? Custom pipe উদাহরণ (ParseInt)
**উত্তর:** input **transform + validate** করার জন্য। যেমন param string থেকে number।

```ts
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string) {
    const val = Number.parseInt(value, 10);
    if (Number.isNaN(val)) throw new BadRequestException('Validation failed');
    return val;
  }
}
```

---

## ১৩) Database interaction: TypeORM দিয়ে কীভাবে?
**উত্তর:** `TypeOrmModule.forRoot()` দিয়ে কানেক্ট, entity define, `@InjectRepository()` দিয়ে repository injection করে CRUD।

---

## ১৪) JWT Auth কীভাবে implement করো?
**উত্তর:** `@nestjs/jwt` + `@nestjs/passport` + Strategy (passport-jwt) + Guard (AuthGuard)।  
Flow: login → token issue → protected routes এ `Authorization: Bearer <token>` → strategy validate।

---

## ১৫) Custom exception filter তৈরি ও ব্যবহার
**উত্তর:** `ExceptionFilter` implement করে exception ধরো এবং unified error JSON response দাও। Global করতে `app.useGlobalFilters()` বা provider হিসেবে `APP_FILTER`।

---

## নেক্সট: NestJS এ আর কী যোগ করলে “সিনিয়র” কভার হবে?
- **Module architecture** (feature modules, dynamic modules)
- **Providers scope** (singleton/request/transient)
- **Guards + Roles (RBAC)**
- **Interceptors** (logging, timeout, serialization)
- **Pipes** (validation pipeline)
- **Testing** (TestingModule, mocking providers)
- **Config** (ConfigModule, env)
- **Microservices** (transport: TCP/RMQ/Kafka), **CQRS** (optional)

---

## SecondTalent থেকে (অতিরিক্ত — ডুপ্লিকেট বাদ)
সূত্র: `https://www.secondtalent.com/interview-guide/nestjs-developers/`

## ১৬) NestJS এ Provider কত ধরনের? কখন কোনটা?
**উত্তর:** NestJS DI container এ provider declare করা যায় কয়েকভাবে:
- **Class provider**: `providers: [UsersService]` (সবচেয়ে কমন)
- **Value provider**: `useValue` (config/constant)
- **Factory provider**: `useFactory` (dynamic/async creation)
- **Existing/Alias provider**: `useExisting` (একটা provider কে আরেক নামে expose)

---

## ১৭) Guard, Interceptor, Pipe — পার্থক্য ও execution order?
**উত্তর:**  
- **Guard**: রিকোয়েস্ট allow/deny (authz/authn)  
- **Pipe**: ইনপুট validate/transform  
- **Interceptor**: আগে/পরে cross-cutting (logging, transform, timing, cache)

**Order (সাধারণভাবে):** Middleware → Guards → Interceptors (before) → Pipes → Handler → Interceptors (after) → Exception filters

---

## ১৮) Dynamic module কী? `forRoot()` / `forRootAsync()` কেন?
**উত্তর:** Dynamic module রানটাইমে কনফিগ নিয়ে নিজের providers/exports সেট করতে পারে। যেমন DB/Redis/Config module এক অ্যাপে ভিন্ন ভিন্ন অপশনে reuse করা।

---

## ১৯) Circular dependency কীভাবে handle করো? Best practice কী?
**উত্তর:** Nest এ `forwardRef(() => OtherModule)` দিয়ে সামলানো যায়, কিন্তু এটা সাধারণত আর্কিটেকচার সমস্যার সিগন্যাল।  
Best practice: module boundary ঠিক করা, interface/abstraction, event/message-based decoupling, bidirectional dependency কমানো।

---

## ২০) Provider scope: DEFAULT vs REQUEST vs TRANSIENT
**উত্তর:**
- **DEFAULT (singleton)**: পুরো অ্যাপে একটাই instance (সাধারণত এটিই)  
- **REQUEST**: প্রতি HTTP request এ নতুন instance (request-context দরকার হলে)  
- **TRANSIENT**: যতবার inject হবে ততবার নতুন instance (সবচেয়ে বেশি overhead)

---

## ২১) বড় NestJS অ্যাপ স্ট্রাকচার কেমন রাখবে?
**উত্তর:** Domain/feature ভিত্তিক module (users/orders/payments), shared/common module (logger, config), clear layering: controller → service → repository.  
প্রয়োজনে “modular monolith” বা microservices split।

---

## ২২) Repository pattern কী? TypeORM/Prisma এ লাভ কী?
**উত্তর:** DB access layer কে abstract করে business logic থেকে আলাদা করা। লাভ: testing সহজ (mock repo), DB বদলালে কম পরিবর্তন, query logic centralized।

---

## ২৩) CQRS কী? NestJS এ কখন ব্যবহার করবে?
**উত্তর:** Command (write) আর Query (read) আলাদা handler/flow। Complex domain, event-sourcing, read/write scaling বা audit trail দরকার হলে কাজে লাগে। Nest এ `@nestjs/cqrs` প্যাকেজ আছে।

---

## ২৪) NestJS এ Testing strategy কী? Dependency mock কীভাবে?
**উত্তর:**  
- **Unit test**: service/guard/pipe আলাদা করে  
- **Integration test**: module wiring + DB/test double  
- **E2E**: supertest দিয়ে HTTP-level

Mock: `@nestjs/testing` এর `TestingModule` এ provider override (`useValue`, `useFactory`)।

---

## ২৫) High latency endpoint diagnose করার স্টেপ?
**উত্তর:** APM/Tracing (OpenTelemetry), DB query profiling (N+1, index), caching, payload reduce, rate limit, horizontal scale। CPU-heavy হলে worker/queue।

---

## ২৬) Production NestJS security best practices?
**উত্তর:** Helmet headers, strict CORS, input validation (ValidationPipe), rate limiting (`@nestjs/throttler`), auth (JWT + refresh), secrets env/secret manager, ORM parameterized query, dependency audit, HTTPS, logs/monitoring।

---

## ২৭) NestJS code review এ কী দেখো?
**উত্তর:** সঠিক DI ব্যবহার (new না), module boundary, DTO/validation, guard/roles, error handling (filters), typing (any কম), performance (N+1), security (authorization checks), test coverage।

---

## ২৮) Express/Fastify এর উপর NestJS কখন বেছে নেবে?
**উত্তর:** বড় টিম/এন্টারপ্রাইজ অ্যাপ, opinionated architecture, testability, DI/decorators, microservices/GraphQL/websocket built-in support দরকার হলে NestJS।  
ছোট/সিম্পল API বা খুব minimal abstraction চাইলে Express/Fastify।

---

## ২৯) NestJS microservices communication কীভাবে?
**উত্তর:** `@nestjs/microservices` দিয়ে transport (TCP, RMQ, Kafka, NATS, gRPC) সেট করে `ClientProxy` থেকে message পাঠানো এবং `@MessagePattern()` / `@EventPattern()` দিয়ে receive। Retry/circuit-breaker বিবেচনা করা ভালো।

---

## ৩০) GraphQL subscriptions কী? NestJS এ challenge কী?
**উত্তর:** real-time updates (WebSocket)। Challenges: auth on WS connection, scaling (multi-instance হলে Redis PubSub), memory/connection management, filtering/throttling।


