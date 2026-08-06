<script lang="ts">
  import PageHeader from "$lib/PageHeader.svelte";
  import type { LayoutProps } from "./$types";
  import InteractionIcon from "$lib/assets/interaction.svg";
  import { onMount } from "svelte";
  import { noticeTypes } from "./noticeTypes";
  import Error from "$lib/utils/Error.svelte";
  import { goto } from "$app/navigation";

  let { children }: LayoutProps = $props();
  const noticeIcons = [InteractionIcon];
  type NoticeTypes = (typeof noticeTypes)[number];

  let selectedName: NoticeTypes = $state(noticeTypes[0]);
  let error = $state("");

  onMount(() => {
    try {
      const url = new URL(document.URL);
      const type = url.pathname.split("/")[2];

      if (!type) {
        throw "消息类型错误";
      }
      if (!(type in noticeTypes)) {
        throw "消息类型错误";
      }
      selectedName = type as NoticeTypes;
    } catch (e) {
      error = String(error);
    }
  });
</script>

<PageHeader></PageHeader>
<h1>消息中心</h1>
<div class="flex items-center w-full">
  {#each noticeTypes as type, id}
    <button
      class="inline-flex p-2 rounded-full transition-colors {selectedName ===
      type
        ? 'bg-black/10'
        : ''}"
      onclick={() => goto(`/notice/${type}`)}
    >
      <img src={noticeIcons[id]} alt={type} class="size-12" />
    </button>
  {/each}
</div>
<Error {error}></Error>
{@render children()}
