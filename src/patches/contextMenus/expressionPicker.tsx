import {BetterDiscord} from "@shared/*";
import {getEmojiUrl} from "@utils/*";

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
        }

        function openUrl(){
            window.open(src);
        }

        const MenuItem = <BetterDiscord.ContextMenu.Item
            label={"Open URL"}
            id={"yabd-open-url-expression-picker"}
            action={openUrl}
        />;

        res.props.children.props.children.push(MenuItem);
    }
}