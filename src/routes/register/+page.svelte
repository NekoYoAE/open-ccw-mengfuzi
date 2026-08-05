<script lang="ts">
  import { page } from "$app/state";
  import Register from "$lib/auth/RegisterPage.svelte";
  import { onMount } from "svelte";
  const url = new URL(page.url);
  const token = url.searchParams.get("token") || "";
  onMount(() => {
    if (token) {
      url.searchParams.delete("token");
      history.replaceState({}, "", url);
    }
  });
</script>

<svelte:head><title>OpenCCW - Welcome To OpenCCW</title></svelte:head>
<Register {token}></Register>
