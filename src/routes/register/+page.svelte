<script lang="ts">
  import { page } from "$app/state";
  import Register from "$lib/auth/RegisterPage.svelte";
  import { onMount } from "svelte";
  import bg from "$lib/assets/registerBG.webp";
  const url = new URL(page.url);
  const token = url.searchParams.get("token") || "";
  onMount(() => {
    if (token) {
      url.searchParams.delete("token");
      history.replaceState({}, "", url);
    }
  });
</script>

<svelte:head>
  <title>注册账号 — Open CCW</title>
  <meta
    name="description"
    content="加入 Open CCW，注册并绑定你的 CCW 社区账号。支持手动输入 Token 或通过 OAuth 一键授权自动获取，使用 PIN 码本地加密保护你的数据安全。"
  />
  <link rel="preload" as="image" href={bg} />
  <link rel="canonical" href="https://ccw.kivotos.qzz.io/register" />
</svelte:head>
<Register {token}></Register>
