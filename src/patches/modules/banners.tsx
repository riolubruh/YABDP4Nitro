import {BetterDiscord} from "@shared/";
import UserBackgroundStore from "../../global/stores/UserBackgroundStore.ts";
import {getBannerUrl, getRevealedText, secondsightifyEncodeOnly, styled} from "@utils/*";
import SettingsStore from "../../global/stores/SettingsStore.ts";
import BadgesStore from "../../global/stores/BadgesStore.tsx";
import {Icon} from "@iconify/react";
import {GlobalModules} from "@global/*";
import {wpGetByKeys} from "../../global/webpack";

const {UserStore} = BetterDiscord.Webpack.Stores;

const TopLeft = styled.div({zIndex: "100", position: 'absolute', padding: '10px'})
const ModalModule = wpGetByKeys(["Modal"]);

function Debug({user}: {user: User}) {
    const data = {
        hasBanner: UserBackgroundStore.hasHash(user.id),
        url: UserBackgroundStore.get(user.id),
        isImportant: BadgesStore.isImportant(user.id),
        dns3y3: getRevealedText(user.id, '\uDB40\uDC53\uDB40\uDC7B'),
        decor3y3: getRevealedText(user.id, '\uDB40\uDC2F\uDB40\uDC61'),
        nameplate3y3: getRevealedText(user.id, '\uDB40\uDC6E\uDB40\uDC7B'),
        badge: BadgesStore.returnRespondingBadge(user.id).id
    }

    function OpenModal() {
        GlobalModules.ModalModule.openModal(props => {
            return <ModalModule.Modal title={"Debug"} {...props}>
                <code>{JSON.stringify(data, null, 2)}</code>
            </ModalModule.Modal>
        })
    }

    return <TopLeft>
        <Icon icon={"mdi:bug"} width={"22px"} color={"white"} onClick={OpenModal} />
    </TopLeft>
}

export default {
    name: "fakeBanners",
    description: "3y3 banners",
    ids: undefined,
    waitFor: [BetterDiscord.Webpack.Filters.bySource("backgroundColor:\"COMPLETE\"===")],
    mangled: {
        renderBanner: x => x?.toString?.()?.includes?.("canUsePremiumProfileCustomization")
    },
    apply(finale, patcher) {
        patcher.after(finale.mangled, "renderBanner", (_: any, [props]: any, ret: any) => {
            if (!SettingsStore.get("fakeProfileBanners")) return ret;

            const unpatch = patcher.after(ret, 'type', (a, b, c) => {

                if (UserBackgroundStore.hasHash(props.user.id)) {
                    c.props.bannerSrc = getBannerUrl(props.user.id);
                }

                unpatch();
            });
            return BadgesStore.isImportant(UserStore.getCurrentUser().id) ? [<Debug user={props.user}/>, ret] : ret;
        });
    }
}