import {BetterDiscord} from "@shared/*";
import {AccentColors, AvatarDecorations, CustomBanner, CustomPFP, DisplayNameStyle, ProfileEffects} from "../../ui";
import {getKey, wpGet, wpGetProxy} from "../../global/webpack";
import {copyToClipboard, secondsightifyEncodeOnly, styled} from "@utils/*";
import {SepWithText} from "../../ui/Sep.tsx";
import ShopCollectiblesStore from "../../global/stores/ShopCollectiblesStore.tsx";
import BadgesStore from "../../global/stores/BadgesStore.tsx";
import SettingsStore from "../../global/stores/SettingsStore.ts";

const {React, Components} = BetterDiscord;
const {UserStore} = BetterDiscord.Webpack.Stores

const GLOBAL_FILTER = BetterDiscord.Webpack.Filters.bySource(".RP.ACTIVITY?(0,");

const Margin = styled.div({
    marginBottom: "-50px"
})

const Scroller = styled.div({
    overflowY: "scroll",
    scrollbarWidth: "none"
})

/*function DisplayProducts() {
    const decorations = ShopCollectiblesStore.getAvatarDecorations("1212565175790473246")

    return <div style={{display: "flex", justifyContent: "space-between"}}>
        {decorations?.map(decoration => <div key={"nased"} style={{maxHeight: "200px", maxWidth: "200px"}}>
            <ProductDisplayer.A key={`based-da-${decoration.sku_id}`} skuId={decoration.sku_id} isCardHovered={true}/>
        </div>)}
    </div>
}*/

function CustomSettingsTab() {
    const isDeveloper = BadgesStore.isImportant(UserStore.getCurrentUser().id)
    const [text, setText] = React.useState<string>("")

    return <Scroller>
        <SepWithText>Custom Theme Colors</SepWithText>
        <AccentColors/>
        <SepWithText>Custom PFP</SepWithText>
        <CustomPFP/>
        <SepWithText>Custom Banner</SepWithText>
        <CustomBanner/>
        <SepWithText>Display Name Style</SepWithText>
        <DisplayNameStyle/>
        <SepWithText>Profile Effect</SepWithText>
        <ProfileEffects/>
        <SepWithText>Avatar Decoration</SepWithText>
        <AvatarDecorations/>
        {isDeveloper ? <div>
            <SepWithText>Developer</SepWithText>
            <Components.TextInput value={text} onChange={e => setText(e)}/>
            <Components.Button onClick={() => {
                copyToClipboard(secondsightifyEncodeOnly(text), "[DEV] Copied uwu!")
            }}>Encode</Components.Button>
        </div> : null}
    </Scroller>
}

const GoLiveModalV2UpsellMod = BdApi.Webpack.getBySource("profile-editing-nameplate-error", {raw:true});

export default {
    name: "User Profile V2",
    description: "skibidi toilet",
    ids: undefined,
    waitFor: [GLOBAL_FILTER],
    apply(finale, patcher) {
        const TabBarInjectLocation = wpGet(GLOBAL_FILTER, {raw: true}).declarations
        const module = getKey(TabBarInjectLocation, BetterDiscord.Webpack.Filters.byStrings(".RP.ACTIVITY?(0,"));
        const tabSectionReturn = getKey(TabBarInjectLocation, BetterDiscord.Webpack.Filters.byStrings(".section==="));

        const upsell = getKey(GoLiveModalV2UpsellMod.declarations, BetterDiscord.Webpack.Filters.byStrings("nitro-pink"));

        patcher.after(module.module, module.key, (a, [args], callback) => {
            if (args.section == "YABDP4Nitro") {
                return <CustomSettingsTab/>
            }

            return callback
        });

        patcher.before(tabSectionReturn.module, tabSectionReturn.key, (a, [args], res) => {
            if (args?.displayProfile?.userId != UserStore.getCurrentUser().id) return res;
            if (args?.items && args.items.find(x => x.text.includes("YABD"))) return;

            args.items.push({
                text: "YABDP4Nitro",
                section: "YABDP4Nitro",
            })
        })

        patcher.instead(upsell.module, upsell.key, (_, args, originalFunction) => {
            const upsellRemovalEnabled = SettingsStore.get("removeProfileUpsell");
            if(upsellRemovalEnabled) return null;
            return originalFunction.apply(args);
        });
        return;
    }
}