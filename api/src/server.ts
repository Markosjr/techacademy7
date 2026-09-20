import { app } from './app';
import { env } from './config/env';

app.listen(env.port, () => {
  console.log(`FixFlow API em execução na porta ${env.port}.`);
});
