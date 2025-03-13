import { atom } from "recoil";

export const themeAtom = atom<string>({
    key: "themeAtom",
    default: "light",
});