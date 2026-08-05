<script lang="ts">
  import LoginModal from "$lib/auth/LoginModal.svelte";
  import { user } from "./userStore";

  let openLogin = $state(false);
</script>

{#if !$user.loggedIn}
  <button
    class="border-green-400 border-2 rounded-full w-auto h-12 pl-6 pr-6 text-2xl text-green-400 cursor-pointer"
    onclick={() => (openLogin = true)}
  >
    login
  </button>
  {#if openLogin}
    <LoginModal
      onclose={() => {
        openLogin = false;
      }}
    ></LoginModal>
  {/if}
{/if}
