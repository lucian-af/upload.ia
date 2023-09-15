import { openai } from "./../lib/openai";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { createReadStream } from "node:fs";

const paramsSchema = z.object({
  videoId: z.string().uuid()
})

const bodySchema = z.object({
  prompt: z.string()
})

export async function postCreateTranscriptionRoute(app: FastifyInstance) {
  app.post('/videos/:videoId/transcription', async (request) => {
    const { videoId } = paramsSchema.parse(request.params)
    const { prompt } = bodySchema.parse(request.body)
    const video = await prisma.video.findUniqueOrThrow({
      where: {
        id: videoId
      }
    })
    const audioReadStream = createReadStream(video.path)

    const response = await openai.audio.transcriptions.create({
      file: audioReadStream,
      model: 'whisper-1',
      language: 'pt',
      response_format: 'json',
      temperature: 0,
      prompt: prompt
    })
    const transcription = response.text
    await prisma.video.update({
      where: {
        id: videoId
      },
      data: {
        transcription
      }
    })

    return { transcription }
  })
}