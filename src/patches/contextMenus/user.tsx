import {BetterDiscord} from "@shared/*";
import {CloseAllContextMenus} from "@global/*";
import {Icon} from "@iconify/react";
import {ContextMenuLabel, ContextMenuWrapper} from "@utils/*";
import IgnoreStore from "../../global/stores/IgnoreStore.tsx";

export default {
    id: "user-context",
    callback: (res, props) => {
        const user = props.user;
        const isNitroIgnored = IgnoreStore.isIgnored(user.id, "nitro");
        const isEncodingIgnored = IgnoreStore.isIgnored(user.id, "encoding");

        const NitroItem = (
            <BetterDiscord.ContextMenu.Item
                onClose={CloseAllContextMenus}
                action={() => IgnoreStore.toggleIgnored(user.id, "nitro")}
                leadingAccessory={{
                    type: "icon",
                    icon: () => <Icon width={"22"} icon={"solar:gift-bold"}/>,
                }}
                label={
                    <ContextMenuWrapper>
                        <ContextMenuLabel/>
                        <span>{isNitroIgnored ? "Unignore" : "Ignore"} Nitro Customizations</span>
                    </ContextMenuWrapper>
                }
                id={"yabdp4nitro-ignore-nitro"}
            />
        );

        const EncodingItem = (
            <BetterDiscord.ContextMenu.Item
                onClose={CloseAllContextMenus}
                action={() => IgnoreStore.toggleIgnored(user.id, "encoding")}
                leadingAccessory={{
                    type: "icon",
                    icon: () => <Icon width={"22"} icon={"solar:code-bold"}/>,
                }}
                label={
                    <ContextMenuWrapper>
                        <ContextMenuLabel/>
                        <span>{isEncodingIgnored ? "Unignore" : "Ignore"} 3y3 Encoding</span>
                    </ContextMenuWrapper>
                }
                id={"yabdp4nitro-ignore-encoding"}
            />
        );

        const IgnoreGroup = (
            <BetterDiscord.ContextMenu.Item
                id={"yabdp4nitro-ignore-group"}
                leadingAccessory={{
                    type: "icon",
                    icon: () => <Icon width={"22"} icon={"proicons:dark-theme"}/>,
                }}
                label={
                    <ContextMenuWrapper>
                        <ContextMenuLabel/>
                        <span>Ignore Customizations</span>
                    </ContextMenuWrapper>
                }
            >
                {NitroItem}
                {EncodingItem}
            </BetterDiscord.ContextMenu.Item>
        );

        res.props.children.push([IgnoreGroup]);
    }
}