import {BetterDiscord} from "@shared/*";
import {findMangledName, getBannerUrl} from "@utils/*";
import SettingsStore from "../../global/stores/SettingsStore.ts";
const {React} = BetterDiscord;


export default {
    name: "fakeBanners",
    description: "3y3 banners",
    ids: undefined,
    waitFor: [BetterDiscord.Webpack.Filters.bySource("getSelectedParticipant","CHANNEL_CALL_POPOUT",'avatarDecoration','backgroundSrc','getAvatarURL')],
    apply(finale, patcher){
        patcher.instead(finale.modules[0], findMangledName(finale.modules[0], x=>x.toString?.().includes?.("getSelectedParticipant"), "UserCallTile"), (_,[args], ogFunction) => {
            let ret = ogFunction(args);

            const bannerUrl = getBannerUrl(args.participant.id);
            const callTileBackgroundEnabled = SettingsStore.get("voiceTileBannerBackground");

            if(!bannerUrl || !callTileBackgroundEnabled) return;

            ret.props.children = React.cloneElement(ret.props.children, {
                style: {
                    backgroundImage: `url('${bannerUrl}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat'
                }
            });
            return ret;
        });
    }
}