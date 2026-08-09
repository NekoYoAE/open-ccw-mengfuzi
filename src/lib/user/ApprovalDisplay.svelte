<script lang="ts">
  import { communityWeb } from "$lib/api";

  const { oid = "" } = $props();
</script>

{#if oid}
  {#await communityWeb.getApprovalTags(oid)}
    <div></div>
  {:then res}
    {JSON.stringify(res)}
  {/await}
{/if}
