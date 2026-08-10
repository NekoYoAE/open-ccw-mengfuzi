<script lang="ts">
  import Logo from "./SiteLogo.svelte";
  import LoginButton from "./user/LoginButton.svelte";
  import CheckInDialog from "./user/checkin/CheckInDialog.svelte";
  import coinSvg from "$lib/assets/coin.svg";
  import noticeSvg from "$lib/assets/notice.svg";
  import cogSvg from "$lib/assets/cog.svg";
  import { user } from "./user/userStore";
  import { logout } from "./auth/tokenStore";
  import { goto } from "$app/navigation";
  import { communityWeb } from "$lib/api";
  import AvatarToProfile from "./user/AvatarToProfile.svelte";

  let { showCheckIn = $bindable(false), checkedIn = $bindable(true) } =
    $props();

  async function handleLogout() {
    await logout();
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

<!--修改导航栏👇-->
<header
  class="bg-black/65 w-full h-16 sticky top-0 flex items-center shrink-0 z-50 backdrop-blur-[5px]"
>
  <a
    href="/"
    class="absolute flex h-16 items-center justify-center"
    title="homepage"
  >
    <div class="size-12 ml-2 shrink-0"><Logo /></div>
    <h1
      class="ml-2 overflow-hidden h-14 text-4xl text-white font-bold content-center font-serif whitespace-nowrap"
    >
      Open CCW
    </h1>
  </a>

  <!-- 桌面端：右侧操作区 -->
  <div class="flex justify-self-end h-12 w-auto ml-auto mr-4 gap-4">
    <LoginButton></LoginButton>
    {#if $user.loggedIn}
      <button
        class="size-12 rounded-full flex items-center justify-center cursor-pointer relative hover:bg-white/20 transition-colors"
        title="签到"
        onclick={() => (showCheckIn = true)}
      >
        <img src={coinSvg} alt="签到" class="size-10" />
        {#if !checkedIn}
          <span class="bg-red-500 rounded-full size-3 absolute top-2 right-2"
          ></span>
        {/if}
      </button>

      <a
        class="size-12 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors"
        title="消息"
        href="/notice/interaction"
      >
        <img src={noticeSvg} alt="消息" class="size-10" />
      </a>

      <a
        class="size-12 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors"
        title="设置"
        href="/settings/auth"
      >
        <img src={cogSvg} alt="设置" class="size-10" />
      </a>

      <div class="size-12" title="avatar">
        <AvatarToProfile url={$user.avatar} oid={$user.oid} />
      </div>

      <button
        class="size-12 rounded-full flex items-center text-red-500 justify-center cursor-pointer hover:bg-white/20 transition-colors"
        title="退出登录"
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
      </button>
    {/if}
  </div>
</header>

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
