import {BetterDiscord} from "@shared/";
import UserBackgroundStore from "../../global/stores/UserBackgroundStore.ts";
import {getBannerUrl, getRevealedText, secondsightifyEncodeOnly, styled} from "@utils/*";
import SettingsStore from "../../global/stores/SettingsStore.ts";
import BadgesStore from "../../global/stores/BadgesStore.tsx";
import {Icon} from "@iconify/react";
import {GlobalModules} from "@global/*";
import {wpGetByKeys} from "../../global/webpack";
const {UserStore} = BetterDiscord.Webpack.Stores;

import {
    extractDisplayNameStyles,
    extractDecoration,
    extractNameplate,
    extractProfileEffects,
    extractProfileFrame,
    extractProfilePicture,
    containsProfileV2,
    containsProfileEffects,
    containsProfileFrame
} from "../../global/shared/regexHelpers.ts";

const TopLeft = styled.div({zIndex: "100", position: 'absolute', padding: '10px'})
const ModalModule = wpGetByKeys(["Modal"]);

function Debug({user}: {user: User}) {
    const revealedText = getRevealedText(user.id);
    const decorationRevealed = getRevealedText(user.id, `\uDB40\uDC2F\uDB40\uDC61`);
    const nameplateRevealed = getRevealedText(user.id, `\uDB40\uDC6E\uDB40\uDC7B`);
    const pfpRevealed = getRevealedText(user.id, `\uDB40\uDC50\uDB40\uDC7B`);
    const dnsRevealed = getRevealedText(user.id, `\uDB40\uDC53\uDB40\uDC7B`);

    const data = {
        hasBanner: UserBackgroundStore.hasHash(user.id),
        url: UserBackgroundStore.get(user.id),
        isImportant: BadgesStore.isImportant(user.id),
        revealedText,
        regexMatches: {
            displayNameStyles: extractDisplayNameStyles(dnsRevealed),
            decoration: extractDecoration(decorationRevealed),
            nameplate: extractNameplate(nameplateRevealed),
            profilePicture: extractProfilePicture(pfpRevealed),
            profileEffects: containsProfileEffects(revealedText) ? extractProfileEffects(revealedText) : null,
            profileFrame: containsProfileFrame(revealedText) ? extractProfileFrame(revealedText) : null,
            profileV2: containsProfileV2(revealedText)
        },
        rawRevealedTexts: {
            dns3y3: dnsRevealed,
            decor3y3: decorationRevealed,
            nameplate3y3: nameplateRevealed,
            pfp3y3: pfpRevealed,
            general3y3: revealedText
        },
        badge: BadgesStore.check(user.id) ? BadgesStore.returnRespondingBadge(user.id).id : "not known user"
    }

    function OpenModal() {
        GlobalModules.ModalModule.openModal(props => {
            return <ModalModule.Modal size={"lg"} title={"Debug"} {...props}>
                <pre style={{
                    color: '#d4d4d4',
                    padding: '16px',
                    borderRadius: '8px',
                    overflow: 'auto',
                    maxHeight: '70vh',
                    fontSize: '24px',
                    lineHeight: '1.5',
                    fontFamily: 'monospace',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word'
                }}>
                    {JSON.stringify(data, null, 2)}
                </pre>
            </ModalModule.Modal>
        })
    }

    return <TopLeft>
        <Icon icon={"mdi:bug"} width={"24px"} color={"white"} onClick={OpenModal} />
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