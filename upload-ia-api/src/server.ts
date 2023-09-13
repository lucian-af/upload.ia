import { prisma } from "./lib/prisma";
import { fastify } from 'fastify';
import { getAllPromptsRoute } from "./routes/get-all-prompts";
import { postUploadVideoRoute } from "./routes/post-upload-video";

const app = fastify();

app.register(getAllPromptsRoute);
app.register(postUploadVideoRoute);

app.listen({
  port: 3333
}).then(() => {
  console.warn('HTTP Server Running!')
});