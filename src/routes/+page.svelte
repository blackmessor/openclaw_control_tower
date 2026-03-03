<script lang="ts">
  import HealthCard from '$lib/components/HealthCard.svelte';
</script>

<div class="mb-8">
  <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">OpenClaw Control Tower</h1>
  <p class="text-xl text-gray-600 dark:text-gray-300">Live dashboard for agents, sessions, and system health.</p>
</div>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
  <HealthCard title="Gateway Status" loadFn="openclaw_status" icon="🚀" />
  <HealthCard title="Agents List" loadFn="agents_list" icon="🤖" />
</div>

<div class="grid grid-cols-1 gap-6">
  <HealthCard title="Active Sessions" loadFn="sessions_list" icon="📱" />
</div>