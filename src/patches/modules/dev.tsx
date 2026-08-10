import type {Patch} from "../../types/patches";
import {BetterDiscord} from "@shared/*";
import BadgesStore from "../../global/stores/BadgesStore.tsx";

export default {
    name: 'dev',
    apply(finale: any, patcher: typeof BetterDiscord.Patcher) {
        const module = BetterDiscord.Webpack.getBySource(".SENT_BY_SOCIAL_LAYER_INTEGRATION)?")

        patcher.after(module.Ay, "type", (_,args,res) => {
            const user = args[0].message.author

            if (!res.props.badges.find(x => x.key.includes("yabd")) && (BadgesStore.check(user.id) || BadgesStore.isImportant(user.id))) {
                res.props.badges.push(<img key={"yabd-badge"} height={"16px"} width={"16px"} src={BadgesStore.returnRespondingBadge(user.id).iconSrc}/>)
            }

            return res
        })
    }
} as Patch