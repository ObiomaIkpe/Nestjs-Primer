import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './service/users/users.service';
import { SampleMiddleware } from './middlewares/sample/sample.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      // consumer.apply(SampleMiddleware).forRoutes('users')
        // consumer.apply(SampleMiddleware).forRoutes(UsersController)
              consumer.apply(SampleMiddleware).forRoutes({
                path: 'users',
                method: RequestMethod.GET
              })
  }
}
