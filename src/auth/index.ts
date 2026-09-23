import {BetterDiscord} from "@shared/*";
import SettingsStore from "../global/stores/SettingsStore.ts";

const OAuth = BetterDiscord.Webpack.getByKeys("openOAuth2Modal")

const CLIENT_ID = "1545094508730126366"

export function startAuth() {
    return new Promise<void>((resolve, reject) => {
        OAuth.openOAuth2Modal({
            clientId: CLIENT_ID,
            scopes: ["identify"],
            responseType: "code",
            permissions: 0n,
            cancelCompleteFlow: false,
            callback: async function(response) {
                try {
                    const url = new URL(response.location);
                    url.searchParams.set("client", "betterdiscord");
                    const req = await BetterDiscord.Net.fetch(url);
                    if (!req?.ok) {
                        throw new Error(`Request failed with status ${req?.status}`);
                    }
                    const token = await req.text();
                    SettingsStore.set("oAuthToken", token);
                    resolve();
                } catch (e) {
                    console.error("Failed to complete Discord auth", e);
                    reject(e);
                }
            },
            onCloseCallback: function() {
                reject(new Error("Authorization cancelled."));
            }
        });
    });
}