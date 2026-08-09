import {BetterDiscord} from "@shared/*";
import {AccentColors, CustomPFP} from "../../ui";
import {getKey, wpGet} from "../../global/webpack";
import {styled} from "@utils/*";

const {React} = BetterDiscord;

const GLOBAL_FILTER = BetterDiscord.Webpack.Filters.bySource(".RP.ACTIVITY?(0,");

const Margin = styled.div({
    marginBottom: "10px"
})

function CustomSettingsTab()
{
    return <Margin>
        <AccentColors />
        <CustomPFP/>
    </Margin>
}

export default {
    name: "User Profile V2",
    description: "skibidi toilet",
    ids: undefined,
    waitFor: [GLOBAL_FILTER],
    apply(finale, patcher) {
        const TabBarInjectLocation = wpGet(GLOBAL_FILTER, {raw:true}).declarations
        const module = getKey(TabBarInjectLocation, BetterDiscord.Webpack.Filters.byStrings(".RP.ACTIVITY?(0,"));
        const tabSectionReturn = getKey(TabBarInjectLocation, BetterDiscord.Webpack.Filters.byStrings(".section==="));

        patcher.after(module.module, module.key, (a,[args],callback) => {
            if (args.section == "YABDP4Nitro") {
                return <CustomSettingsTab/>
            }

            return callback
        });

        patcher.before(tabSectionReturn.module, tabSectionReturn.key, (a,[args],res) => {
            if (args?.items && args.items.find(x => x.text.includes("YABD"))) return;

            args.items.push({
                text: "YABDP4Nitro",
                section: "YABDP4Nitro",
            })
        })
        return;
    }
}