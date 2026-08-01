import {BetterDiscord} from "@global/*";

export default {
    name: "fakeBanners",
    description: "3y3 banners",
    ids: undefined, // array of entry ids
    waitFor: [BetterDiscord.Webpack.Filters.bySource('bannerSrc', 'showGifTag', 'backgroundImage')], // filters to wait for.
    apply(finale, patcher){
        console.log(finale);
        patcher.after(finale, "A", (_: any, __: any, ret: NodeModule) => {
            console.log(ret);
        });
    }
}