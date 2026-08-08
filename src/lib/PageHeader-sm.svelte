<script lang="ts">
  import Logo from "./SiteLogo.svelte";
  import Avatar from "./user/AvatarImage.svelte";
  import LoginButton from "./user/LoginButton.svelte";
  import CheckInDialog from "./user/checkin/CheckInDialog.svelte";
  import coinSvg from "$lib/assets/coin.svg";
  import noticeSvg from "$lib/assets/notice.svg";
  import cogSvg from "$lib/assets/cog.svg";
  import { user } from "./user/userStore";
  import { logout } from "./auth/tokenStore";
  import { goto } from "$app/navigation";
  import { communityWeb } from "$lib/api";

  let { showCheckIn = $bindable(false), checkedIn = $bindable(true) } =
    $props();
  let menuOpen = $state(false);

  async function handleLogout() {
    await logout();
    menuOpen = false;
    await goto("/");
  }

  async function updateCheckIn() {
    try {
      const { checkInRecordResps, todayIndex } =
        await communityWeb.getCheckInRecords();
      const today = checkInRecordResps[todayIndex];
      checkedIn = today.isCheckIn;
    } catch (e) {
      return;
    }
  }

  $effect(() => {
    if ($user.loggedIn) {
      updateCheckIn();
    }
  });
</script>

<header
  class="bg-gray-400 w-full h-12 sticky top-0 flex items-center justify-center shrink-0 z-50"
>
  <a href="/" class="flex justify-center items-center w-fit" title="homepage">
    <div class="size-8 mt-2 mb-2 shrink-0"><Logo /></div>
    <h1
      class="leading-12 ml-2 overflow-hidden h-12 text-2xl text-white font-bold content-center whitespace-nowrap"
    >
      Open CCW
    </h1>
  </a>

  <button
    class="absolute right-4 size-10 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-white/20 transition-colors cursor-pointer z-50"
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
    {#if !checkedIn}
      <span class="bg-red-500 rounded-full size-2 absolute right-0 top-1"
      ></span>
    {/if}
  </button>
</header>

<!-- 移动端折叠菜单 -->
{#if menuOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 top-12 z-40 bg-black/30"
    onclick={() => (menuOpen = false)}
  >
    <div
      class="absolute top-0 right-0 w-48 bg-gray-200 rounded-bl-2xl shadow-xl py-2"
      onclick={(e: MouseEvent) => e.stopPropagation()}
    >
      {#if $user.loggedIn}
        <button
          class="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer relative"
          onclick={() => {
            showCheckIn = true;
            menuOpen = false;
          }}
        >
          <img src={coinSvg} alt="签到" class="size-6" />
          {#if !checkedIn}
            <span class="bg-red-500 rounded-full size-2 absolute left-8 top-3"
            ></span>
          {/if}
          <span class="text-sm font-medium">每日签到</span>
        </button>

        <a
          href="/notice/interaction"
          class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
          onclick={() => (menuOpen = false)}
        >
          <img src={noticeSvg} alt="消息" class="size-6" />
          <span class="text-sm font-medium">消息通知</span>
        </a>

        <a
          href="/settings/auth"
          class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <img src={cogSvg} alt="cog" class="size-6" />
          <span class="text-sm font-medium">个人设置</span>
        </a>

        <div class="border-t border-gray-100 mt-1 pt-2">
          <button
            class="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-gray-50 transition-colors cursor-pointer"
            onclick={handleLogout}
          >
            <svg
              class="size-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span class="text-sm font-medium">退出登录</span>
          </button>
        </div>
        <div class="border-t border-gray-100 pt-2 px-4 pb-1">
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
    onChecked={() => {
      checkedIn = true;
    }}
  />
{/if}
