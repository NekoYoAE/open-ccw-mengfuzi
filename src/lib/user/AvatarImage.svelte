<script lang="ts">
  const { url, alt = "avatar", virtual = null } = $props();
</script>

<div class="relative size-full flex justify-center items-center">
  {#if virtual}
    <img src={virtual} alt={virtual} class="absolute scale-150 z-10" />
  {/if}
  <img src={url} {alt} class="size-full rounded-full z-0 m-auto" />
</div>
