<script lang="ts">
  import Error from "$lib/utils/Error.svelte";
  import { communityWeb } from "$lib/api";
  import { onMount } from "svelte";
  import AvatarImage from "./AvatarImage.svelte";

  let {
    id = "",
    profile = $bindable(null),
  }: { id: string; profile: UserProfile | null } = $props();

  let error = $state("");

  async function loadFull() {
    if (!id) {
      error = "config error";
      return;
    }
    try {
      let studentNumber = undefined,
        studentOid = undefined;
      if (id.length == 24) {
        studentOid = id;
      } else {
        studentNumber = id;
      }
      profile = await communityWeb.getStudentProfile({
        studentNumber,
        studentOid,
      });
    } catch (e) {
      error = String(e);
    }
  }

  onMount(() => {
    if (profile) {
      // 已有 user，但仍尝试获取完整资料以补全统计信息
      loadFull().catch((e) => {
        error = `本地请求失败 ${String(e)}`;
      });
      return;
    }
    loadFull();
  });

  function formatBirthday(ts: number): string {
    if (!ts) return "-";
    const d = new Date(ts);
    return d.toLocaleDateString();
  }

  function genderLabel(g: string, hide: boolean): string {
    if (hide) return "保密";
    if (g === "MALE") return "男";
    if (g === "FEMALE") return "女";
    return g || "-";
  }
</script>

<Error {error}></Error>

{#if profile}
  <div class="max-w-3xl mx-auto">
    <!-- 顶部卡片：头像 + 昵称 + 简介 + 核心数据 -->
    <div class="bg-white shadow overflow-hidden border border-gray-100">
      {#if profile.memberArchive?.homepageCover}
        <img
          src={profile.memberArchive.homepageCover}
          alt="cover"
          class="w-full h-36 md:h-48 object-cover"
        />
      {/if}

      <div class="px-6 pb-6">
        <!-- 头像 -->
        <div class="flex flex-row gap-4 relative flex-nowrap">
          <div class="size-16 shrink-0">
            {#if profile.avatar}
              <AvatarImage url={profile.avatar} virtual={profile.virtualValue}
              ></AvatarImage>
            {:else}
              <AvatarImage
                url="https://m.xiguacity.cn/icon/new_avatar.png"
                virtual={profile.virtualValue}
              ></AvatarImage>
            {/if}
          </div>

          <div class="ml-2 mt-0 flex flex-col">
            <h1 class="text-2xl font-bold text-gray-900 items-center gap-2">
              {profile.name}
              {#if profile.identityAuthRank === "REAL_NAME"}
                <span title="已实名认证" class="size-5 text-indigo-500 shrink-0"
                  ><svg viewBox="0 0 24 24" fill="currentColor"
                    ><path
                      d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"
                    /></svg
                  ></span
                >
              {/if}
            </h1>
            <p class="text-xs text-gray-500 mt-1">
              学号：{profile.studentNumber}
            </p>
            <!-- 简介 -->
            {#if profile.bio}
              <p
                class="mt-1 text-gray-700 leading-relaxed text-sm text-balance break-all"
              >
                {profile.bio}
              </p>
            {:else}
              <p class="mt-1 text-gray-400 text-xs">这个人很懒，什么都没写~</p>
            {/if}
          </div>
        </div>

        <!-- 核心统计 -->
        <div
          class="mt-6 grid grid-cols-3 gap-3 border-t border-gray-100 pt-5 text-center"
        >
          <div>
            <div class="text-2xl font-bold text-indigo-600">
              {profile.reputationScore.score}
            </div>
            <div class="text-xs text-gray-500 mt-1">信誉分</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-gray-800">
              {profile.statistics.homeworkCount}
            </div>
            <div class="text-xs text-gray-500 mt-1">作品</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-gray-800">
              {profile.statistics.likeHomeworkCount}
            </div>
            <div class="text-xs text-gray-500 mt-1">获赞</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 个人信息详情 -->
    <div
      class="mt-4 bg-white rounded-2xl shadow border border-gray-100 px-6 py-5"
    >
      <h2 class="text-lg font-semibold text-gray-900 mb-4">个人信息</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
        <div>
          <div class="text-gray-400">性别</div>
          <div class="text-gray-800 mt-1" title={profile.gender}>
            {genderLabel(profile.gender, profile.hideGender)}
          </div>
        </div>
        <div>
          <div class="text-gray-400">生日</div>
          <div class="text-gray-800 mt-1" title={String(profile.birthday)}>
            {formatBirthday(profile.birthday)}
          </div>
        </div>
        <div>
          <div class="text-gray-400">加入天数</div>
          <div class="text-gray-800 mt-1">{profile.studentCreatedDays} 天</div>
        </div>
        <div>
          <div class="text-gray-400">评论数</div>
          <div class="text-gray-800 mt-1">{profile.commentCount}</div>
        </div>
      </div>
    </div>

    <!-- 个人简介详情 -->
    <div
      class="mt-4 bg-white rounded-2xl shadow border border-gray-100 px-6 py-5"
    >
      <h2 class="text-lg font-semibold text-gray-900 mb-4">个人介绍</h2>
      <div class="space-y-4 text-sm">
        {#if profile.extraInfo.selfIntroduction}
          <div>
            <div class="text-gray-400">自我介绍</div>
            <p class="text-gray-800 mt-1 leading-relaxed">
              {profile.extraInfo.selfIntroduction}
            </p>
          </div>
        {/if}
        {#if profile.extraInfo.learnedProgrammingLanguages}
          <div>
            <div class="text-gray-400">掌握语言</div>
            <div class="flex flex-wrap gap-2 mt-2">
              {#each profile.extraInfo.learnedProgrammingLanguages.split(/[,，]/) as lang}
                {#if lang.trim()}
                  <span
                    class="px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs"
                    >{lang.trim()}</span
                  >
                {/if}
              {/each}
            </div>
          </div>
        {/if}
        {#if profile.extraInfo.hobbies}
          <div>
            <div class="text-gray-400">兴趣爱好</div>
            <div class="flex flex-wrap gap-2 mt-2">
              {#each profile.extraInfo.hobbies.split(/[,，]/) as hobby}
                {#if hobby.trim()}
                  <span
                    class="px-2.5 py-1 bg-purple-50 text-purple-600 rounded-full text-xs"
                    >{hobby.trim()}</span
                  >
                {/if}
              {/each}
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}
