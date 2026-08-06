<script lang="ts">
  import Logo from "./SiteLogo.svelte";
  import Avatar from "./user/AvatarImage.svelte";
  import LoginButton from "./user/LoginButton.svelte";
  import CheckInDialog from "./user/checkin/CheckInDialog.svelte";
  import coinSvg from "$lib/assets/coin.svg";
  import noticeSvg from "$lib/assets/notice.svg";
  import cogSvg from "$lib/assets/cog.svg";
  import { user } from "./user/userStore";

  let showCheckIn = $state(false);
</script>

<header
  class="bg-gray-400 w-full h-16 sticky top-0 flex items-center shrink-0 z-50"
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

      <a
        class="size-12 rounded-full flex items-center justify-center cursor-pointer"
        title="设置"
        href="/settings/auth"
      >
        <img src={cogSvg} alt="设置" class="size-10" />
      </a>

      <div class="size-12" title="avatar">
        <Avatar url={$user.avatar} />
      </div>
    {/if}
  </div>
</header>

{#if showCheckIn}
  <CheckInDialog
    onclose={() => {
      showCheckIn = false;
    }}
  />
{/if}
