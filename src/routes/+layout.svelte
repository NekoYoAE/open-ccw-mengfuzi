<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";
  import { setRequestUtils } from "@ccw-api/api";
  import { requestUtils } from "@ccw-api/request";
  let { children } = $props();

  setRequestUtils(requestUtils);
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>
{@render children()}
