&lt;script&gt;
  import '../app.css';
&lt;/script&gt;

&lt;svelte:head&gt;
  &lt;title&gt;OpenClaw Control Tower&lt;/title&gt;
&lt;/svelte:head&gt;

&lt;div class="flex h-screen bg-gray-100"&gt;
  &lt;!-- Sidebar --&gt;
  &lt;nav class="w-64 bg-white shadow-lg hidden md:block sidebar-large" style="@media (max-width: 1248px) { display: none; }"&gt;
    &lt;div class="p-4"&gt;
      &lt;h2 class="text-xl font-bold text-gray-800 mb-6"&gt;Control Tower&lt;/h2&gt;
      &lt;ul class="space-y-2"&gt;
        &lt;li&gt;&lt;a href="/" class="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded"&gt;Dashboard&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="/agents" class="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded"&gt;Agents&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="/logs" class="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded"&gt;Logs&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="/health" class="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded"&gt;Health&lt;/a&gt;&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/div&gt;
  &lt;/nav&gt;
  &lt;!-- Mobile menu button --&gt;
  &lt;button class="md:hidden p-4 sidebar-toggle"&gt;☰&lt;/button&gt;
  &lt;!-- Main content --&gt;
  &lt;main class="flex-1 p-6 overflow-auto"&gt;
    &lt;slot /&gt;
  &lt;/main&gt;
&lt;/div&gt;

&lt;style&gt;
  @media (max-width: 768px) {
    .sidebar-large {
      display: none !important;
    }
  }
  /* 13" approx 1248px at 96dpi */
  @media (max-width: 1248px) {
    nav.sidebar-large {
      display: none;
    }
  }
&lt;/style&gt;