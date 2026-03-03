<script lang="ts">
  import { onMount } from 'svelte';
  import { invoke } from '@tauri-apps/api/core';
  import { eventListener } from '@tauri-apps/api/event';

  let { title, loadFn, icon = '📊' } = $props<{ title: string; loadFn: string; icon?: string }>();
  let data = $state(null as any);
  let error = $state('');
  let interval: NodeJS.Timeout;

  async function loadData() {
    try {
      error = '';
      const raw = await invoke<string>(loadFn);
      data = JSON.parse(raw);
    } catch (e) {
      console.error(e);
      error = `${e}`;
      data = null;
    }
  }

  onMount(() => {
    loadData();
    // Poll fallback
    interval = setInterval(loadData, 10000);
    // Listen for live updates (emit from Rust or external)
    const unlisten = eventListener('openclaw-update', (event) => {
      loadData();
    });
    return () => {
      clearInterval(interval);
      unlisten.then(f => f());
    };
  });
</script>

<div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 h-96 overflow-auto">
  <div class="flex items-center mb-6">
    <span class="mr-4 text-3xl">{icon}</span>
    <h3 class="text-2xl font-bold text-gray-900 dark:text-white">{title}</h3>
  </div>
  {#if error}
    <div class="text-red-500 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
      ⚠️ {error}
    </div>
  {:else if data}
    <pre class="text-sm bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg font-mono text-gray-800 dark:text-gray-200 max-h-72 overflow-auto whitespace-pre-wrap">
      {JSON.stringify(data, null, 2)}
    </pre>
  {:else}
    <div class="flex items-center justify-center h-64 text-gray-500">
      <span class="animate-spin mr-2">⏳</span>Loading...
    </div>
  {/if}
</div>