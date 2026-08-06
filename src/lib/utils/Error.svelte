<script lang="ts">
  let { error: error_ }: { error: Error | string } = $props();
  let error = $derived(String(error_));
</script>

{#if error}
  <div class="text-red-500">{error}</div>
  <a href="/" class="text-blue-500">返回主页</a>
{/if}
