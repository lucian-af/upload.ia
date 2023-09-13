import fastify, { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { fastifyMultipart } from '@fastify/multipart'
import path from "node:path";
import fs from "node:fs";
import { pipeline } from "node:stream";
import { randomUUID } from "node:crypto";
import { promisify } from "node:util";

const pump = promisify(pipeline);

export async function postUploadVideoRoute(app: FastifyInstance) {
  const twentyFiveMb = 1_048_576 * 25
  
  app.register(fastifyMultipart, {
    limits: {
      fileSize: twentyFiveMb
    }
  })

  app.post('/videos', async (request, reply) => {
    const data = await request.file()

    if (!data)
      return reply.status(400).send({ error: 'Missing file input.'});

    const extension = path.extname(data.filename);

    if (extension !== '.mp3')
      return reply.status(400).send({ error: 'Invalid input type, please upload a MP3.'});

    const fileBaseName = path.basename(data.filename, extension);
    const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`;
    const uploadDestination = path.resolve(__dirname, '../../tmp', fileUploadName);

    await pump(data.file, fs.createWriteStream(uploadDestination));

    return reply.send()
  })
}