import {BetterDiscord} from "@shared/*";
import {CloseAllContextMenus} from "@global/*";
import {Icon} from "@iconify/react";
import {ContextMenuLabel, ContextMenuWrapper} from "@utils/*";
import IgnoreStore from "../../global/stores/IgnoreStore.tsx";

export default {
    id: "user-context",
    callback: (res, props) => {
        const user = props.user;
        const isIgnored = IgnoreStore.isIgnored(user.id);

        const Menu = (
            <BetterDiscord.ContextMenu.Item
                onClose={CloseAllContextMenus}
                action={() => IgnoreStore.toggleIgnored(user.id)}
                leadingAccessory={{
                    type: "icon",
                    icon: () => <Icon width={"22"} icon={"proicons:dark-theme"}/>,
                }}
                label={
                    <ContextMenuWrapper>
                        <ContextMenuLabel/>
                        <span>{isIgnored ? "Unignore" : "Ignored"} Customizations</span>
                    </ContextMenuWrapper>
                }
                id={"yabdp4nitro-download-attachments"}
            />
        );

        const Sep = <BetterDiscord.ContextMenu.Separator/>;
        res.props.children.push([Menu, Sep]);
    }
}