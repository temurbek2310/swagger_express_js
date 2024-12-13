const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Uzum Market API',
            version: '1.0.0',
            description: 'API for managing Uzum Market products',
            contact: {
                name: "temurbek2310",
                url: "https://github.com/temurbek2310",
                email: "ghostwire2010@gmail.com",
            },
        },
        components: {
            securitySchemas: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [
            {
                BearerAuth: [],
            }
        ],
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./routes/*.js'], // Marshrutlar fayllari yo'li
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerDocs;
