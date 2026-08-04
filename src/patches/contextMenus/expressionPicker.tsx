import {BetterDiscord} from "@shared/*";
import {ContextMenuLabel, ContextMenuWrapper, getEmojiUrl} from "@utils/*";
import {Icon} from "@iconify/react";

const {EmojiStore} = BetterDiscord.Webpack.Stores;

const EMOJI_ID_REGEX = /(?<=emojis\/)(\d+?)(?=\.(png|webp|gif|avif|jpg|jpeg))/;

export default {
    id: "expression-picker",
    callback(res, props) {
        let src = props?.target?.src ? props?.target?.src : props?.target?.firstChild?.src;
        if(!src) return;
        let emojiId = src.match(EMOJI_ID_REGEX)?.find?.(Boolean);
        if(emojiId){
            let emoji = EmojiStore.getCustomEmojiById(emojiId);
            emoji && (src = getEmojiUrl(emoji, 4096));
        }else{
            let url = new URL(src);
            url.searchParams.set("size", 4096);
            src = url.toString();
        }

        function openUrl(){
            window.open(src);
        }

        const MenuItem = <BetterDiscord.ContextMenu.Item
            icon={<Icon width={"22"} icon={"mdi:external-link"}/>}
            label={
                <ContextMenuWrapper>
                    <ContextMenuLabel/>
                    <span>Open {emojiId ? "Emoji" : "Sticker"} URL</span>
                </ContextMenuWrapper>
            }
            id={"yabd-open-url-expression-picker"}
            action={openUrl}
        />;

        res.props.children.props.children.push(MenuItem);
    }
}