<script lang="ts">
  import { onMount } from "svelte";

  onMount(() => {
    history.replaceState({}, "", "/notice/interaction");
  });
</script>

<svelte:head>
  <title>消息通知 — Open CCW</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>
