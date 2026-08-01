import {BetterDiscord} from "@global/*";
import UserBackgroundStore from "../../global/stores/UserBackgroundStore.ts";
import React from "react";


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
            patcher.after(ret,'type', (a,b,c) => {
                c.props.bannerSrc = UserBackgroundStore.format(props.user.id)
            })
            return ret;
        });
    }
}