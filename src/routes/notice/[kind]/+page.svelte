<script lang="ts">
  import { page } from "$app/state";

  const { kind } = page.params;
  let error = $state("");
  if (!kind) {
    error = "未传入消息类型参数";
  }
</script>

{#if error}
  <div class="text-red-600">{error}</div>
{/if}
