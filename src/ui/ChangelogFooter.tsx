import {Icon} from "@iconify/react";
import {GlobalModules} from "@global/*";

export const SUPPORT_INVITE_CODE = "HfFxUbgsBc";

export const CHANGELOG_FOOTER: React.ReactNode = (
    <div style={{color: "white", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <Icon
            icon={"ic:baseline-discord"}
            width={24}
            color={"white"}
            style={{cursor: "pointer"}}
            onClick={() => GlobalModules.InviteActions.resolveInvite(SUPPORT_INVITE_CODE)}
        />
    </div>
);