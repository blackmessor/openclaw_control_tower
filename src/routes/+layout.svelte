&lt;script&gt;
  import '../app.css';
&lt;/script&gt;

&lt;svelte:head&gt;
  &lt;title&gt;OpenClaw Control Tower&lt;/title&gt;
&lt;/svelte:head&gt;

&lt;div class="flex h-screen bg-gray-100 dark:bg-gray-900"&gt;
  &lt;!-- Sidebar --&gt;
  &lt;nav class="w-72 md:w-64 bg-white dark:bg-gray-800 shadow-lg fixed h-screen sidebar sidebar-large z-50 border-r border-gray-200 dark:border-gray-700 hidden lg:block"&gt;
    &lt;div class="p-6"&gt;
      &lt;h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8"&gt;Control Tower&lt;/h2&gt;
      &lt;ul class="space-y-4"&gt;
        &lt;li&gt;&lt;a href="/" class="flex items-center py-3 px-4 text-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"&gt;
          &lt;span class="mr-3 text-2xl"&gt;📊&lt;/span&gt;Dashboard&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="/agents" class="flex items-center py-3 px-4 text-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"&gt;
          &lt;span class="mr-3 text-2xl"&gt;🤖&lt;/span&gt;Agents&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="/logs" class="flex items-center py-3 px-4 text-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"&gt;
          &lt;span class="mr-3 text-2xl"&gt;📜&lt;/span&gt;Logs&lt;/a&gt;&lt;/li&gt;
        &lt;li&gt;&lt;a href="/health" class="flex items-center py-3 px-4 text-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"&gt;
          &lt;span class="mr-3 text-2xl"&gt;❤️&lt;/span&gt;Health&lt;/a&gt;&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/div&gt;
  &lt;/nav&gt;
  &lt;!-- Overlay for mobile --&gt;
  &lt;div class="sidebar-overlay fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden hidden" id="sidebar-overlay"&gt;&lt;/div&gt;
  &lt;!-- Main content --&gt;
  &lt;main class="flex-1 lg:ml-0 p-8 lg:ml-72 overflow-auto"&gt;
    &lt;slot /&gt;
  &lt;/main&gt;
&lt;/div&gt;

&lt;style&gt;
  @media (max-width: 1024px) {
    nav.sidebar-large {
      transform: translateX(-100%);
    }
  }
  @media (min-width: 1280px) and (max-width: 1440px) {
    .sidebar {
      width: 14rem; /* w-56 */
    }
  }
&lt;/style&gt;