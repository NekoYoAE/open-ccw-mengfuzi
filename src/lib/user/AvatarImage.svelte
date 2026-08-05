<script lang="ts">
  const { url, alt = "avatar" } = $props();
</script>

<img src={url} {alt} class="s-full rounded-full" />
