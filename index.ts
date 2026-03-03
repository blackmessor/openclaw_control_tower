import { Elysia } from 'elysia';

const app = new Elysia()
  .get('/', () => Bun.file('./public/index.html'))
  .get('/status', async ({ set }) => {
    set.type = 'text/html';
    try {
      const gatewayStatus = await Bun.$`openclaw gateway status --json`.json();
      return `<div><h2>🩺 Gateway Status</h2><pre>${JSON.stringify(gatewayStatus, null, 2)}</pre></div>`;
    } catch (e) {
      return `<div><h2>❌ Status Error</h2><p>${e.message}</p></div>`;
    }
  })
  .get('/agents', async ({ set, query }) => {
    set.type = 'text/html';
    try {
      const agents = await Bun.$`openclaw agents list --json`.json();
      const page = parseInt(query?.page || '1');
      const limit = parseInt(query?.limit || '20');
      const start = (page - 1) * limit;
      const paginated = agents.slice(start, start + limit);
      const totalPages = Math.ceil(agents.length / limit);
      const prev = page > 1 ? `<a href="/agents?page=${page-1}&limit=${limit}" class="px-3 py-1 bg-blue-500 text-white rounded"> precedent</a>` : '';
      const next = page < totalPages ? `<a href="/agents?page=${page+1}&limit=${limit}" class="px-3 py-1 bg-gray-500 text-white rounded"> suivant </a>` : '';
      const html = `<div><h2 class="text-2xl font-bold mb-4">🤖 Agents (page ${page}/${totalPages})</h2><div class="flex gap-2 mb-4">${prev}${next}</div><pre class="max-h-96 overflow-auto">${JSON.stringify(paginated, null, 2)}</pre></div>`;
      return new Response(html, { headers: { 'content-type': 'text/html' } });
    } catch (e) {
      return new Response(`<div><h2>❌ Agents Error</h2><p>${e.message}</p></div>`, { headers: { 'content-type': 'text/html' } });
    }
  })
  .get('/sessions', async ({ set, query }) => {
    set.type = 'text/html';
    try {
      const sessionsData = await Bun.$`openclaw sessions --all-agents --json`.json();
      const sessions = sessionsData.sessions || [];
      const page = parseInt(query?.page || '1');
      const limit = parseInt(query?.limit || '20');
      const start = (page - 1) * limit;
      const paginated = sessions.slice(start, start + limit);
      const totalPages = Math.ceil(sessions.length / limit);
      const prev = page > 1 ? `<a href="/sessions?page=${page-1}&limit=${limit}" class="px-3 py-1 bg-blue-500 text-white rounded"> precedent</a>` : '';
      const next = page < totalPages ? `<a href="/sessions?page=${page+1}&limit=${limit}" class="px-3 py-1 bg-gray-500 text-white rounded"> suivant </a>` : '';
      const html = `<div><h2 class="text-2xl font-bold mb-4">📊 Sessions (page ${page}/${totalPages})</h2><div class="flex gap-2 mb-4">${prev}${next}</div><pre class="max-h-96 overflow-auto">${JSON.stringify(paginated, null, 2)}</pre></div>`;
      return new Response(html, { headers: { 'content-type': 'text/html' } });
    } catch (e) {
      return new Response(`<div><h2>❌ Sessions Error</h2><p>${e.message}</p></div>`, { headers: { 'content-type': 'text/html' } });
    }
  })
  .get('/tasks', async ({ set }) => {
    set.type = 'text/html';
    try {
      const memory = await Bun.file('/Users/nicolasgodefroy/.openclaw/shared_memory/SHAREDMEMORY.md').text();
      return new Response(`<div><h2>📋 Tasks (SHAREDMEMORY)</h2><pre>${memory.substring(0, 4000)}...</pre></div>`, { headers: { 'content-type': 'text/html' } });
    } catch (e) {
      return new Response(`<div><h2>❌ Tasks Error</h2><p>${e.message}</p></div>`, { headers: { 'content-type': 'text/html' } });
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
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(update)}\n\n`));
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