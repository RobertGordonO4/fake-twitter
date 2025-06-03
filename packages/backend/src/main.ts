import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: '*', // Be more specific in production
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  })

  app.setGlobalPrefix('api')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips properties not in DTO
      transform: true, // Automatically transform payloads to DTO instances
    })
  )

  const config = new DocumentBuilder()
    .setTitle('Twitter Clone API')
    .setDescription('API for a simple Twitter clone application')
    .setVersion('1.0')
    .addBearerAuth() // For JWT
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-docs', app, document, {
    // To make swagger-ui generate correct json schema
    swaggerOptions: {
      persistAuthorization: true,
    },
  })

  const configService = app.get(ConfigService)
  const port = configService.get<number>('PORT') || 3001
  await app.listen(port, '0.0.0.0')
  console.log(`Application is running on: ${await app.getUrl()}`)
  console.log(`Swagger UI available at ${await app.getUrl()}/api-docs`)
  console.log(`Swagger JSON available at ${await app.getUrl()}/api-docs-json`)
}
bootstrap()
