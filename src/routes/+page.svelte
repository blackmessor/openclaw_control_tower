&lt;script lang=&quot;ts&quot;&gt;
  import HealthCard from &apos;$lib/components/HealthCard.svelte&apos;;
&lt;/script&gt;

&lt;div class=&quot;mb-8&quot;&gt;
  &lt;h1 class=&quot;text-4xl font-bold text-gray-900 dark:text-white mb-4&quot;&gt;OpenClaw Control Tower&lt;/h1&gt;
  &lt;p class=&quot;text-xl text-gray-600 dark:text-gray-300&quot;&gt;Live dashboard for agents, sessions, and system health.&lt;/p&gt;
&lt;/div&gt;

&lt;div class=&quot;grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8&quot;&gt;
  &lt;HealthCard title=&quot;Gateway Status&quot; loadFn=&quot;openclaw_status&quot; icon=&quot;🚀&quot; /&gt;
  &lt;HealthCard title=&quot;Agents List&quot; loadFn=&quot;agents_list&quot; icon=&quot;🤖&quot; /&gt;
&lt;/div&gt;

&lt;div class=&quot;grid grid-cols-1 gap-6&quot;&gt;
  &lt;HealthCard title=&quot;Active Sessions&quot; loadFn=&quot;sessions_list&quot; icon=&quot;📱&quot; /&gt;
&lt;/div&gt;