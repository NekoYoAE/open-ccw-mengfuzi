import InteractionIcon from "$lib/assets/interaction.svg";
import ReplyIcon from "$lib/assets/reply.svg";

export const noticeTypes: {
  type: string;
  name: string;
  icon: string;
}[] = [
  { type: "interaction", icon: InteractionIcon, name: "内容互动" },
  { type: "reply", icon: ReplyIcon, name: "回复我的" },
] as const;
