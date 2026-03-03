&lt;script lang=&quot;ts&quot;&gt;
  import HealthCard from &apos;$lib/components/HealthCard.svelte&apos;;
&lt;/script&gt;

&lt;div class=&quot;grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6&quot;&gt;
  &lt;HealthCard title=&quot;Status&quot; loadFn=&quot;openclaw_status&quot; icon=&quot;❤️&quot; /&gt;
  &lt;HealthCard title=&quot;Agents&quot; loadFn=&quot;agents_list&quot; icon=&quot;🤖&quot; /&gt;
  &lt;HealthCard title=&quot;Sessions&quot; loadFn=&quot;sessions_list&quot; icon=&quot;📜&quot; /&gt;
&lt;/div&gt;