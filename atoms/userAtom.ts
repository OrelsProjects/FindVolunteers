import { RecoilState, atom } from "recoil";

export const userState: RecoilState<any> = atom<any>({
  key: "userState",
  default: null,
});
