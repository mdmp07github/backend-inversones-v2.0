import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsuarioModule } from './routers/usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { ValidateTokenMiddleware } from './middlewares/validate-token'
import { JwtModule } from '@nestjs/jwt';
import { EstadoCivilModule } from './routers/estado_civil/estado_civil.module';
import { DepartamentosModule } from './routers/departamentos/departamentos.module';
import { ProvinciasModule } from './routers/provincias/provincias.module';
import { DistritosModule } from './routers/distritos/distritos.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerCustomGuard } from './guards/throttle.guard';
import { EntidadModule } from './routers/entidad/entidad.module';
import { TipoVelaModule } from './routers/tipo_vela/tipo_vela.module';
import { DocumentosModule } from './routers/documentos/documentos.module';
import { ImagenesModule } from './routers/imagenes/imagenes.module';

@Module({
  imports: [
    UsuarioModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: process.env.POSTGRES_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    EstadoCivilModule,
    DepartamentosModule,
    ProvinciasModule,
    DistritosModule,
    DocumentosModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          limit: 10,
          ttl: 60000
        },
      ],
    }),
    EntidadModule,
    TipoVelaModule,
    ImagenesModule
  ],
  controllers: [],
  /* providers: [{
    provide: APP_GUARD,
    useClass: ThrottlerCustomGuard,
  }], */
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateTokenMiddleware).forRoutes(
      /* router auth */
      { path: '/auth/profile', method: RequestMethod.GET },
      { path: '/auth/verify-token', method: RequestMethod.GET },
      /* router usuario */
      { path: '/usuario/list-one', method: RequestMethod.GET },
      { path: '/usuario/update/:id', method: RequestMethod.PATCH },
      /* Entidad */
      { path: '/entidad/list-all', method: RequestMethod.GET },
      { path: '/entidad/filter/:P1/:P2/:P3/:P4/:P5/:P6/:P7/:P8', method: RequestMethod.GET },
      { path: '/entidad/list-one/:id', method: RequestMethod.GET },
      { path: '/entidad/insert', method: RequestMethod.POST },
      { path: '/entidad/update/:id', method: RequestMethod.PATCH },
      { path: '/entidad/delete/:id', method: RequestMethod.DELETE },
    )
  }
}
