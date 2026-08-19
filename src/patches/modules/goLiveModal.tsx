import {BetterDiscord} from "@shared/*";
import GoLiveStore from "../../global/stores/GoLiveStore.ts";
import {GlobalModules} from "@global/*";
import {getKey, wpFilter, wpGet, wpGetByKeys, wpGetProxy} from "../../global/webpack";
import {styled} from "@utils/*";
import SettingsStore from "../../global/stores/SettingsStore.ts";

const {React, Components} = BetterDiscord;
const {ApplicationStreamingSettingsStore} = BetterDiscord.Webpack.Stores;

const FooterColumn = styled.div({
    display: "flex",
    flexDirection: "column",
    width: "100%",
});

const FooterRow = styled.div({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
});

const ModalBody = styled.div({
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px",
    padding: "16px",
});

const FieldWrapper = styled.div({
    display: "flex",
    flexDirection: "column",
    gap: "4px",
});

const FieldLabel = styled.label({
    fontSize: "12px",
    fontWeight: 600,
    color: "var(--text-muted)",
    textTransform: "uppercase",
});

const ModeRow = styled.div({
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    padding: "0 16px 16px 16px",
});

const ToggleRow = styled.div({
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    padding: "0 16px 16px 16px",
});

const AdminIcon = () =>
    <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path fill="currentColor"
              d="M12 12h7c-.53 4.11-3.28 7.78-7 8.92zH5V6.3l7-3.11M12 1L3 5v6c0 5.55 3.84 10.73 9 12c5.16-1.27 9-6.45 9-12V5z"/>
    </svg>;

const IconModule = wpGetByKeys(["Icon", "ChannelIcon"]);
const ModalModule = wpGetByKeys(["Modal"]);

const MODES = [
    {
        label: "4K Mode",
        patch: {CustomResolution: 2160, CustomFPS: 60},
    },
    {
        label: "2K Mode",
        patch: {CustomResolution: 1440, CustomFPS: 60},
    },
    {
        label: "Deez Nutz Mode",
        patch: {CustomResolution: 20, CustomFPS: 60},
    },
    {
        label: "Screen Reader Mode",
        patch: {CustomResolution: 1440, CustomFPS: 15},
    },
];

function ConfigModal({props, onClose, forceQuality}) {
    const data = BetterDiscord.Hooks.useStateFromStores([SettingsStore], () => SettingsStore.getAll())
    const [_, setData] = React.useState(() => SettingsStore.getAll());

    const commit = (key, value) => {
        SettingsStore.set(key, value);
        setData(prev => ({...prev, [key]: value}));
    };

    const applyMode = (patch) => {
        Object.entries(patch).forEach(([key, value]) => SettingsStore.set(key, value));
        setData(prev => ({...prev, ...patch}));

        if ("CustomResolution" in patch) {
            forceQuality("set_resolution", {resolution: patch.CustomResolution});
        }
        if ("CustomFPS" in patch) {
            forceQuality("set_fps", {fps: patch.CustomFPS});
        }
    };

    const fields = [
        {key: "CustomFPS", label: "FPS"},
        {key: "CustomResolution", label: "Resolution"},
        {key: "maxBitrate", label: "Max Bitrate"},
        {key: "minBitrate", label: "Min Bitrate"},
        {key: "targetBitrate", label: "Target Bitrate"},
        {key: "voiceBitrate", label: "Voice Bitrate"},
    ];

    function onApply(){
        forceQuality("set_resolution", {resolution: data.CustomResolution});
        forceQuality("set_fps", {fps: data.CustomFPS});
        forceQuality("set_min_bitrate", {minBitrate: data.minBitrate});
        forceQuality("set_target_bitrate", {targetBitrate: data.targetBitrate});
        forceQuality("set_max_bitrate", {maxBitrate: data.maxBitrate});
        onClose();
    }

    return (
        <ModalModule.Modal actions={[{text:"Cancel", onClick:onClose}, {text:"Apply", onClick: onApply}]} {...props} onClose={onClose} title="YABDP4Nitro Configuration">
            <ModeRow>
                {MODES.map(({label, patch}) => (
                    <Components.Button key={label} onClick={() => applyMode(patch)}>
                        {label}
                    </Components.Button>
                ))}
            </ModeRow>
            <ModalBody>
                {fields.map(({key, label}) => (
                    <FieldWrapper key={key}>
                        <FieldLabel htmlFor={`yabd-${key}`}>{label}</FieldLabel>
                        <Components.NumberInput
                            id={`yabd-${key}`}
                            initalValue={data[key]}
                            value={data[key]}
                            onChange={(val) => commit(key, val)}
                        />
                    </FieldWrapper>
                ))}
            </ModalBody>
        </ModalModule.Modal>
    );
}

function openConfigModal(forceQuality) {
    GlobalModules.ModalModule.openModal(props => (
        <ConfigModal forceQuality={forceQuality} props={props} onClose={props.onClose}/>
    ));
}

function CustomFooter() {
    const StreamingModule = wpGet(wpFilter.bySource("GQgGHISKZ5aYqYeYhX9isDUHGw"), {raw: true})
    const module = getKey(StreamingModule.declarations, BetterDiscord.Webpack.Filters.byStrings(".useContext"))
    const [start, dispatch] = module.module[module.key]()

    const forceQuality = (type, value) => {
        dispatch({type: type, ...value});

        const currentState = ApplicationStreamingSettingsStore.getState();
        ApplicationStreamingSettingsStore.initialize({
            resolution: type == "set_resolution" ? value.resolution : currentState.resolution,
            fps: type == "set_fps" ? value.fps : currentState.fps,
            preset: 3,
            soundshareEnabled: currentState.soundshareEnabled,
        })
    };

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 'var(--radius-sm)',
                backgroundColor: "var(--control-secondary-background-default)",
                borderColor: "var(--control-secondary-border-default)",
                minHeight: "38px",
                minWidth: "38px",
            }}
        >
            <IconModule.Icon
                tooltip={"Configure Stream Settings"}
                tooltipPosition={"top"}
                onClick={() => openConfigModal(forceQuality)}
                key={"balls-2"}
                icon={() => <AdminIcon/>}
            />
        </div>
    );
}

const LIVE_FILTER = BetterDiscord.Webpack.Filters.bySource('GO_LIVE_MODAL_V2', 'getUseSystemScreensharePicker', 'canStreamQuality')

const validatorMod = BetterDiscord.Webpack.getBySource("canStreamWithSettings", {raw: true});

export default {
    name: "goLiveModal",
    description: "Streaming modal customization.",
    ids: [async () => await BetterDiscord.Webpack.waitForModule(BetterDiscord.Webpack.Filters.bySource('allowOneClickGoLive:'), {raw: true}).then(x => x.id)],
    waitFor: [LIVE_FILTER],
    apply(finale, patcher) {
        const mod = getKey(validatorMod.declarations, BetterDiscord.Webpack.Filters.byStrings("canStreamWithSettings"));
        patcher.instead(mod?.module, mod?.key, () => true);

        patcher.after(finale.modules[0], "default", (_, [args], ret) => {
            const removeScreenshareUpsell = SettingsStore.get("removeScreenshareUpsell");
            const footer = BetterDiscord.Utils.findInTree(ret, x => String(x?.className).startsWith("footer"));
            if (!footer) return ret;
            const footerContent = BetterDiscord.Utils.findInTree(footer, x => String(x?.className).startsWith("footerContent"));
            if (!footerContent) return ret;

            if(removeScreenshareUpsell){
                footer.children = footer.children.filter(x=> !x?.props?.className.startsWith("upsell"));
                footerContent.children[1].props.children = footerContent.children[1].props.children.filter(x=> !x?.type?.toString?.()?.includes("pill"));
            }

            if(SettingsStore.get("ResolutionSwapper")){
                const doesExist = BetterDiscord.Utils.findInTree(footerContent, x => String(x?.key).includes("gay"));
                if (!doesExist)
                    footerContent.children[1].props.children.push(<CustomFooter key="yabd-is-gay"/>);

                const originalChildren = footerContent.children;


                footerContent.children = (
                    <FooterColumn>
                        <FooterRow>
                            {originalChildren}
                        </FooterRow>
                    </FooterColumn>
                );
            }

            return ret;
        });
    }
}