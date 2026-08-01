import type {Patch} from "../../types/patches";
import {BetterDiscord} from "@global/*";
import SettingsStore from "../../global/stores/SettingsStore.ts";
const { UserStore } = BetterDiscord.Webpack.Stores;
import {getRevealedText} from "@utils/*";

const DNS_REGEX = /S\{[^}]*?\}/;

function getColorData(surrogate: string[]){
    let fontId = Number(surrogate?.[0]);
    let effectId = Number(surrogate?.[1]);
    let color1 = Number(surrogate?.[2]);
    let color2;
    if(surrogate.length >= 4) {
        color2 = Number(surrogate?.[3]);
    }

    return {fontId, effectId, color1, color2};
}

export default {
    name: "User Profile",
    description: "Performs fake profile stuffs.",
    ids: undefined, // array of entry ids
    waitFor: [ x => x.getUser ], // filters to wait for.
    apply(finale, patcher){
        patcher.after(UserStore, "getUser", (_: any, [userId]: string, ret: User) => {
            const enabled = SettingsStore.get("displayNameStyles");
            if (enabled) {
                const revealedText = getRevealedText(userId, `\uDB40`);
                const match = revealedText.match(DNS_REGEX)?.[0]?.slice(2,-1)?.split(",");
                if(!match) return ret; //merge the getuser patches later mf
                const colorData = getColorData(match);

            }
        }
    }
} as Patch;