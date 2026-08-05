import {BetterDiscord} from "@shared/*";
import {EMOJI_ID_FROM_URL_REGEX, EMOJI_PREFIX} from "@utils/*";
import SettingsStore from "../../global/stores/SettingsStore.ts";
const {React} = BetterDiscord;

const MessageEmoji = BetterDiscord.Webpack.getByStrings(',nudgeAlignIntoViewport:!0,position:','jumboable?', {searchExports: true});

export default {
    name: "Render Message",
    description: "Replaces hyperlinked emojis with fakemoji.",
    ids: undefined, // array of entry ids
    waitFor: [BetterDiscord.Webpack.Filters.bySource(".SEND_FAILED,")], // filters to wait for.
    apply(finale, patcher) {
        const inlineFakemojiEnabled = SettingsStore.get("fakeInlineVencordEmotes");
        if(!inlineFakemojiEnabled) return;

        const mod = Object.values(finale.modules[0]).find(o => typeof o === "object");

        patcher.before(mod, "type", (_: any, [args]: any) => {
            for(let i = 0; i < args.content.length; i++) {
                let contentItem = args.content[i];
                if(!contentItem?.props?.title || !contentItem?.props?.href.startsWith(EMOJI_PREFIX) || contentItem?.props?.href === contentItem?.props?.title) continue;

                const emojiName = contentItem.props?.children[0]?.props?.children ? contentItem.props?.children[0]?.props?.children : "unknownEmoji";

                const emojiElem = <MessageEmoji
                    node={{
                        name: `:${emojiName}:`,
                        src: contentItem.props.href,
                        type: "emoji",
                        emojiId: contentItem.props.href.match(EMOJI_ID_FROM_URL_REGEX).find(Boolean),
                        animated: true,
                        jumboable: false
                    }}
                    channelId={args.message.channel_id}
                    messageId={args.message.id}
                    enableClick={true}
                />

                args.content[i] = emojiElem;
            }
        });
    }
}