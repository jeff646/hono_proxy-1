import { Hono } from 'hono';

const app = new Hono();

app.all('*', async (c) => {
  const target = 'https://example.com'; // 你要代理的目标URL
  const url = new URL(c.req.url);
  url.hostname = new URL(target).hostname;

  const proxyRequest = new Request(url.toString(), c.req);
  const response = await fetch(proxyRequest);

  return new Response(response.body, response);
});

export default app;

