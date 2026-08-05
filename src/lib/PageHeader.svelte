<script lang="ts">
  import Logo from "./SiteLogo.svelte";
  import Avatar from "./user/AvatarImage.svelte";
  import LoginButton from "./user/LoginButton.svelte";
  import CheckInDialog from "./user/checkin/CheckInDialog.svelte";
  import coinSvg from "$lib/assets/coin.svg";
  import noticeSvg from "$lib/assets/notice.svg";
  import { user } from "./user/userStore";

  let showCheckIn = $state(false);
  let menuOpen = $state(false);
</script>

<header
  class="bg-gray-400 w-full md:h-16 h-12 absolute top-0 flex items-center shrink-0"
>
  <!-- Logo + 标题：桌面端左对齐，移动端居中 -->
  <a
    href="/"
    class="absolute left-1/2 -translate-x-1/2 flex items-center md:contents"
    title="homepage"
  >
    <div class="md:size-12 size-8 mt-2 mb-2 md:ml-2 shrink-0"><Logo /></div>
    <h1
      class="ml-2 overflow-hidden h-14 text-2xl md:text-4xl text-white font-bold content-center whitespace-nowrap"
    >
      Open CCW
    </h1>
  </a>

  <!-- 桌面端：右侧操作区 -->
  <div class="hidden md:flex justify-self-end h-12 w-auto ml-auto mr-4 gap-4">
    <LoginButton></LoginButton>
    {#if $user.loggedIn}
      <button
        class="size-12 rounded-full flex items-center justify-center cursor-pointer"
        title="签到"
        onclick={() => (showCheckIn = true)}
      >
        <img src={coinSvg} alt="签到" class="size-10" />
      </button>

      <a
        class="size-12 rounded-full flex items-center justify-center cursor-pointer"
        title="消息"
        href="/notice"
      >
        <img src={noticeSvg} alt="消息" class="size-10" />
      </a>

      <div class="size-12" title="avatar">
        <Avatar url={$user.avatar} />
      </div>
    {/if}
  </div>

  <!-- 移动端：汉堡菜单按钮 -->
  <button
    class="md:hidden ml-auto mr-4 size-10 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-white/20 transition-colors cursor-pointer z-50"
    title="菜单"
    onclick={() => (menuOpen = !menuOpen)}
    aria-label="菜单"
  >
    <span
      class="block w-5 h-0.5 bg-white rounded transition-transform {menuOpen
        ? 'translate-y-2 rotate-45'
        : ''}"
    ></span>
    <span
      class="block w-5 h-0.5 bg-white rounded transition-opacity {menuOpen
        ? 'opacity-0'
        : ''}"
    ></span>
    <span
      class="block w-5 h-0.5 bg-white rounded transition-transform {menuOpen
        ? '-translate-y-2 -rotate-45'
        : ''}"
    ></span>
  </button>
</header>

<!-- 移动端折叠菜单 -->
{#if menuOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="md:hidden fixed inset-0 top-12 z-40 bg-black/30"
    onclick={() => (menuOpen = false)}
  >
    <div
      class="absolute top-0 right-0 w-48 bg-gray-200 rounded-bl-2xl shadow-xl py-2"
      onclick={(e: MouseEvent) => e.stopPropagation()}
    >
      {#if $user.loggedIn}
        <button
          class="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          onclick={() => {
            showCheckIn = true;
            menuOpen = false;
          }}
        >
          <img src={coinSvg} alt="签到" class="size-6" />
          <span class="text-sm font-medium">每日签到</span>
        </button>

        <a
          href="/notice"
          class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
          onclick={() => (menuOpen = false)}
        >
          <img src={noticeSvg} alt="消息" class="size-6" />
          <span class="text-sm font-medium">消息通知</span>
        </a>

        <div class="border-t border-gray-100 mt-1 pt-2 px-4 pb-1">
          <div class="flex items-center gap-3 py-2">
            <div class="size-8 shrink-0">
              <Avatar url={$user.avatar} />
            </div>
            <span class="text-sm text-gray-500 truncate"
              >{$user.name || "未命名"}</span
            >
          </div>
        </div>
      {:else}
        <div class="flex flex-col gap-1 px-2">
          <LoginButton></LoginButton>
        </div>
      {/if}
    </div>
  </div>
{/if}

{#if showCheckIn}
  <CheckInDialog
    onclose={() => {
      showCheckIn = false;
    }}
  />
{/if}
