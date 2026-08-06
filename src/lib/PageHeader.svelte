<script lang="ts">
  import PageHeaderMD from "./PageHeader-md.svelte";
  import PageHeaderSM from "./PageHeader-sm.svelte";
</script>

<div class="contents md:hidden">
  <PageHeaderSM></PageHeaderSM>
</div>
<div class="md:contents hidden">
  <PageHeaderMD></PageHeaderMD>
</div>
