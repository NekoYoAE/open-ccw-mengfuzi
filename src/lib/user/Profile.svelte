<script lang="ts">
  import Error from "$lib/utils/Error.svelte";
  import AvatarImage from "./AvatarImage.svelte";
  import ProfileBG from "./ProfileBG.svelte";
  import ProfileDataView from "./ProfileDataView.svelte";
  import AuthRankDisplay from "./AuthRankDisplay.svelte";
  import RenderHTML from "$lib/utils/RenderHTML.svelte";

  let {
    profile = $bindable(null),
    stats = null,
    error = "",
  }: {
    profile: UserProfile | null;
    stats: {
      likeCount: number;
      favoriteCount: number;
      followerCount: number;
      followingCount: number;
    } | null;
    error: string;
  } = $props();

  // 统计计数（缺省时为 0）
  let likeCount = $derived(stats?.likeCount ?? 0),
    favoriteCount = $derived(stats?.favoriteCount ?? 0),
    followerCount = $derived(stats?.followerCount ?? 0),
    followingCount = $derived(stats?.followingCount ?? 0);

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
  <div class="max-w-full mx-auto">
    <div class="bg-white shadow overflow-hidden border border-gray-100">
      {#if profile.memberArchive?.homepageCover}
        <div
          class="relative -mt-32 md:-mt-16 flex items-center w-full h-64 overflow-hidden"
        >
          <ProfileBG url={profile.memberArchive.homepageCover}></ProfileBG>
        </div>
      {/if}

      <div class="px-6 pb-6">
        <!-- 头像 -->
        <div class="flex flex-row gap-4 relative flex-nowrap">
          <div class="size-16 shrink-0">
            {#if profile.avatar}
              <AvatarImage
                url={profile.avatar}
                virtual={profile.virtualValue}
              />
            {:else}
              <AvatarImage
                url="https://m.xiguacity.cn/icon/new_avatar.png"
                virtual={profile.virtualValue}
              />
            {/if}
          </div>

          <div class="ml-2 mt-0 flex flex-col">
            <h1 class="text-2xl font-bold text-gray-900 items-center gap-2 flex">
              {profile.name}
              <AuthRankDisplay rank={profile.identityAuthRank}></AuthRankDisplay>
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
          class="mt-6 grid grid-cols-4 gap-3 border-t border-gray-100 pt-5 text-center"
        >
        {const {statistics} = profile}
          <ProfileDataView
            name="信誉分"
            data={profile.reputationScore.score}
          />
          <ProfileDataView
            name="作品数"
            data={statistics.homeworkCount}
          />
          <ProfileDataView name="总获赞" data={likeCount} />
          <ProfileDataView
            name="作品获赞"
            data={statistics.likeHomeworkCount}
          />
        </div>

        <!-- 社交统计 -->
        <div
          class="mt-3 grid grid-cols-4 gap-3 border-t border-gray-100 pt-4 text-center"
        >
          <ProfileDataView
            name="被收藏"
            data={favoriteCount}
          />
          <ProfileDataView
            name="评论数"
            data={profile.commentCount}
          />
          <ProfileDataView
            name="粉丝数"
            data={followerCount}
          />
          <ProfileDataView
            name="关注数"
            data={followingCount}
          />
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
      </div>
    </div>

    <!-- 个人简介详情 -->
    <div
      class="mt-4 bg-white rounded-2xl shadow border border-gray-100 px-6 py-5"
    >
      <h2 class="text-lg font-semibold text-gray-900 mb-4">个人介绍</h2>
      <div class="space-y-4 text-sm">
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
        {#if profile.extraInfo.selfIntroduction}
          <RenderHTML text={profile.extraInfo.selfIntroduction}></RenderHTML>
        {/if}
      </div>
    </div>
  </div>
{/if}
