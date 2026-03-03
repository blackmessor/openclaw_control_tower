document.addEventListener('htmx:sseMessage', function(evt) {
  try {
    const data = JSON.parse(evt.detail.data);
    if (data.health) {
      document.getElementById('health').innerHTML = `<h2 class="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">🩺 Health</h2><pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto text-sm">${data.health}</pre>`;
    }
    if (data.agents) {
      document.getElementById('agents').innerHTML = `<h2 class="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">🤖 Agents</h2><pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto text-sm">${data.agents}</pre>`;
    }
    if (data.sessions) {
      document.getElementById('sessions').innerHTML = `<h2 class="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">📊 Sessions</h2><pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto text-sm">${data.sessions.substring(0, 8000)}</pre>`;
    }
    if (data.tasks) {
      document.getElementById('tasks').innerHTML = `<h2 class="text-2xl font-bold mb-4 text-orange-600 dark:text-orange-400">📋 Tasks</h2><pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto text-sm">${data.tasks}</pre>`;
    }
  } catch (e) {
    console.error('SSE update error:', e);
  }
});