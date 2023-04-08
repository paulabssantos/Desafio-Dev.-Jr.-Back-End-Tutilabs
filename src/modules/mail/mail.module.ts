import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { SendEmailCreationRoadmapService } from './services/sendEmailCreationRoadmap.service';
@Module({
  imports: [MailerModule.forRootAsync({
    useFactory: () => ({
      transport: `smtps://${process.env.EMAIL}:${process.env.SENHA}@smtp.gmail.com`,
      template: {
        dir: __dirname + "/templates",
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  })],
  providers: [SendEmailCreationRoadmapService],
  exports: [SendEmailCreationRoadmapService]
})
export class MailModule { }
