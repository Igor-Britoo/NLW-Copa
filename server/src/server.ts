import Fastify from "fastify";
import cors from "@fastify/cors";
import {PrismaClient} from '@prisma/client'
import jwt from "@fastify/jwt";

import { authRoutes } from "./routes/auth";
import { gameRoutes } from "./routes/game";
import { guessRoutes } from "./routes/guess";
import { poolRoutes } from "./routes/pool";
import { userRoutes } from "./routes/user";

const prisma = new PrismaClient({
    log: ['query'],
})

async function bootstrap(){
    const fastify = Fastify({
        logger: true
    })

    //em produção deve ser uma variavel ambiente
    await fastify.register(jwt,{
        secret: 'nlwcopa',
    })

    await fastify.register(authRoutes)
    await fastify.register(gameRoutes)
    await fastify.register(guessRoutes)
    await fastify.register(poolRoutes)
    await fastify.register(userRoutes)

    await fastify.register(cors, {
        origin: true
    })

    await fastify.listen({port: 3333, host: '0.0.0.0'})
}
bootstrap()