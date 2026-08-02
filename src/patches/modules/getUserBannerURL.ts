import type {Patch} from "../../types/patches";

export default {
    name: "getUserBannerURL",
    description: "Force animate the user banner URL",
    waitFor: [x => x.getEmojiURL],
    apply(finale: any, patcher: any) {
        const AvatarDefaults = finale.modules[0]

        patcher.before(AvatarDefaults,"getUserBannerURL", (_, args) => {
            args[0].canAnimate = true;
        })
    }
} as Patch