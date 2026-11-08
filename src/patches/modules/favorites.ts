import type { Patch } from "../../types/patches";
import { BetterDiscord } from "@shared/";
import SettingsStore from "../../global/stores/SettingsStore.ts";
import {getKey, wpGetByKeys} from "../../global/webpack";

const {Webpack} = BetterDiscord;
const {FavoriteStore} = Webpack.Stores;

// const GLOBAL_FILTER = Webpack.getBySource(".REFERENCE_ORIGINAL)")

enum Channels {
    USER = 1,
    CHANNEL = 0
}

export default {
    name: "User Profile",
    description: "Performs fake profile stuffs.",
    ids: undefined,
    waitFor: [],
    apply(finale, patcher) {
        return;
        const mod = Webpack.getBySource(".REFERENCE_ORIGINAL)",{mapDeclarations: true, map: {
            beforeUpdateAsync: x => String(x).includes(".REFERENCE_ORIGINAL)"),
            updateOrder: x => String(x).match(/null!=.\.position&&\(.\.favoriteChannels\[.\]/)
        }})

        const mod2 = Webpack.getModule(Webpack.Filters.bySource("4tSWQg"),{map: {
            removeFavorite: Webpack.Filters.byStrings("trackAnalytics")
        }})

        console.log(mod);
        const settings = SettingsStore.getAll();
        let fav = settings.favorites;
        const MessageActions = wpGetByKeys(["ensurePrivateChannel"]);

        function toggleFavoritedChannel(id, parentId){
            console.log(id);
            console.log(fav);
            let a = Webpack.Stores.ChannelStore.getChannel(id);
            if (!a) return;

            const doesExist = fav.favoriteChannels?.[id]
            if (!doesExist) {
                fav.favoriteChannels[id] = {
                    id,
                    type: a.type,
                    nickname: undefined,
                    order: -1,
                    parentId: parentId
                }
            } else {
                delete fav.favoriteChannels[id]
            }
        }
        patcher.instead(mod, "beforeUpdateAsync", (_, [channelId, obj, context]) => {

            console.log(channelId[0]);
            console.log(obj);
            toggleFavoritedChannel(channelId[0], obj.parentId);
            Webpack.getBySource(".autoAddJoinedThreads??!1",{raw:true}).declarations.u = fav.favoriteChannels;
            return;
        });

        console.log(mod);
        patcher.instead(mod, "updateOrder", (_, [args]) => {
            for(let i = 0; i < args.length; i++){
                let obj = args[i];
                fav.favoriteChannels[obj.id].order = i
            }
            return;
        });

        patcher.instead(mod2, "removeFavorite", (_, [channelId]) => {
            toggleFavoritedChannel(channelId, null);
            return;
        });

        patcher.instead(FavoriteStore, "getFavorite", (_, [id]) => {
            // @ts-ignore
            return fav.favoriteChannels[id];
        });
        patcher.instead(FavoriteStore, "getFavoriteChannels", () => {
            // Webpack.getBySource(".autoAddJoinedThreads??!1",{raw:true}).declarations.u = fav.favoriteChannels;
            return fav.favoriteChannels;
        });
        patcher.instead(FavoriteStore, "isFavorite", (_, [id]) => {
            // @ts-ignore
            return id && fav.favoriteChannels[id];
        });
        patcher.instead(FavoriteStore, "getFavoritesCount", (_, [id]) => {
            return Object.keys(fav.favoriteChannels).length
        });
        patcher.instead(FavoriteStore, "getFavoritesCountAgainstLimit", (_, [id]) => {
            return 0;
        });
        patcher.instead(FavoriteStore, "hasStoredFavorites", (_, [id]) => {
            return true;
        });
    }
}