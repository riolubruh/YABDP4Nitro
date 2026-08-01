import {BetterDiscord} from "@global/*";
import UserBackgroundStore from "../../global/stores/UserBackgroundStore.ts";
import {getRevealedText} from "@utils/*";
import SettingsStore from "../../global/stores/SettingsStore.ts";

const BANNER_REGEX = /B\{[^}]*?\}/;

export default {
    name: "fakeBanners",
    description: "3y3 banners",
    ids: undefined,
    waitFor: [BetterDiscord.Webpack.Filters.bySource("backgroundColor:\"COMPLETE\"===")],
    mangled: {
        renderBanner: x => x?.toString?.()?.includes?.("canUsePremiumProfileCustomization")
    },
    apply(finale, patcher) {
        patcher.after(finale.mangled, "renderBanner", (_: any, [props]: any, ret: any) => {
            if (!SettingsStore.get("fakeProfileBanners")) return ret;

            const unpatch = patcher.after(ret, 'type', (a, b, c) => {
                const parsed = getRevealedText(props.user.id);
                const match = parsed?.match(BANNER_REGEX)?.[0];
                const matched = match?.slice(2, -1);

                c.props.bannerSrc = matched
                    ? `https://i.imgur.com/${matched}`
                    : UserBackgroundStore.format(props.user.id);

                unpatch();
            });
            return ret;
        });
    }
}