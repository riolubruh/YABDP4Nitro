import {BetterDiscord} from "@shared/*";
import {getKey, wpGet} from "../../global/webpack";
const {React} = BetterDiscord;

const GLOBAL_FILTER = BetterDiscord.Webpack.Filters.bySource('originGuildId', 'initialTabSection', 'UserProfileModalV2', 'profileFrameOverride');


export default {
    name: "User Profile V2",
    description: "skibidi toilet",
    ids: undefined,
    waitFor: [GLOBAL_FILTER],
    apply(finale, patcher) {
        const module = getKey(wpGet(GLOBAL_FILTER, {raw:true}).declarations, BetterDiscord.Webpack.Filters.bySource('originGuildId', 'initialTabSection', 'UserProfileModalV2', 'profileFrameOverride'));
        console.log(module);
        return;

        patcher.after(module, key, (_, props, res) => {
            console.log(props);
            console.log(res);
        });
    }
}