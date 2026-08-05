<script lang="ts">
  import { page } from "$app/state";
  import Register from "$lib/auth/RegisterPage.svelte";
  import { onMount } from "svelte";
  import bg from "$lib/assets/registerBG.png";
  const url = new URL(page.url);
  const token = url.searchParams.get("token") || "";
  onMount(() => {
    if (token) {
      url.searchParams.delete("token");
      history.replaceState({}, "", url);
    }
  });
</script>

<svelte:head>
  <title>OpenCCW - Welcome To OpenCCW</title>
  <meta name="description" content="Open CCW注册页" />
  <link rel="preload" as="image" href={bg} />
</svelte:head>
<Register {token}></Register>
