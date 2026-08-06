<script lang="ts">
  import PageHeaderMD from "./PageHeader-md.svelte";
  import PageHeaderSM from "./PageHeader-sm.svelte";

  let checkedIn = $state(true);
  let showCheckIn = $state(false);
</script>

<div class="contents md:hidden">
  <PageHeaderSM bind:checkedIn bind:showCheckIn></PageHeaderSM>
</div>
<div class="md:contents hidden">
  <PageHeaderMD bind:checkedIn bind:showCheckIn></PageHeaderMD>
</div>
