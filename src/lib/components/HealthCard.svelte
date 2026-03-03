&lt;script lang=&quot;ts&quot;&gt;
  import { onMount } from &apos;svelte&apos;;
  import { invoke } from &apos;@tauri-apps/api/core&apos;;
  import { eventListener } from &apos;@tauri-apps/api/event&apos;;

  export let title: string;
  export let loadFn: string;
  export let icon: string = &apos;📊&apos;;

  let data = $state(null as any);
  let error = $state(&apos;&apos;);
  let interval: NodeJS.Timeout;

  async function loadData() {
    try {
      error = &apos;&apos;;
      const raw = await invoke&lt;string&gt;(loadFn);
      data = JSON.parse(raw);
    } catch (e) {
      console.error(e);
      error = `${e}`;
      data = null;
    }
  }

  onMount(() =&gt; {
    loadData();
    // Poll fallback
    interval = setInterval(loadData, 10000);
    // Listen for live updates (emit from Rust or external)
    const unlisten = eventListener(&apos;openclaw-update&apos;, (event) =&gt; {
      loadData();
    });
    return () =&gt; {
      clearInterval(interval);
      unlisten.then(f =&gt; f());
    };
  });
&lt;/script&gt;

&lt;div class=&quot;bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 h-96 overflow-auto&quot;&gt;
  &lt;div class=&quot;flex items-center mb-6&quot;&gt;
    &lt;span class=&quot;mr-4 text-3xl&quot;&gt;{icon}&lt;/span&gt;
    &lt;h3 class=&quot;text-2xl font-bold text-gray-900 dark:text-white&quot;&gt;{title}&lt;/h3&gt;
  &lt;/div&gt;
  {#if error}
    &lt;div class=&quot;text-red-500 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg&quot;&gt;
      ⚠️ {error}
    &lt;/div&gt;
  {:else if data}
    &lt;pre class=&quot;text-sm bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg font-mono text-gray-800 dark:text-gray-200 max-h-72 overflow-auto whitespace-pre-wrap&quot;&gt;
      {JSON.stringify(data, null, 2)}
    &lt;/pre&gt;
  {:else}
    &lt;div class=&quot;flex items-center justify-center h-64 text-gray-500&quot;&gt;
      &lt;span class=&quot;animate-spin mr-2&quot;&gt;⏳&lt;/span&gt;Loading...
    &lt;/div&gt;
  {/if}
&lt;/div&gt;