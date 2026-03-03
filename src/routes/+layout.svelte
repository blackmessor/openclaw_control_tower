<script>
  import '../app.css';
</script>

<svelte:head>
  <title>OpenClaw Control Tower</title>
</svelte:head>

<div class="flex h-screen bg-gray-100 dark:bg-gray-900">
  <!-- Sidebar -->
  <nav class="w-72 md:w-64 bg-white dark:bg-gray-800 shadow-lg fixed h-screen sidebar sidebar-large z-50 border-r border-gray-200 dark:border-gray-700 hidden lg:block">
    <div class="p-6">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Control Tower</h2>
      <ul class="space-y-4">
        <li><a href="/" class="flex items-center py-3 px-4 text-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition">
          <span class="mr-3 text-2xl">📊</span>Dashboard</a></li>
        <li><a href="/agents" class="flex items-center py-3 px-4 text-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition">
          <span class="mr-3 text-2xl">🤖</span>Agents</a></li>
        <li><a href="/logs" class="flex items-center py-3 px-4 text-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition">
          <span class="mr-3 text-2xl">📜</span>Logs</a></li>
        <li><a href="/health" class="flex items-center py-3 px-4 text-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition">
          <span class="mr-3 text-2xl">❤️</span>Health</a></li>
      </ul>
    </div>
  </nav>
  <!-- Overlay for mobile -->
  <div class="sidebar-overlay fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden hidden" id="sidebar-overlay"></div>
  <!-- Main content -->
  <main class="flex-1 lg:ml-0 p-8 lg:ml-72 overflow-auto">
    <slot />
  </main>
</div>

<style>
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
</style>