import {BetterDiscord} from "@shared/*";
import GoLiveStore from "../../global/stores/GoLiveStore.ts";
import {GlobalModules} from "@global/*";
import {wpGetByKeys} from "../../global/webpack";
import {styled} from "@utils/*";
import SettingsStore from "../../global/stores/SettingsStore.ts";

const {React, Components} = BetterDiscord;
const { ApplicationStreamingSettingsStore } = BetterDiscord.Webpack.Stores;

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
    const [start, dispatch] = BdApi.Webpack.getById(477156, {raw: true}).declarations.eG();
    console.log(start, dispatch)

    const state = BetterDiscord.Hooks.useStateFromStores([ApplicationStreamingSettingsStore], () => ApplicationStreamingSettingsStore.getState())

    const [data, setData] = React.useState(() => SettingsStore.getAll());

    const commit = (key, value) => {
        SettingsStore.set(key, value);
        setData(prev => ({...prev, [key]: value}));
        forceQuality(key === "CustomFPS" ? "set_fps" : "set_resolution");
    };

    const applyMode = (patch) => {
        Object.entries(patch).forEach(([key, value]) => SettingsStore.set(key, value));
        setData(prev => ({...prev, ...patch}));
        forceQuality("set_resolution");
        forceQuality("set_fps");
    };

    const fields = [
        {key: "CustomFPS", label: "FPS"},
        {key: "CustomResolution", label: "Resolution"},
        {key: "maxBitrate", label: "Max Bitrate"},
        {key: "minBitrate", label: "Min Bitrate"},
        {key: "targetBitrate", label: "Target Bitrate"},
        {key: "voiceBitrate", label: "Voice Bitrate"},
    ];

    return (
        <ModalModule.Modal {...props} onClose={onClose} title="YABDP4Nitro Configuration">
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
    const dispatch = BetterDiscord.React.useContext(
        BdApi.Webpack.getById(477156, {raw: true}).declarations.eL
    );

    const forceQuality = (type) => {
        const config = GoLiveStore.getConfig();
        dispatch({type: type, resolution: config.resolution, fps: config.fps});
    };

    const openContextMenu = (event) => {
        BdApi.ContextMenu.open(
            event,
            BdApi.ContextMenu.buildMenu([
                {
                    label: "Configure Stream Settings",
                    action: () => openConfigModal(forceQuality),
                },
                {
                    label: "Force Apply Resolution",
                    action: () => forceQuality("set_resolution"),
                },
                {
                    label: "Force Apply FPS",
                    action: () => forceQuality("set_fps"),
                },
            ])
        );
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
                tooltip={"YABDP4Nitro Configuration"}
                tooltipPosition={"top"}
                onClick={() => openConfigModal(forceQuality)}
                onContextMenu={openContextMenu}
                key={"balls-2"}
                icon={() => <AdminIcon/>}
            />
        </div>
    );
}

export default {
    name: "goLiveModal",
    description: "Streaming modal customization.",
    ids: undefined,
    waitFor: [BetterDiscord.Webpack.Filters.bySource('GO_LIVE_MODAL_V2', 'getUseSystemScreensharePicker', 'canStreamQuality')],
    apply(finale, patcher) {
        this._removeInterceptor = GlobalModules.Dispatcher.addInterceptor((action) => {
            const config = GoLiveStore.getConfig();

            if (action?.type === "MEDIA_ENGINE_SET_GO_LIVE_SOURCE" && action.settings?.qualityOptions != null) {
                action.settings.qualityOptions.resolution = config.resolution;
                action.settings.qualityOptions.frameRate = config.fps;
            }

            if (action?.type === "STREAM_UPDATE_SETTINGS") {
                action.resolution = config.resolution;
                action.frameRate = config.fps;
            }

            return false;
        });

        const validatorMod = BdApi.Webpack.getById(327649, {raw: true});
        patcher.instead(validatorMod.declarations, "o", () => true);

        patcher.after(finale.modules[0], "default", (_, [args], ret) => {
            const footer = BetterDiscord.Utils.findInTree(ret, x => String(x?.className).startsWith("footerContent"));
            if (!footer) return ret;

            const doesExist = BetterDiscord.Utils.findInTree(footer, x => String(x?.key).includes("gay"));
            if (!doesExist)
                footer.children[1].props.children.push(<CustomFooter key="yabd-is-gay"/>);

            const originalChildren = footer.children;

            footer.children = (
                <FooterColumn>
                    <FooterRow>
                        {originalChildren}
                    </FooterRow>
                </FooterColumn>
            );
            return ret;
        });
    },
}