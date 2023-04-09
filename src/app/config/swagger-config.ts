import { DocumentBuilder } from '@nestjs/swagger';

const swaggerConfig = new DocumentBuilder()
    .setTitle('SGR')
    .setDescription('API Sistema de gerenciamento de roteiro')
    .addServer('http://localhost:3000')
    .addBearerAuth()
    .build();

export { swaggerConfig };
