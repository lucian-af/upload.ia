import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import { getAllPromptsRoute } from "./routes/get-all-prompts";
import { postUploadVideoRoute } from "./routes/post-upload-video";
import { postCreateTranscriptionRoute } from "./routes/post-create-transcription";
import { postGenerateIaCompletionRoute } from "./routes/post-generate-ai-completion";

const app = fastify();

app.register(fastifyCors, {
  origin: '*'
})

app.register(getAllPromptsRoute);
app.register(postUploadVideoRoute);
app.register(postCreateTranscriptionRoute);
app.register(postGenerateIaCompletionRoute);

app.listen({
  port: 3333
}).then(() => {
  console.warn('HTTP Server Running!')
});