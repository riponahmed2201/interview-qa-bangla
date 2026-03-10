# NestJS ইন্টারভিউ প্রশ্ন ও উত্তর (বাংলা)

NestJS ইন্টারভিউ প্রস্তুতির জন্য প্রশ্ন-উত্তর (বাংলায়) — **beginner → advanced** অর্ডারে পড়তে সুবিধা হয় এমনভাবে সাজানো।

## কীভাবে পড়বে (Recommended order)

- **Beginner (Core Nest fundamentals)**: ১–১৫  
  (DI, Module/Controller/Service, Middleware, Pipe/Guard/Interceptor/Filter, Validation, JWT basics)
- **Intermediate (Daily backend work)**: ১৬–৫৫  
  (Providers types, lifecycle/order, dynamic module, forwardRef, config/env, auth patterns, caching, uploads, DB integration)
- **Advanced (Architecture/Scaling/Prod)**: ৫৬–১২২  
  (Testing strategy, microservices, GraphQL, WebSocket, CQRS, performance, security, monitoring, migrations, queues, serverless, event-driven)

## নোট

- একই সোর্সে একই টপিক বারবার থাকলে **ডুপ্লিকেট বাদ** দেওয়া হয়েছে।
- “All Q&A” সেকশনে প্রশ্নগুলো বর্তমানে **numbering বজায়** রেখে আছে (আপনার আগের কনটেন্ট ভাঙবে না)।

---

## ১) Dependency Injection (DI) কী? সুবিধা কী?

**উত্তর:** DI মানে ক্লাস নিজে ডিপেন্ডেন্সি তৈরি না করে বাইরের IoC container থেকে **inject** করে নেয় (Nest container)।  
সুবিধা: **Modularity** (loosely coupled), **Testability** (mock inject করা সহজ), **Maintainability** (ডিপেন্ডেন্সি বদলালেও কম কোড পরিবর্তন)।

**উদাহরণ (constructor injection):**

```ts
import { Injectable } from "@nestjs/common";

@Injectable()
export class ServiceA {
  hello() {
    return "Hello";
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
import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

---

## ৩) `/hello` রুটে GET দিয়ে “Hello World” রিটার্ন করা controller লিখো

```ts
import { Controller, Get } from "@nestjs/common";

@Controller("hello")
export class HelloController {
  @Get()
  getHello() {
    return "Hello World";
  }
}
```

---

## ৪) Exception handle কীভাবে করো? (Exception Filter)

**উত্তর:** NestJS এ built-in HTTP exceptions আছে, আর custom error response দিতে **Exception Filter** ব্যবহার করা হয়।

```ts
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";

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
import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: unknown, res: unknown, next: () => void) {
    console.log(req.method, req.url);
    next();
  }
}
```

---

## ৬) Custom decorator বানিয়ে method নাম/args লগ (আইডিয়া)

**উত্তর:** NestJS এ custom decorator দিয়ে request থেকে common data extract করা (যেমন current user, request id) বা metadata attach করা যায়।  
Cross-cutting behavior (logging) সাধারণত Interceptor-এ বেশি clean থাকে—কিন্তু ইন্টারভিউতে decorator ধারণাটা বুঝলেই হয়।

_(নোট: production-এ সাধারণত Interceptor/Logger ব্যবহার করা হয়।)_

**উদাহরণ (param decorator):**

```ts
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const LogMethod = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<{ body?: unknown }>();
    const handlerName = ctx.getHandler().name;
    console.log(`Method: ${handlerName}, Args: ${JSON.stringify(req.body)}`);
    return null;
  },
);
```

---

## ৭) Incoming request validate কীভাবে করো? (class-validator)

**উত্তর:** DTO তে validation decorators, তারপর global `ValidationPipe`।

```ts
// dto
import { IsInt, IsString, MaxLength, MinLength } from "class-validator";

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
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

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

**উদাহরণ (HttpModule/HttpService আইডিয়া):**

```ts
import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { map } from "rxjs/operators";

@Injectable()
export class ApiService {
  constructor(private readonly http: HttpService) {}

  fetchData() {
    return this.http
      .get("https://api.example.com/data")
      .pipe(map((r) => r.data));
  }
}
```

---

## ১০) Caching implement কীভাবে করো?

**উত্তর:** `CacheModule` + (ক) method-level caching বা (খ) `CacheInterceptor` দিয়ে response cache।

**উদাহরণ (CacheModule + CacheInterceptor):**

```ts
import { CacheInterceptor, CacheModule } from "@nestjs/cache-manager";
import { Module, UseInterceptors, Controller, Get } from "@nestjs/common";

@Controller()
@UseInterceptors(CacheInterceptor)
class AppController {
  @Get()
  getHello() {
    return "Hello World!";
  }
}

@Module({
  imports: [CacheModule.register({ ttl: 5, max: 10 })],
  controllers: [AppController],
})
export class AppModule {}
```

---

## ১১) Interceptors কী? একটা use-case বলো

**উত্তর:** controller method চলার **আগে/পরে** লজিক—logging, response transform, timing, caching, exception mapping।  
`NestInterceptor` implement করে `@UseInterceptors()`।

**উদাহরণ (response wrap/transform):**

```ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { map } from "rxjs/operators";

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(map((data) => ({ data })));
  }
}
```

---

## ১২) Pipes কী? Custom pipe উদাহরণ (ParseInt)

**উত্তর:** input **transform + validate** করার জন্য। যেমন param string থেকে number।

```ts
import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string) {
    const val = Number.parseInt(value, 10);
    if (Number.isNaN(val)) throw new BadRequestException("Validation failed");
    return val;
  }
}
```

---

## ১৩) Database interaction: TypeORM দিয়ে কীভাবে?

**উত্তর:** `TypeOrmModule.forRoot()` দিয়ে কানেক্ট, entity define, `@InjectRepository()` দিয়ে repository injection করে CRUD।

**উদাহরণ (TypeORM module + repository injection):**

```ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
  ) {}
  findAll() {
    return this.usersRepo.find();
  }
}
```

---

## ১৪) JWT Auth কীভাবে implement করো?

**উত্তর:** `@nestjs/jwt` + `@nestjs/passport` + Strategy (passport-jwt) + Guard (AuthGuard)।  
Flow: login → token issue → protected routes এ `Authorization: Bearer <token>` → strategy validate।

**উদাহরণ (JwtModule config আইডিয়া):** _(নোট: secret হার্ডকোড করবে না—`ConfigModule`/env থেকে নিবে)_

```ts
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? "dev-only-secret",
      signOptions: { expiresIn: "60s" },
    }),
  ],
})
export class AuthModule {}
```

---

## ১৫) Custom exception filter তৈরি ও ব্যবহার

**উত্তর:** `ExceptionFilter` implement করে exception ধরো এবং unified error JSON response দাও। Global করতে `app.useGlobalFilters()` বা provider হিসেবে `APP_FILTER`।

**উদাহরণ (global filter):**

```ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpErrorFilter } from "./http-error.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpErrorFilter());
  await app.listen(3000);
}
bootstrap();
```

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

---

## GitHub (gasangw) থেকে (অতিরিক্ত — ডুপ্লিকেট বাদ)

সূত্র: `https://github.com/gasangw/NestJS-Interview-Questions-And-Answers`

## ৩১) NestJS কী?

**উত্তর:** NestJS হলো **TypeScript-first** Node.js framework, যেটা scalable/maintainable server-side অ্যাপ বানাতে **modules, controllers, providers, DI** ব্যবহার করে। সাধারণত Express/Fastify এর উপর abstraction দেয়।

---

## ৩২) NestJS কে বানিয়েছেন কে? কেন বানিয়েছেন?

**উত্তর:** Kamil Myśliwiec। লক্ষ্য ছিল Node.js অ্যাপে **consistent architecture/structure** আনা এবং Angular-এর মতো **DI + module pattern** সার্ভার সাইডে ব্যবহারযোগ্য করা।

---

## ৩৩) NestJS প্রথম রিলিজ কবে?

**উত্তর:** ৫ অক্টোবর, ২০১৬ (প্রথম রিলিজ)।

---

## ৩৪) NestJS ইনস্টল করে নতুন প্রজেক্ট কীভাবে শুরু করো?

**উত্তর:** Nest CLI ইনস্টল করে `nest new`।

```bash
npm i -g @nestjs/cli
nest new my-app
cd my-app
npm run start:dev
```

Resource scaffolding:

```bash
nest g resource users
```

---

## ৩৫) NestJS vs Angular পার্থক্য?

**উত্তর:** Angular **frontend** framework (browser UI)। NestJS **backend** framework (API/server)। দুটোতেই modules/decorators/DI কনসেপ্ট আছে, কিন্তু runtime আলাদা।

---

## ৩৬) C++/Python/Ruby কি NestJS “সরাসরি” ব্যবহার করা যায়?

**উত্তর:** NestJS Node runtime-এ JS/TS চালায়, তাই Python/Ruby সরাসরি না। তবে আলাদা সার্ভিস হিসেবে Python/Ruby/C++ বানিয়ে NestJS এর সাথে **HTTP/gRPC/message queue** দিয়ে কমিউনিকেট করা যায় (microservices)।

---

## ৩৭) NestJS অ্যাপের main components কী কী?

**উত্তর:**

- **Modules**: ফিচার গ্রুপিং
- **Controllers**: HTTP routes/handlers
- **Providers/Services**: business logic, DI

---

## ৩৮) Controller declare কীভাবে?

**উত্তর:** `@Controller()` দিয়ে।

```ts
import { Controller, Get } from "@nestjs/common";

@Controller("example")
export class ExampleController {
  @Get()
  hello() {
    return "Hello";
  }
}
```

---

## ৩৯) Route parameters কীভাবে ব্যবহার করো?

**উত্তর:** `@Param()`।

```ts
import { Controller, Get, Param } from "@nestjs/common";

@Controller("cats")
export class CatsController {
  @Get(":id")
  findOne(@Param("id") id: string) {
    return { id };
  }
}
```

---

## ৪০) `@Body()` decorator এর কাজ কী?

**উত্তর:** Request body থেকে ডাটা বের করে DTO/অবজেক্টে দেয়; সাধারণত POST/PUT/PATCH এ।

---

## ৪১) `@Injectable()` আর `@Inject()` পার্থক্য?

**উত্তর:**

- **`@Injectable()`**: ক্লাসকে provider হিসেবে declare করে যাতে DI container manage করতে পারে।
- **`@Inject()`**: কোনো token/নির্দিষ্ট provider inject করতে ব্যবহার; বিশেষ করে `useValue/useFactory` বা custom token এ দরকার হয়।

---

## ৪২) Nest Logger বনাম `console.log()`?

**উত্তর:** Nest Logger এ **log levels** (log/warn/error/debug/verbose) + context থাকে; production logging/filtering সহজ। `console.log()` দ্রুত ডিবাগে ঠিক, কিন্তু প্রডাকশনে Logger ভালো।

---

## ৪৩) DTO (Data Transfer Object) কেন ব্যবহার করো?

**উত্তর:** ইনপুট/আউটপুট data shape define, **validation**, **type safety**, Swagger documentation জেনারেট—সব সহজ হয়।

---

## ৪৪) Async operations NestJS এ কীভাবে handle করো?

**উত্তর:** `async/await` + Promise। Stream-like multiple values লাগলে RxJS Observable ব্যবহারও দেখা যায়।

---

## ৪৫) `@nestjs/jwt` প্যাকেজের কাজ কী?

**উত্তর:** JWT sign/verify utilities + Nest module integration। সাধারণত `@nestjs/passport` + `passport-jwt` এর সাথে token-based auth implement করতে।

---

## ৪৬) Authentication বনাম Authorization (token দিয়ে) — সংক্ষেপে

**উত্তর:**

- **Authentication**: ইউজার কে (login → token issue)
- **Authorization**: ইউজার কি পারবে (roles/permissions; Guard দিয়ে check)

Token সাধারণত `Authorization: Bearer <token>` হেডারে যায়।

---

## ৪৭) Refresh token কেন লাগে?

**উত্তর:** Access token ছোট সময়ের জন্য রাখলে নিরাপত্তা বাড়ে। Expire হলে refresh token দিয়ে নতুন access token আনা যায়—user বারবার login করতে হয় না। Refresh token revoke করা যায় (logout/compromise)।

---

## ৪৮) Swagger doc কীভাবে বানাবে?

**উত্তর:** `@nestjs/swagger` + `SwaggerModule`।

---

## ৪৯) Dockerfile / Docker Compose NestJS এ কেন?

**উত্তর:** Container এ একই environment এ রান; Compose দিয়ে app + DB/cache একসাথে multi-container হিসেবে সহজে চালানো।

---

## ৫০) `@nestjs/passport` কেন?

**উত্তর:** Passport strategy (local/jwt/oauth) NestJS এর সাথে clean ভাবে integrate করে; Guard তৈরি করে route protect করা সহজ।

---

## ৫১) File upload কীভাবে? Multer এর role?

**উত্তর:** Nest এ `FileInterceptor`/`FilesInterceptor` (Multer under the hood) দিয়ে multipart/form-data handle। `@UploadedFile()` দিয়ে ফাইল পাওয়া যায়।

---

## ৫২) NestJS এ DB integration কীভাবে? কোন কোন DB?

**উত্তর:** Nest নিজে DB handle করে না; লাইব্রেরি ইন্টিগ্রেশন দেয়। Common:

- **TypeORM**: MySQL/PostgreSQL/SQLite/MongoDB ইত্যাদি
- **Mongoose**: MongoDB
- **Sequelize**: Postgres/MySQL/MSSQL/SQLite
- **Prisma**: multiple DB support

---

## ৫৩) Errors handle কীভাবে?

**উত্তর:** built-in HTTP exceptions (`BadRequestException`, `UnauthorizedException`, `NotFoundException` ইত্যাদি) বা custom `HttpException`। Centralize করতে **Exception Filters**।

---

## ৫৪) CORS NestJS এ কীভাবে enable করো?

**উত্তর:** `main.ts` এ `app.enableCors(...)` (Express/Fastify adapter অনুযায়ী)।

---

## ৫৫) ExecutionContext কী? কোথায় লাগে?

**উত্তর:** বর্তমান request/handler context (HTTP/WS/RPC) অ্যাক্সেস করার abstraction। Guards/Interceptors/Decorators এ request/user/meta বের করতে কাজে লাগে।

---

## ৫৬) `@Res()` decorator কেন সতর্ক?

**উত্তর:** `@Res()` ব্যবহার করলে তুমি response নিজে ম্যানুয়ালি পাঠাবে (`res.send/res.json`)—না পাঠালে request “হ্যাং” হতে পারে। সাধারণত Nest এর default return style ভালো।

---

## ৫৭) NestJS module types: Feature / Shared / Global / Dynamic

**উত্তর:**

- **Feature**: নির্দিষ্ট ডোমেইন ফিচার
- **Shared**: provider export করে অন্য module-এ reuse
- **Global**: একবার register করলে সব জায়গায় available (`@Global`)
- **Dynamic**: runtime config সহ reusable (`forRoot/forRootAsync`)

---

## ৫৮) NestJS entry file কোনটা?

**উত্তর:** সাধারণত `main.ts` (NestFactory দিয়ে bootstrap)।

---

## ৫৯) DI বনাম IoC পার্থক্য?

**উত্তর:** **IoC** নীতি (control framework-এর হাতে), **DI** হলো IoC implement করার একটা উপায় (dependency বাইরে থেকে inject করা)।

---

## ৬০) NestJS caching implement (কনসেপ্ট)

**উত্তর:** `CacheModule.register()` + `CACHE_MANAGER` inject করে `get/set/del` করা বা `CacheInterceptor`।

---

## ৬১) DIP (Dependency Inversion Principle) NestJS এ কেন গুরুত্বপূর্ণ?

**উত্তর:** high-level code যেন low-level implementation এ depend না করে; abstraction/interface/token এ depend করে। DI + custom providers দিয়ে সহজে swap/mocking করা যায়।

---

## ৬২) Task scheduling NestJS এ কীভাবে?

**উত্তর:** `@nestjs/schedule` + `@Cron()`/`@Interval()`।

---

## ৬৩) DB transaction কেন দরকার? NestJS এ কীভাবে?

**উত্তর:** একাধিক DB অপারেশন “সব হবে নাহলে কিছুই হবে না” নিশ্চিত করতে transaction (financial/order/payment ইত্যাদিতে)। TypeORM/Prisma transaction API দিয়ে করা হয়।

---

## ৬৪) API versioning NestJS এ কীভাবে?

**উত্তর:** `app.enableVersioning(...)` দিয়ে (URI/header/media-type/custom)।

---

## ৬৫) GraphQL Resolver/Scalar decorators কী?

**উত্তর:** `@Resolver()` দিয়ে resolver ক্লাস, `@Scalar()` দিয়ে custom scalar (যেমন Date) define। GraphQL schema-driven API বানাতে লাগে।

---

## ৬৬) Serialization/Deserialization NestJS এ কোথায় আসে?

**উত্তর:** request JSON → object (deserialize), response object → JSON (serialize)। Nest এ `ClassSerializerInterceptor`/pipes দিয়ে transform/shape control করা যায়।

---

## ৬৭) Tight vs Loose coupling — NestJS module কিভাবে loose করে?

**উত্তর:** DI + module boundary + provider abstraction দিয়ে এক module-এর পরিবর্তন অন্যটাকে কম impact করে—maintainable হয়।

---

## ৬৮) SSE (Server-Sent Events) NestJS এ কী?

**উত্তর:** server → client one-way real-time stream। `@Sse()` decorator দিয়ে route বানানো যায়। Use-case: live feed/notifications (bi-directional দরকার হলে WebSocket)।

---

## WeLoveDevs (52 Q) থেকে (অতিরিক্ত — ডুপ্লিকেট বাদ)

সূত্র: `https://welovedevs.com/app/tests/questions-techno-nestjs`

## ৬৯) NestJS এ কিভাবে injectable service/provider ডিফাইন করো?

**উত্তর:** `@Injectable()` দিয়ে ক্লাসকে provider বানাও, তারপর module এর `providers` এ দাও।

---

## ৭০) Guard route/controller এ attach করতে কোন decorator?

**উত্তর:** `@UseGuards(MyGuard)`।

---

## ৭১) Pipe এর মূল দায়িত্ব কী?

**উত্তর:** ইনপুট **validation** এবং/অথবা **transformation** (DTO validate, string→number ইত্যাদি)।

---

## ৭২) Global `ExceptionFilter` কিভাবে করবে?

**উত্তর:** `app.useGlobalFilters(new MyFilter())` (bootstrap এ) বা provider হিসেবে `APP_FILTER`।

---

## ৭৩) `ExceptionFilter` কে নির্দিষ্ট route/controller এ কিভাবে লাগাবে?

**উত্তর:** `@UseFilters(MyFilter)` decorator ব্যবহার করে।

---

## ৭৪) `forwardRef()` কেন ব্যবহার করা হয়?

**উত্তর:** Circular dependency হলে (module/provider) Nest কে late reference দিতে `forwardRef(() => X)` ব্যবহার করা হয়।

---

## ৭৫) `@Optional()` decorator কী কাজে লাগে?

**উত্তর:** dependency না পেলেও error না দিয়ে `undefined` inject করতে দেয়—optional provider।

---

## ৭৬) Module lifecycle: `OnModuleInit` এর কাজ কী?

**উত্তর:** Module init হওয়ার পর একবার `onModuleInit()` হুক রান হয়—startup initialization/connection warmup এ কাজে লাগে।

---

## ৭৭) Module lifecycle methods execution order (high-level)

**উত্তর (সাধারণ ধারণা):** Module create → providers instantiate → `onModuleInit()` → app start/listen। (আর shutdown এ `onModuleDestroy`/`beforeApplicationShutdown`/`onApplicationShutdown` দেখা যায়।)

---

## ৭৮) `switchToHttp()` / `switchToWs()` কখন ব্যবহার করো?

**উত্তর:** `ExecutionContext` থেকে transport অনুযায়ী context নিতে—HTTP হলে request/response, WS হলে client/data। Guards/Interceptors এ common।

---

## ৭৯) NestJS HTTP request handle করতে কোন framework ব্যবহার করতে পারে?

**উত্তর:** প্রধানত **Express** বা **Fastify** (platform adapter দিয়ে)।

---

## ৮০) `providers` এ declare করলাম কিন্তু `exports` এ না দিলে কী হবে?

**উত্তর:** provider শুধুমাত্র ওই module এর ভিতরে usable থাকবে। অন্য module import করলেও inject করতে পারবে না (export না করলে)।

---

## ৮১) `providers` vs `exports` পার্থক্য কী?

**উত্তর:** `providers` = module এ create/manage হবে; `exports` = অন্য module-কে share করবে (import করলে তারা ব্যবহার করতে পারবে)।

---

## ৮২) Value provider কিভাবে declare করো?

**উত্তর:** token + `useValue`।

```ts
{ provide: 'API_KEY', useValue: 'abc123' }
```

---

## ৮৩) `useFactory` এর role কী?

**উত্তর:** কাস্টম creation logic দিয়ে provider বানানো (dynamic/async config)। যেমন env/remote config থেকে value এনে provider তৈরি।

---

## ৮৪) Async providers এর উদ্দেশ্য কী?

**উত্তর:** startup এ async data/connection/config লোড করে provider initialize করা (DB connection, remote config)।

---

## ৮৫) `ConfigService` দিয়ে config variable কিভাবে পড়ো?

**উত্তর:** `configService.get('KEY')` (ডিফল্ট ভ্যালু সহও করা যায়)।

---

## ৮৬) `.env` না থাকলেও ConfigModule init fail না করাতে কী করবে?

**উত্তর:** `ConfigModule.forRoot({ ignoreEnvFile: true })` বা `envFilePath` কনফিগ দিয়ে।

---

## ৮৭) Async config load করতে ConfigModule এর কোন প্যাটার্ন?

**উত্তর:** সাধারণত `forRootAsync()`/async factory pattern (মডিউল/লাইব্রেরি অনুযায়ী)।

---

## ৮৮) Nest CLI দিয়ে নতুন module কীভাবে বানাবে?

**উত্তর:** `nest g module users`।

---

## ৮৯) Dev mode hot reload সহ Nest app স্টার্ট কমান্ড?

**উত্তর:** সাধারণত `npm run start:dev` (Nest CLI scaffold এ থাকে)।

---

## ৯০) `findAll()` মেথডটা কোন route এ hit করবে?

**উত্তর:** এটা controller এর `@Controller('x')` + method এর `@Get()` path combine করে। যেমন `@Controller('cats')` এবং `@Get()` হলে route হবে `GET /cats`।

---

## ৯১) Custom decorator কখন Pipe এর বদলে ভালো?

**উত্তর:** Pipe মূলত validate/transform; আর custom decorator সাধারণত request context থেকে data extract/attach করতে (যেমন current user, roles metadata) বা reusable metadata দিতে—এই ধরনের ক্ষেত্রে decorator বেশি অর্থবহ।

---

## DEV.to (dashgriva) থেকে (অতিরিক্ত — ডুপ্লিকেট বাদ)

সূত্র: `https://dev.to/dashgriva/nestjs-important-interview-question-4f7j`

## ৯২) NestJS এর key features কী কী?

**উত্তর:**

- **Modular architecture** (feature-based modules)
- **Dependency Injection (DI)** built-in
- **Decorators** (controller/routes/params/metadata)
- **Middleware/Guards/Pipes/Interceptors/Filters** দিয়ে clean separation of concerns
- **TypeScript-first** (type safety + tooling)

---

## ৯৩) NestJS বনাম Express.js — মূল পার্থক্য কী?

**উত্তর:** Express হলো minimal/unopinionated framework (routing + middleware)। NestJS Express/Fastify এর উপর দাঁড়িয়ে **opinionated structure** দেয় (modules, DI, decorators, testing-friendly pattern)।  
সংক্ষেপে: Express = lightweight freedom, NestJS = structured architecture (বড় টিম/এন্টারপ্রাইজে সুবিধা)।

---

## ৯৪) NestJS কীভাবে TypeScript কে কাজে লাগায়?

**উত্তর:** NestJS TypeScript-first, ফলে:

- **Strong typing** দিয়ে compile-time bug কমে
- DTO/Validation/DI wiring safer হয়
- IDE autocomplete/refactor শক্তিশালী
- বড় কোডবেসে maintainability বাড়ে

---

## EasyInterview থেকে (অতিরিক্ত — ডুপ্লিকেট বাদ)

সূত্র: `https://easyinterview.me/blogs/the-interview-questions-that-matter/nestjs-interview-guide`

## ৯৫) কখন NestJS ব্যবহার না করাই ভালো?

**উত্তর:**

- খুব ছোট API/প্রোটোটাইপ (Express দ্রুত)
- Serverless এ cold start খুব sensitive হলে
- টিম TypeScript/DI/module pattern এ নতুন হলে (learning curve)  
  বড়/দীর্ঘমেয়াদি প্রজেক্টে NestJS বেশি লাভ দেয়।

---

## ৯৬) NestJS request lifecycle (১ লাইনে)

**উত্তর:** Middleware → Guards → Interceptors(before) → Pipes → Handler → Interceptors(after) → Exception filters (error হলে)।

---

## ৯৭) Global `ValidationPipe` কনফিগে `whitelist/forbid/transform` কেন?

**উত্তর:**

- **whitelist**: DTO-তে না থাকা extra field কেটে দেয় (security)
- **forbidNonWhitelisted**: extra field থাকলে error দেয়
- **transform**: payload কে DTO type-এ কনভার্ট/implicit conversion (string→number) সহজ করে

**উদাহরণ:**

```ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }),
);
```

---

## ৯৮) Role-based authorization কিভাবে implement করো? (Decorator + Guard)

**উত্তর:** route এ roles metadata সেট করো, guard সেটা read করে `request.user.role` মিলিয়ে দেখে।

```ts
// roles.decorator.ts
import { SetMetadata } from "@nestjs/common";
export const Roles = (...roles: string[]) => SetMetadata("roles", roles);

// roles.guard.ts
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(ctx: ExecutionContext) {
    const roles = this.reflector.get<string[]>("roles", ctx.getHandler());
    if (!roles) return true;
    const { user } = ctx.switchToHttp().getRequest();
    return roles.includes(user?.role);
  }
}
```

---

## ৯৯) Custom exception কেন বানাবে?

**উত্তর:** নির্দিষ্ট ডোমেইন-ভিত্তিক এররকে readable/consistent করতে (যেমন `UserNotFoundException`)।

```ts
import { HttpException, HttpStatus } from "@nestjs/common";

export class UserNotFoundException extends HttpException {
  constructor(id: number) {
    super(`User with ID ${id} not found`, HttpStatus.NOT_FOUND);
  }
}
```

---

## ১০০) Prisma NestJS এ integrate করার common pattern কী?

**উত্তর:** `PrismaService` (PrismaClient extend) বানিয়ে module init/destroy এ connect/disconnect।

```ts
import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

---

## ১০১) Unit test এ provider/repository mock কীভাবে?

**উত্তর:** `@nestjs/testing` এর `TestingModule` এ provider override করে `useValue` mock দাও।

---

## ১০২) E2E test কীভাবে লেখা হয়?

**উত্তর:** app instance create করে `supertest` দিয়ে HTTP request করে response assert (full pipeline test)।

---

## Vskills থেকে (অতিরিক্ত — ডুপ্লিকেট বাদ)

সূত্র: `https://www.vskills.in/interview-questions/nestjs-interview-questions`

## ১০৩) `@nestjs/websockets` প্যাকেজের কাজ কী?

**উত্তর:** NestJS এ WebSocket Gateway/Server তৈরির tooling দেয় (decorators যেমন `@WebSocketGateway`, `@SubscribeMessage`)। Real-time feature (chat/live updates) বানাতে লাগে।

---

## ১০৪) WebSocket authentication NestJS এ কিভাবে করো?

**উত্তর:** handshake (headers/query/cookie) থেকে token বের করে validate করো (JWT verify), invalid হলে connection reject/close। Gateway middleware বা guard-style logic ব্যবহার করা হয়।

---

## ১০৫) WebSocket disconnect/reconnect handle কিভাবে?

**উত্তর:** Gateway lifecycle hooks (যেমন `handleDisconnect`, `handleConnection`) এ cleanup, room/user mapping maintain; client reconnect হলে state restore/rehydrate (Redis/store থাকলে ভালো)।

---

## ১০৬) Database seeding (initial data) কিভাবে করো?

**উত্তর:** আলাদা seed script/command চালাও (TypeORM/Prisma CLI) অথবা Nest command runner বানাও। লক্ষ্য: dev/test এ demo data, lookup tables populate।

---

## ১০৭) `nestjsx/crud` (বা CRUD helpers) প্যাকেজের উদ্দেশ্য কী?

**উত্তর:** boilerplate কমিয়ে দ্রুত CRUD endpoints generate/standardize করা (pagination/filter/sort সহ)। এন্টারপ্রাইজে দ্রুত scaffold করতে কাজে লাগে।

---

## ১০৮) Request logging + tracing NestJS এ কিভাবে?

**উত্তর:** Interceptor/middleware দিয়ে requestId/latency log; distributed tracing (OpenTelemetry) integrate; structured logger (Pino/Winston) ব্যবহার।

---

## ১০৯) Rate limiting NestJS এ কিভাবে?

**উত্তর:** `@nestjs/throttler` দিয়ে global বা per-route limit, অথবা API gateway/CDN লেভেলে। (Abuse/DDoS কমাতে)।

---

## ১১০) Health checks / monitoring endpoint কিভাবে বানাও?

**উত্তর:** সাধারণত `@nestjs/terminus` (health module) দিয়ে `/health` endpoint—DB/Redis/external service check করে status দেয়।

---

## ১১১) Static files serve করতে `@nestjs/serve-static` কেন?

**উত্তর:** SPA/static assets (images, docs) serve করা, নির্দিষ্ট route prefix এ static directory map করা।

---

## ১১২) Job queue প্রসেসিংয়ে `@nestjs/bull` কেন?

**উত্তর:** background jobs (email, image processing) queue-based করতে Bull/Redis integrate। Producer → queue, worker → process; retry/delay/concurrency control।

---

## ১১৩) `@nestjs/pino` কেন ব্যবহার করবে?

**উত্তর:** Fast structured logging (pino) + request context/serializer; production log pipeline (ELK/Datadog) এ ভালো।

---

## ১১৪) Internationalization (i18n) NestJS এ কিভাবে?

**উত্তর:** i18n module (যেমন `nestjs-i18n`) দিয়ে language detection (header/query) + translation files। Validation errors/localized messages এ কাজে লাগে।

---

## ১১৫) Database pooling কেন দরকার? NestJS এ কিভাবে?

**উত্তর:** অনেক request এ নতুন connection তৈরি না করে pool reuse—latency কম, scalability বাড়ে। ORM/driver (pg/mysql) config এ pool size/timeout সেট করো।

---

## ১১৬) Prisma migrations NestJS এ কিভাবে?

**উত্তর:** `prisma migrate dev/deploy` দিয়ে schema version control; CI/CD তে deploy সময় migrations run; Nest side এ PrismaService শুধু connect/queries করে।

---

## ১১৭) GraphQL fragments/directives (NestJS context) কী?

**উত্তর:** Fragment = query reuse; Directive = schema/query-level behavior hints (যেমন auth/formatting custom directives)। Nest GraphQL এ resolver/schema design এ কাজে লাগে।

---

## ১১৮) Serverless (AWS Lambda/Azure Functions) এ NestJS চালানো সম্ভব?

**উত্তর:** হ্যাঁ—adapter/wrapper দিয়ে Nest app bootstrap করে handler export করা হয়। cold start, bundle size, DI overhead—এসব optimize করতে হয়।

---

## SecondTalent থেকে (অতিরিক্ত — ডুপ্লিকেট বাদ)

সূত্র: `https://www.secondtalent.com/interview-guide/nestjs-developers/`

## ১১৯) Legacy Node/Express অ্যাপ NestJS এ refactor/migrate করলে approach কী?

**উত্তর:** একদম “big-bang rewrite” না করে incremental migration ভালো।

- **Strangler pattern**: পুরনো route গুলো রেখে ধীরে ধীরে নতুন Nest module/route introduce
- **Boundary ঠিক করা**: domain অনুযায়ী module split (users/orders/payments)
- **Shared concerns আগে**: config/logger/validation/error handling/ auth guard গুলো standardize
- **Compatibility**: একই DB/contract রেখে controller/service layer migrate
- **Safety net**: unit + integration + E2E tests, gradual rollout/feature flag

---

## ১২০) NestJS developer interview এ “red flags” কী কী?

**উত্তর:**

- TypeScript এ অতিরিক্ত `any` (type-safety নষ্ট)
- DI ignore করে বারবার `new` দিয়ে instance বানানো
- Input validation/authorization কে “optional” ভাবা
- Error handling/observability (log/trace/metrics) নিয়ে ধারণা দুর্বল
- Testing strategy নেই বা mock/TestingModule ব্যবহার জানে না

---

## ১২১) ভালো NestJS coding challenge কেমন হওয়া উচিত?

**উত্তর:** Realistic module-based task (CRUD + pagination/filter + role-based access + DTO validation + tests)।  
Evaluate: module separation, DI, guard/interceptor/pipe ব্যবহার, typing, error handling, security checks, এবং minimal-but-meaningful test coverage।

---

## LinkedIn (Jayanta Karmakar) থেকে (অতিরিক্ত — ডুপ্লিকেট বাদ)

সূত্র: `https://www.linkedin.com/posts/jayanta-karmakar-448666190_advanced-nestjs-interview-questions-for-activity-7382888709479780352-iBuf`

## ১২২) NestJS এ Event-driven architecture কী? কীভাবে implement করবে?

**উত্তর:** Service গুলোকে loosely-coupled রাখতে **event emit → listener handle** প্যাটার্ন। Use-case: user signup হলে background email/notification trigger।  
Nest এ দুইভাবে common:

- **In-process events**: `@nestjs/event-emitter` (same instance এর ভিতরে)
- **Distributed events**: message broker (Kafka/RabbitMQ/NATS) + `@nestjs/microservices` (multi-service/multi-instance)

---

## Official Docs থেকে (অতিরিক্ত — ডুপ্লিকেট বাদ)
সূত্র: [NestJS Official Documentation](https://docs.nestjs.com/)

## ১২৩) Lifecycle hooks কী? কোন কোন hook আছে?
**উত্তর:** Nest app/module/provider এর lifecycle-এর নির্দিষ্ট সময়ে code চালানোর interface।
- **Startup**: `OnModuleInit`, `OnApplicationBootstrap`
- **Shutdown**: `OnModuleDestroy`, `BeforeApplicationShutdown`, `OnApplicationShutdown`

Use-case: DB connect, cache warmup, background worker start/stop, graceful shutdown।

---

## ১২৪) Graceful shutdown কেন দরকার? NestJS এ কীভাবে?
**উত্তর:** Deploy/scale-down এ চলমান request শেষ করে cleanভাবে resource close (DB/queue) করতে।  
সাধারণ pattern:
- `app.enableShutdownHooks()`  
- lifecycle hook এ connection/consumer বন্ধ করা

---

## ১২৫) Custom provider / injection token কী? কেন লাগে?
**উত্তর:** `@Injectable()` class ছাড়াও token দিয়ে dependency inject করা যায়। দরকার হয়:
- interface/abstraction inject করতে (TS interface runtime এ থাকে না)
- multiple implementation swap করতে (mock/real)
- constant/config value inject করতে

Token হতে পারে **string/symbol/class**।

---

## ১২৬) `useClass`, `useValue`, `useFactory`, `useExisting` — কখন কোনটা?
**উত্তর:**
- **useClass**: interface-token → কোন concrete class ব্যবহার করবে
- **useValue**: config/constant object
- **useFactory**: dynamic/async creation (env অনুযায়ী)
- **useExisting**: alias/redirect (এক provider কে অন্য token-এ expose)

---

## ১২৭) Optional dependency কীভাবে inject করো?
**উত্তর:** dependency optional হলে `@Optional()` ব্যবহার করা যায়—না থাকলে `undefined` আসে, app crash কমে। Feature-flag/plug-in style design এ কাজে লাগে।

---

## ১২৮) `ValidationPipe`-এর ৩টা গুরুত্বপূর্ণ option কোনগুলো? কেন?
**উত্তর:** security + clean input নিশ্চিত করতে:
- **whitelist**: DTO-তে না থাকা field বাদ দেয়
- **forbidNonWhitelisted**: extra field থাকলে error দেয় (strict)
- **transform**: plain JSON → DTO/class (type conversion সহ)  
Production API তে এগুলো interview-এ খুব common।

---

## ১২৯) `APP_FILTER`/`APP_GUARD`/`APP_INTERCEPTOR`/`APP_PIPE` কী?
**উত্তর:** এগুলো global-level provider token—পুরো অ্যাপে default behavior enforce করে।
- Global auth guard
- Global validation pipe
- Global exception filter
- Global logging/transform interceptor  
বড় অ্যাপে consistency রাখতে কাজে লাগে।

---

## ১৩০) ExecutionContext (HTTP/WS/RPC) পার্থক্যটা কীভাবে বুঝবে?
**উত্তর:** `ExecutionContext` একই API দিলেও transport অনুযায়ী data access আলাদা:
- HTTP: `switchToHttp().getRequest()`
- WS: `switchToWs().getClient()` / `getData()`
- RPC: `switchToRpc().getData()`  
Guard/interceptor/decorator লিখতে গেলে এটা জানলে দ্রুত solve হয়।

---

## ১৩১) `ClassSerializerInterceptor` কখন ব্যবহার করবে?
**উত্তর:** response object থেকে sensitive field hide/transform করতে (যেমন password/hash)।  
`class-transformer` decorators দিয়ে output shape control করা যায়—API response clean থাকে।

---

## ১৩২) Testing এ `overrideProvider/overrideGuard` কেন দরকার?
**উত্তর:** unit/integration test এ real dependency বদলে mock/stub বসাতে।
- service/repo mock করতে **overrideProvider**
- auth bypass করতে **overrideGuard**
- side-effect কমাতে **overrideInterceptor**

---

## ১৩৩) `forRoot()` বনাম `forRootAsync()` — real-world এ কখন?
**উত্তর:**
- **forRoot**: static config (simple)
- **forRootAsync**: config/env/service থেকে async config load (DB/Redis/3rd-party client)  
Enterprise codebase এ `ConfigModule` সহ `forRootAsync` বেশি দেখা যায়।

---

## ১৩৪) Express vs Fastify adapter — ইন্টারভিউতে কী বলবে?
**উত্তর:** NestJS platform-agnostic; Express default, Fastify সাধারণত faster + plugin ecosystem আলাদা।  
Trade-off: কিছু middleware/plugin compatibility, request/response APIs (যেমন raw `@Res()`) ভিন্ন হতে পারে।

---

## ১৩৫) Swagger “official way” কীভাবে setup করো?
**উত্তর:** `@nestjs/swagger` + `DocumentBuilder` দিয়ে OpenAPI doc generate; auth scheme (Bearer) যোগ করা যায়।  
এটা API discoverability + client integration (Postman/SDK) সহজ করে।

---

## References (সব সোর্স একসাথে)

- [ClimbTheLadder — NestJS interview questions](https://climbtheladder.com/nestjs-interview-questions/)
- [SecondTalent — Top 20 NestJS Developer Interview Questions (March 2026)](https://www.secondtalent.com/interview-guide/nestjs-developers/)
- [Gasangw GitHub — NestJS Interview Questions And Answers](https://github.com/gasangw/NestJS-Interview-Questions-And-Answers)
- [DEV.to — NestJS important interview question](https://dev.to/dashgriva/nestjs-important-interview-question-4f7j)
- [EasyInterview — NestJS interview guide](https://easyinterview.me/blogs/the-interview-questions-that-matter/nestjs-interview-guide)
- [WeLoveDevs — NestJS questions test](https://welovedevs.com/app/tests/questions-techno-nestjs)
- [Vskills — NestJS interview questions](https://www.vskills.in/interview-questions/nestjs-interview-questions)
- [LinkedIn — Jayanta Karmakar post (Advanced NestJS interview questions)](https://www.linkedin.com/posts/jayanta-karmakar-448666190_advanced-nestjs-interview-questions-for-activity-7382888709479780352-iBuf)
- [NestJS Official Documentation](https://docs.nestjs.com/)
