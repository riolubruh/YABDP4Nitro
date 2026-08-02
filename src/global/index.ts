import {wpGetBulkKeyed} from "./webpack";
const DefaultOptions = {
    options: {
        searchExports: true
    }
}

export const GlobalModules = wpGetBulkKeyed({
    Typing: {
        filter: BetterDiscord.Webpack.Filters.byKeys("startTyping")
    },
    Endpoints: {
        filter: x => x.STORE_LAYOUT && x.USER_ACTIVITY_SUBSCRIBE,
        ...DefaultOptions
    },
    Dispatcher: {
        filter: BetterDiscord.Webpack.Filters.byStoreName("A"),
        // A is faster than UserStore
        ...DefaultOptions,
        options: {
            key: "_dispatcher",
        }
    },
    HTTP: {
        filter: m => typeof m === "object" && m.del && m.put,
        ...DefaultOptions
    },
    Gateway: {
        filter: BetterDiscord.Webpack.Filters.byStoreName("GatewayConnectionStore"),
    },
    Flux: {
        filter: BetterDiscord.Webpack.Filters.bySource("OfflineCacheStore"),
        options: {
            key: "Ay"
        }
    },
    Intl: {
        filter: BetterDiscord.Webpack.Filters.byKeys("intl")
    },
    ModalModule: {
        filter: BetterDiscord.Webpack.Filters.byKeys("openModal")
    },
    SimpleMarkdownWrapper: {
        filter: m => m.reactParserFor,
    },
    AssetModule: {
        filter: BetterDiscord.Webpack.Filters.bySource("ApplicationAssetUtils"),
        map: {
            getAssetImage: BetterDiscord.Webpack.Filters.byStrings(".TWITCH?null"),
            getAssetImageId: BetterDiscord.Webpack.Filters.byStrings(".serialize(t)"),
            fetchApplicationAssets: BetterDiscord.Webpack.Filters.byStrings("APPLICATION_ASSETS_UPDATE"),
            getAssetImages: BetterDiscord.Webpack.Filters.byStrings(`.startsWith("http:")`)
        }
    },
    Lodash: {
        filter: BetterDiscord.Webpack.Filters.bySource("=\"Expected a function\","),
    }
})