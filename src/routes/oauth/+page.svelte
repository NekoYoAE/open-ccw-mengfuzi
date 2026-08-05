<script lang="ts">
  import { onMount } from "svelte";
  import { oauthState } from "./oauthConfig";
  import bg from "$lib/assets/registerBG.png";

  onMount(() => {
    const callbackUrl = new URL("/oauth/callback?code={code}", location.href);
    const redirectUrl = new URL(
      "https://www.ccw.site/detail/6a71d30252b44d2c94e05b62",
    );
    redirectUrl.searchParams.set(
      "kontakt",
      btoa(
        JSON.stringify({
          url: callbackUrl,
          state: oauthState,
        }),
      ),
    );
    window.location.href = redirectUrl.toString();
  });
</script>

<svelte:head>
  <title>OpenCCW - 正在跳转</title>
  <meta name="description" content="Open CCW oauth 跳转页" />
</svelte:head>

<div
  class="w-screen h-screen min-h-fit flex items-center justify-center"
  style:background="url({bg}) repeat center/cover"
>
  <div class="bg-white w-lg h-fit rounded-2xl p-10 shadow-xl text-center">
    <div
      class="mx-auto mb-6 w-12 h-12 border-4 border-gray-200 border-t-green-400 rounded-full animate-spin"
    ></div>
    <h2 class="text-2xl font-bold text-gray-800 mb-3">正在跳转到 CCW 登录</h2>
    <p class="text-gray-500 text-sm">
      即将重定向至 CCW OAuth 授权页面，请稍候...
    </p>
  </div>
</div>
