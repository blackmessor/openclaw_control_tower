import { Elysia, t } from 'elysia';
import { html } from '@elysiajs/html';
import { staticPlugin } from '@elysiajs/static';
import { bun } from '@elysiajs/bun';
import { WebSocket } from 'ws';

const app = new Elysia()
  .use(html())
  .use(staticPlugin({
    assets: "./public",
    prefix: "/",
  }))
  .get('/', () => Bun.file('./public/index.html'))
  .get('/health', async () => {
    try {
      const health = JSON.parse(await Bun.$`openclaw status --json`.text());
      return `
&lt;div class="health-grid"&gt;
  &lt;h2&gt;🩺 Gateway Health&lt;/h2&gt;
  &lt;pre&gt;${JSON.stringify(health, null, 2)}&lt;/pre&gt;
&lt;/div&gt;`;
    } catch (e) {
      return `&lt;div class="health-grid"&gt;&lt;h2&gt;❌ Health Error&lt;/h2&gt;&lt;p&gt;${e.message}&lt;/p&gt;&lt;/div&gt;`;
    }
  })
  .get('/agents', async () => {
    try {
      const agents = JSON.parse(await Bun.$`openclaw agents_list --json`.text());
      return `
&lt;div&gt;
  &lt;h2&gt;🤖 Agents&lt;/h2&gt;
  &lt;pre&gt;${JSON.stringify(agents, null, 2)}&lt;/pre&gt;
&lt;/div&gt;`;
    } catch (e) {
      return `&lt;div&gt;&lt;h2&gt;❌ Agents Error&lt;/h2&gt;&lt;p&gt;${e}&lt;/p&gt;&lt;/div&gt;`;
    }
  })
  .get('/sessions', async () => {
    try {
      const sessions = JSON.parse(await Bun.$`openclaw sessions_list --json`.text());
      return `
&lt;div&gt;
  &lt;h2&gt;📊 Sessions&lt;/h2&gt;
  &lt;pre&gt;${JSON.stringify(sessions, null, 2)}&lt;/pre&gt;
&lt;/div&gt;`;
    } catch (e) {
      return `&lt;div&gt;&lt;h2&gt;❌ Sessions Error&lt;/h2&gt;&lt;p&gt;${e}&lt;/p&gt;&lt;/div&gt;`;
    }
  })
  .get('/tasks', async () => {
    try {
      const memory = await Bun.file('/Users/nicolasgodefroy/.openclaw/shared_memory/SHAREDMEMORY.md').text();
      return `
&lt;div&gt;
  &lt;h2&gt;📋 Tasks (from SHAREDMEMORY)&lt;/h2&gt;
  &lt;pre&gt;${memory.substring(0, 2000)}...&lt;/pre&gt;
&lt;/div&gt;`;
    } catch (e) {
      return `&lt;div&gt;&lt;h2&gt;📋 Tasks&lt;/h2&gt;&lt;p&gt;No tasks data&lt;/p&gt;&lt;/div&gt;`;
    }
  })
  .get('/events', (ctx) => new Response(new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      const sendUpdate = async () => {
        const [health, agents, sessions] = await Promise.all([
          Bun.$`openclaw status --json`.text(),
          Bun.$`openclaw agents_list --json`.text(),
          Bun.$`openclaw sessions_list --json`.text(),
        ]);
        const update = {
          health: health.toString(),
          agents: agents.toString(),
          sessions: sessions.toString(),
        };
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(update)}\\n\\n`));
      };
      await sendUpdate(); // Initial
      const interval = setInterval(sendUpdate, 10000);
      return () => clearInterval(interval);
    }
  }), {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    }
  }))
  .listen(3000);

console.log(`🦊 OpenClaw Dashboard on http://localhost:${app.server?.port}`);
