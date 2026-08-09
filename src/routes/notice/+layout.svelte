<script lang="ts">
  import PageHeader from "$lib/PageHeader.svelte";
  import type { LayoutProps } from "./$types";
  import { onMount } from "svelte";
  import { noticeTypes } from "./noticeTypes";
  import Error from "$lib/utils/Error.svelte";
  import { goto } from "$app/navigation";

  let { children }: LayoutProps = $props();

  let selectedId: number = $state(-1);
  let error = $state("");

  onMount(() => {
    try {
      const url = new URL(document.URL);
      const type = url.pathname.split("/")[2];

      if (!type) {
        throw "消息类型错误";
      }
      selectedId = noticeTypes.findIndex((t) => t.type == type);
      if (selectedId < 0) {
        throw "消息类型错误";
      }
    } catch (e) {
      error = String(error);
    }
  });
</script>

<svelte:head>
  <title
    >Open CCW - 消息中心{selectedId >= 0 &&
      ` - ${noticeTypes[selectedId].name}`}</title
  >
</svelte:head>

<PageHeader></PageHeader>
<div class="flex justify-center w-full md:gap-24 gap-8 border-b">
  {#if selectedId >= 0}
    {#each noticeTypes as { type, name, icon }, id}
      <button
        class="relative flex flex-col flex-wrap size-18 justify-center items-center transition-colors cursor-pointer {noticeTypes[
          selectedId
        ].type === type
          ? 'border-b-green-500 border-b text-green-500'
          : 'border-b border-b-transparent'}"
        onclick={() => {
          selectedId = id;
          goto(`/notice/${type}`);
        }}
      >
        <img src={icon} alt={name} class="size-8 relative -top-2" />
        <span class="absolute text-sm shrink-0 bottom-2">{name}</span>
      </button>
    {/each}
  {/if}
</div>
<Error {error}></Error>
{@render children()}
