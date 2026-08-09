import { writable } from "svelte/store";

export const user = writable<SelfUser>({ loggedIn: false });
