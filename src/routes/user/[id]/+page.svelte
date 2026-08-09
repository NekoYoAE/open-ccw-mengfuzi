<script lang="ts">
  import type { PageProps } from "./$types";
  import Error from "$lib/utils/Error.svelte";
  import Profile from "$lib/user/Profile.svelte";
  import PageHeader from "$lib/PageHeader.svelte";

  let { data, params }: PageProps = $props();
  let { profile, error } = $derived(data);
</script>

<svelte:head>
  <title>Open CCW - 用户主页 - {profile?.name ?? params.id}</title>
  <meta name="description" content={profile?.bio ?? "查看 CCW 用户的个人主页"} />
  <meta name="og:title" content="Open CCW - {profile?.name ?? '用户主页'}" />
  <meta name="og:description" content={profile?.bio ?? "查看 CCW 用户的个人主页"} />
  {#if profile?.avatar}
    <meta name="og:image" content={profile.avatar} />
  {/if}
  <meta name="og:url" content={`https://ccw.kivotos.qzz.io/user/${params.id}`} />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="Open CCW - {profile?.name ?? '用户主页'}" />
  <meta name="twitter:description" content={profile?.bio ?? "查看 CCW 用户的个人主页"} />
  {#if profile?.avatar}
    <meta name="twitter:image" content={profile.avatar} />
  {/if}
  <link rel="canonical" href={`https://ccw.kivotos.qzz.io/user/${params.id}`} />
</svelte:head>
<PageHeader></PageHeader>
<Profile bind:profile id={params.id}></Profile>
{#if !profile}
  <Error {error}></Error>
{/if}
