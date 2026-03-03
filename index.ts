import { Elysia } from 'elysia';
import { html } from '@elysiajs/html';

const app = new Elysia()
  .use(html())
  .get('/', () => Bun.file('./public/index.html'))
  .get('/status', async () => {
    try {
      const gatewayStatus = await Bun.$`openclaw gateway status --json`.json();
      return `
&lt;div&gt;
  &lt;h2&gt;🩺 Gateway Status&lt;/h2&gt;
  &lt;pre&gt;${JSON.stringify(gatewayStatus, null, 2)}&lt;/pre&gt;
&lt;/div&gt;`;
    } catch (e) {
      return `&lt;div&gt;&lt;h2&gt;❌ Status Error&lt;/h2&gt;&lt;p&gt;${e.message}&lt;/p&gt;&lt;/div&gt;`;
    }
  })
  .get('/agents', async () => {
    try {
      const agents = await Bun.$`openclaw agents list --json`.json();
      return `
&lt;div&gt;
  &lt;h2&gt;🤖 Agents&lt;/h2&gt;
  &lt;pre&gt;${JSON.stringify(agents, null, 2)}&lt;/pre&gt;
&lt;/div&gt;`;
    } catch (e) {
      return `&lt;div&gt;&lt;h2&gt;❌ Agents Error&lt;/h2&gt;&lt;p&gt;${e.message}&lt;/p&gt;&lt;/div&gt;`;
    }
  })
  .get('/sessions', async () => {
    try {
      const sessionsData = await Bun.$`openclaw sessions --all-agents --json`.json();
      const sessions = sessionsData.sessions.slice(0, 10) || [];
      return `
&lt;div&gt;
  &lt;h2&gt;📊 Sessions&lt;/h2&gt;
  &lt;pre&gt;${JSON.stringify(sessions, null, 2)}&lt;/pre&gt;
&lt;/div&gt;`;
    } catch (e) {
      return `&lt;div&gt;&lt;h2&gt;❌ Sessions Error&lt;/h2&gt;&lt;p&gt;${e.message}&lt;/p&gt;&lt;/div&gt;`;
    }
  })
  .get('/tasks', async () => {
    try {
      const memory = await Bun.file('/Users/nicolasgodefroy/.openclaw/shared_memory/SHAREDMEMORY.md').text();
      return `
&lt;div&gt;
  &lt;h2&gt;📋 Tasks (SHAREDMEMORY)&lt;/h2&gt;
  &lt;pre&gt;${memory.substring(0, 4000)}...&lt;/pre&gt;
&lt;/div&gt;`;
    } catch (e) {
      return `&lt;div&gt;&lt;h2&gt;❌ Tasks Error&lt;/h2&gt;&lt;p&gt;${e.message}&lt;/p&gt;&lt;/div&gt;`;
    }
  })
  .get('/events', () => new Response(new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      const sendUpdate = async () => {
        try {
          const gatewayResp = await Bun.$`openclaw gateway status --json`;
          const gatewayText = await gatewayResp.text();
          const agentsResp = await Bun.$`openclaw agents list --json`;
          const agentsText = await agentsResp.text();
          const sessionsResp = await Bun.$`openclaw sessions --all-agents --json`;
          const sessionsText = await sessionsResp.text();
          const memoryText = await Bun.file('/Users/nicolasgodefroy/.openclaw/shared_memory/SHAREDMEMORY.md').text();
          const update = {
            health: gatewayText,
            agents: agentsText,
            sessions: sessionsText,
            tasks: memoryText.substring(0, 2000) + '...',
          };
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(update)}\\n\\n`));
        } catch (e) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({error: e.message})}\n\n`));
        }
      };
      await sendUpdate();
      const interval = setInterval(sendUpdate, 10000);
      return () => clearInterval(interval);
    },
  }), {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
    },
  }))
  .listen(3000);

console.log(`🦊 OpenClaw Control Tower on http://localhost:${app.server?.port || 3000}`);