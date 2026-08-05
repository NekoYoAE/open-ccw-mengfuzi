<script lang="ts">
  import { page } from "$app/state";

  const { kind } = page.params;
  let error = $state("");
  if (!kind) {
    error = "未传入消息类型参数";
  }
</script>

<svelte:head>
  <title>消息通知 — Open CCW</title>
  <meta
    name="description"
    content="查看 CCW 社区的点赞、评论、关注等消息通知，及时了解社区互动动态。"
  />
</svelte:head>

{#if error}
  <div class="text-red-600">{error}</div>
{/if}
