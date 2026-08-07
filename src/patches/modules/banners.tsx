import {BetterDiscord} from "@shared/";
import UserBackgroundStore from "../../global/stores/UserBackgroundStore.ts";
import {getBannerUrl, getRevealedText} from "@utils/*";
import SettingsStore from "../../global/stores/SettingsStore.ts";


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

                if (UserBackgroundStore.hasHash(props.user.id))
                {
                    c.props.bannerSrc = getBannerUrl(props.user.id);
                }

                unpatch();
            });
            return ret;
        });
    }
}