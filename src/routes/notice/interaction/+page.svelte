<script lang="ts">
  import { communityWeb } from "$lib/api";
  import Error from "$lib/utils/Error.svelte";
  import { onMount } from "svelte";
  onMount(async () => {
    communityWeb.getNotificationPage("CREATION_INTERACTION");
  });
</script>

<Error error={"测试中"}></Error>
