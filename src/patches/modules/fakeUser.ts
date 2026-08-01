import type {Patch} from "../../types/patches";
import {BetterDiscord} from "@global/*";
import SettingsStore from "../../global/stores/SettingsStore.ts";
import {getRevealedText} from "@utils/*";

const {UserStore} = BetterDiscord.Webpack.Stores;

const DNS_REGEX = /S\{[^}]*?\}/;
const DECOR_REGEX = /\/a\d+/;

function getStyleData(surrogate: string[]) {
    let fontId = Number(surrogate?.[0]);
    let effectId = Number(surrogate?.[1]);
    let color1 = Number(surrogate?.[2]);
    let color2;
    if (surrogate.length >= 4) {
        color2 = Number(surrogate?.[3]);
    }

    return {
        fontId,
        effectId,
        color1,
        color2,
        isNaN: [fontId, effectId, color1, color2].map(id => Number.isNaN(id)).includes(true)
    };
}

export default {
    name: "User Profile",
    description: "Performs fake profile stuffs.",
    ids: undefined, // array of entry ids
    waitFor: [x => x.getUser], // filters to wait for.
    apply(finale, patcher) {
        patcher.after(UserStore, "getUser", (_: any, [userId]: string, ret: User) => {
            const dnsEnabled = SettingsStore.get("displayNameStyles");
            const decorEnabled = SettingsStore.get("fakeAvatarDecorations");

            if (dnsEnabled) {
                const revealedText = getRevealedText(userId, `\uDB40\uDC53\uDB40\uDC7B`);
                const match = revealedText?.match(DNS_REGEX)?.[0]?.slice(2, -1)?.split(",");
                if(match) {
                    const styleData = getStyleData(match);

                    styleData && Object.defineProperty(ret, "displayNameStyles", {
                        value: {
                            fontId: styleData.fontId,
                            effectId: styleData.effectId,
                            colors: [styleData.color1, (styleData?.color2 ? styleData.color2 : null)].filter(Boolean),
                        },
                        enumerable: true,
                        writable: true,
                        configurable: true,
                    })
                }
            }
            if(decorEnabled){
                const revealedText = getRevealedText(userId, `\uDB40\uDC2F\uDB40\uDC61`);
                const skuId = revealedText?.match(DECOR_REGEX)?.[0]?.slice(2);
                console.log(skuId);
                if(skuId){
                    ret.avatarDecorationData = {
                        skuId: skuId
                    };
                }
            }
        })
    }
} as Patch;