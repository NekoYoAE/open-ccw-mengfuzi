import { setToken } from "$lib/api";
import { writable } from "svelte/store";
import { decryptWithPassword, encryptWithPassword } from "$lib/utils/aes";
import { user } from "$lib/user/userStore";
import { communityWeb } from "$lib/api";
import { browser } from "$app/environment";
import { getToken } from "@ccw-api/request";

const ACCOUNTS_KEY = "oc_accounts";
const TOKEN_PREFIX = "oc_token_";
const ACTIVE_KEY = "oc_active_account";

export interface Account {
  name: string;
  createdAt: number;
}

export const token = writable<string>("");

if (browser) {
  const storedToken = sessionStorage.getItem(TOKEN_PREFIX);
  if (storedToken) {
    updateTokenAndUser(storedToken);
  }
}

token.subscribe((token) => {
  if (token && browser) {
    sessionStorage.setItem(TOKEN_PREFIX, token);
  }
});

export async function updateTokenAndUser(newToken: string) {
  setToken(newToken);
  token.set(newToken);
  const { oid, name, avatar } = await communityWeb.getStudentSelfDetail(
    true,
    true,
    [],
  );
  if (oid) {
    user.set({ oid, name, avatar, loggedIn: true });
  }
}

/**
 * 列出所有已注册账号
 */
export function listAccounts(): Account[] {
  const raw = localStorage.getItem(ACCOUNTS_KEY);
  if (!raw) {
    return [];
  }
  try {
    return JSON.parse(raw) as Account[];
  } catch {
    return [];
  }
}

/**
 * 保存账号注册表
 */
function saveAccounts(accounts: Account[]): void {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

/**
 * 添加或更新账号，并加密保存 token
 * @param name 账号名称
 * @param tokenValue 待保存的 token
 * @param pin 用户密码/PIN
 */
export function saveAccount(name: string, tokenValue: string, pin: string) {
  const accounts = listAccounts();
  const existingIdx = accounts.findIndex((a) => a.name === name);

  if (existingIdx >= 0) {
    throw "同名账号已注册";
  } else {
    accounts.push({ name, createdAt: Date.now() });
  }

  saveAccounts(accounts);

  const encrypted = encryptWithPassword(tokenValue, pin);
  localStorage.setItem(TOKEN_PREFIX + name, encrypted);
}

/**
 * 使用密码解密指定账号的 token 并设为活跃账号
 * @param id 账号标识
 * @param pin 用户密码/PIN
 * @returns 解密后的 token，失败返回 null
 */
export async function loadAccount(
  id: string,
  pin: string,
): Promise<string | null> {
  const encrypted = localStorage.getItem(TOKEN_PREFIX + id);
  if (!encrypted) {
    return null;
  }

  try {
    const value = decryptWithPassword(encrypted, pin);
    token.set(value);
    localStorage.setItem(ACTIVE_KEY, id);
    return value;
  } catch {
    return null;
  }
}

/**
 * 移除账号及其加密 token
 * @param name 账号名
 */
export function removeAccount(name: string): void {
  const accounts = listAccounts().filter((a) => a.name !== name);
  saveAccounts(accounts);
  localStorage.removeItem(TOKEN_PREFIX + name);

  if (getActiveAccount() === name) {
    clearToken();
  }
}

/**
 * 获取当前活跃账号 ID
 */
export function getActiveAccount(): string | null {
  return localStorage.getItem(ACTIVE_KEY);
}

/**
 * 清除当前 token 活跃状态
 */
export function clearToken(): void {
  localStorage.removeItem(ACTIVE_KEY);
  token.set("");
}
