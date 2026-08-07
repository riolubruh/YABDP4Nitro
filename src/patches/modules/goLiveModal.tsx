import {BetterDiscord} from "@shared/*";
import {findMangledName} from "@utils/*";

const {React} = BetterDiscord;


export default {
    name: "goLiveModal",
    description: "Streaming modal customization.",
    ids: undefined,
    waitFor: [BetterDiscord.Webpack.Filters.bySource('GO_LIVE_MODAL_V2', 'getUseSystemScreensharePicker', 'canStreamQuality')],
    apply(finale, patcher){
        patcher.after(finale.modules[0], "default", (_,[args],ret) => {
            console.log(args);
            console.log(ret);

        })
    }
}