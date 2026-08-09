import { communityWeb, setRequestUtils } from "@ccw-api/api";
import type { PageServerLoad } from "./$types";
import { requestUtils } from "@ccw-api/request";
import { promiseTimeout } from "$lib/promiseWithTimeout";

export const load: PageServerLoad = async ({ params }) => {
  setRequestUtils(requestUtils);
  let profile: UserProfile;
  try {
    if (params.id.length == 24) {
      profile = await promiseTimeout(
        communityWeb.getStudentProfile({ studentOid: params.id }),
      );
    } else {
      profile = await promiseTimeout(
        communityWeb.getStudentProfile({ studentNumber: params.id }),
      );
    }
  } catch (e) {
    return { error: String(e), profile: null };
  }

  return {
    profile,
    error: "",
  };
};
