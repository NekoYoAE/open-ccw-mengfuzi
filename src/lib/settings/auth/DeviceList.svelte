<script lang="ts">
  import { communityWeb, sso } from "$lib/api";
  import { onMount } from "svelte";
  import DeviceTableRow from "./DeviceTableRow.svelte";
  import type { Session } from "./types";

  let sessions = $state<Session[]>([]);
  let loading = $state(true);
  let loggingOutAll = $state(false);
  let error = $state("");

  const deviceCount = $derived(sessions.length);
  const otherDeviceCount = $derived(
    sessions.filter((s) => !s.currentDevice).length,
  );

  onMount(() => {
    refreshSessions();
  });

  async function refreshSessions() {
    loading = true;
    sessions = [];
    try {
      const totalNum = await communityWeb
        .getStudentSessions({ perPage: 1 })
        .then((res) => res.totalNum);
      sessions = await communityWeb
        .getStudentSessions({ perPage: totalNum, sortField: "createdAt" })
        .then((res) => res.data);
    } catch (e) {
      error = String(e);
    } finally {
      loading = false;
    }
  }

  async function logoutAll() {
    loggingOutAll = true;
    const others = sessions.filter((s) => !s.currentDevice);
    for (const s of others) {
      await sso.logoutBySession(s.id);
      sessions = sessions.filter((session) => session.id !== s.id);
    }
    await refreshSessions();
    loggingOutAll = false;
  }
</script>

<h1 class="text-lg font-bold text-gray-800 text-center w-full">登录设备管理</h1>

{#if error}
  <h2 class="text-lg text-red-500">{error}</h2>
  <a href="/" class="underline text-blue-500">返回首页</a>
{:else}
  <div class="flex items-center justify-between mb-4 px-1">
    <div>
      <p class="text-sm text-gray-500 mt-0.5">
        {#if loading}
          正在加载设备信息...
        {:else if sessions.length === 0}
          暂无已登录的设备
        {:else}
          当前共 <span class="text-green-600 font-semibold">{deviceCount}</span>
          台设备在线
          {#if otherDeviceCount > 0}
            ，其中 <span class="text-orange-500 font-semibold"
              >{otherDeviceCount}</span
            > 台为其他设备
          {/if}
        {/if}
      </p>
    </div>

    {#if otherDeviceCount > 0}
      {#if loggingOutAll}
        <span class="rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-400">
          正在退出全部设备...
        </span>
      {:else}
        <button
          class="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-100 hover:border-red-300 transition-colors cursor-pointer whitespace-nowrap"
          onclick={logoutAll}
        >
          退出全部设备
        </button>
      {/if}
    {/if}
  </div>

  <div class="w-full p-2">
    <div class="w-full overflow-x-auto border border-gray-200 rounded-lg">
      <table class="w-full text-sm">
        <thead>
          <tr
            class="bg-gray-200 text-gray-700 text-xs font-semibold uppercase tracking-wider"
          >
            <th class="px-4 py-3 text-center w-20">ID</th>
            <th class="px-4 py-3 text-left w-44">设备</th>
            <th class="px-4 py-3 text-left w-28">浏览器</th>
            <th class="px-4 py-3 text-left w-44">登录时间</th>
            <th class="px-4 py-3 text-center w-28">登录方式</th>
            <th class="px-4 py-3 text-left w-min-44">属地</th>
            <th class="px-4 py-3 text-center w-44">操作</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 bg-white">
          {#if loading}
            <tr>
              <td colspan="7" class="px-4 py-16 text-center">
                <div
                  class="mx-auto w-8 h-8 border-2 border-gray-200 border-t-green-400 rounded-full animate-spin"
                ></div>
                <p class="mt-3 text-gray-400 text-sm">加载设备列表...</p>
              </td>
            </tr>
          {:else if sessions.length === 0}
            <tr>
              <td colspan="7" class="px-4 py-16 text-center text-gray-400">
                暂无设备记录
              </td>
            </tr>
          {:else}
            {#each sessions as session (session.id)}
              <DeviceTableRow {session} onLogout={refreshSessions} />
            {/each}
          {/if}
        </tbody>
      </table>
    </div>
  </div>
{/if}
