<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";
  import bg from "$lib/assets/registerBG.png";
  import { setRequestUtils } from "@ccw-api/api";
  import { requestUtils } from "@ccw-api/request";
  let { children } = $props();

  setRequestUtils(requestUtils);
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <link rel="preload" as="image" href={bg} />
</svelte:head>
{@render children()}
