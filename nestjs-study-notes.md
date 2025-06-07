
# 📘 NestJS Study Notes

---

## 1. 📦 Modules

- A **module** is a class decorated with `@Module()` and is the fundamental building block of a NestJS app.
- It groups related **controllers**, **services**, and **providers** together.

### Example

```ts
@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

---

## 2. 🧩 Controllers

- Controllers handle **incoming HTTP requests** and return **responses to the client**.
- Decorated with `@Controller('route')`.
- Methods inside a controller are mapped to specific HTTP routes using decorators like `@Get()`, `@Post()`, etc.

### Example

```ts
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
```

---

## 3. 🛠️ Services

- Services hold the **business logic** of the application.
- Decorated with `@Injectable()` to make them available for **dependency injection**.
- Services are typically **injected into controllers** or other services.

### Example

```ts
@Injectable()
export class UsersService {
  private users = ['Alice', 'Bob'];

  findAll() {
    return this.users;
  }
}
```

---

## 4. 🔌 Providers

- A provider is **any class or value** that can be **injected** using NestJS’s DI system.
- Services, factories, constants, and database connections can all be providers.

### Types of Providers

- Class-based (`@Injectable()` services)
- Value providers (static constants)
- Factory providers (dynamic logic)
- Alias providers (reusing existing providers)

---

## 5. 🧰 Creating and Injecting a Service

To inject a service into a controller:
1. Create a service (`nest g service users`)
2. Inject it into the controller via the constructor.
3. Use the service inside controller methods.

```ts
constructor(private readonly usersService: UsersService) {}
```

---

## 6. 🧬 Swagger Integration

Use `@nestjs/swagger` to document your API.

### Install

```bash
npm install @nestjs/swagger swagger-ui-express
```

### Setup in `main.ts`

```ts
const config = new DocumentBuilder()
  .setTitle('API')
  .setDescription('The API description')
  .setVersion('1.0')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api-docs', app, document);
```

### Use in Controller

```ts
@ApiTags('users')
@Controller('users')
export class UsersController {
  @ApiOperation({ summary: 'Get users' })
  @ApiResponse({ status: 200, description: 'Returns all users' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
```

---

## 7. 🗂️ Admin Interface in NestJS

- NestJS **does not include a built-in admin interface** like Django.
- You can integrate with external tools such as:
  - [AdminJS](https://adminjs.co/)
  - [Forest Admin](https://www.forestadmin.com/)
  - Custom-built dashboards

---

## 8. 🛢️ Providers with Database Integrations

### A. With TypeORM

```ts
constructor(@InjectRepository(User) private repo: Repository<User>) {}
```

- Repositories are automatically registered as providers when using `TypeOrmModule.forFeature()`.

### B. With Prisma

Create a `PrismaService`:

```ts
@Injectable()
export class PrismaService extends PrismaClient {}
```

Register in module and inject where needed.

---

## 9. 🧪 Factory and Value Providers

### Factory Provider

```ts
{
  provide: 'UUID',
  useFactory: () => uuidv4(),
}
```

### Value Provider

```ts
{
  provide: 'API_KEY',
  useValue: '12345-ABCDE',
}
```

### Injection

```ts
constructor(@Inject('API_KEY') private apiKey: string) {}
```

---

## 🔁 Summary Table

| Concept      | Decorator        | Purpose                           | Commonly Used In            |
|--------------|------------------|-----------------------------------|-----------------------------|
| Module       | `@Module()`       | Group related components          | `AppModule`, `UsersModule` |
| Controller   | `@Controller()`   | Handle HTTP requests              | `UsersController`          |
| Service      | `@Injectable()`   | Business logic                    | `UsersService`             |
| Provider     | N/A               | Anything injectable (e.g. services, constants) | All                        |
