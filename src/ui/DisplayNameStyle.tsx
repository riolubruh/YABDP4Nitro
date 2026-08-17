import {BetterDiscord} from "@shared/";
import {copyToClipboard, secondsightifyEncodeOnly} from "@utils/*";
import {GlobalModules} from "@global/*";
import {wpGet, wpGetByKeys} from "../global/webpack";

const {React, Components} = BetterDiscord;
const EffectText = BetterDiscord.Webpack.getBySource('UserNameWithEffects').A

const {UserStore} = BetterDiscord.Webpack.Stores;

const FONTS = [
    { name: "GG Sans", id: 11 },
    { name: "Tempo", id: 12 },
    { name: "Sakura", id: 3 },
    { name: "Jellybean", id: 4},
    { name: "Modern", id: 6 },
    { name: "Medieval", id: 7},
    { name: "8Bit", id: 8 },
    { name: "Vampyre", id: 10 },
    { name: "Monkey Bars", id: 13},
    { name: "Mainframe", id: 14},
    { name: "Headbang", id: 15},
    { name:"Journal", id: 16 }
];

const EFFECTS = {
    "Solid": [15724529],
    "Gradient": [2797222, 16762000],
    "Neon": [6888941],
    "Toon": [15999128],
    "Pop": [1036166],
    // "Gummy": [15724529, 2797222, 16762000, 15999128, 1036166] // for fuck sake...
    // "Prism": [15724529, 2797222, 16762000, 15999128, 1036166] // for fuck sake...

    // thank you, Discord:tm:
    // Not affiliated with Discord Inc.
    // "Discord" is a registered trademark of Discord Inc.
}

function FontButton({onClick, selected, fontFamily: font}) {
    return <Components.Button
        style={{
            fontFamily: font.name,
            color: 'var(--text-default)',
            backgroundColor: "var(--control-secondary-background-default)",
            border: selected ? "1px solid white" : "none",
            margin: "0px 5px 5px 0px",
            display: "inline-block",
        }}
        onClick={onClick}
    >{font.name}</Components.Button>
}

function EffectButton({onClick, selected, children, data, colors}) {
    return <Components.Button
        style={{
            backgroundColor: "var(--control-secondary-background-default)",
            color: 'var(--text-default)',
            border: selected ? "1px solid white" : "none",
            margin: "0px 5px 5px 0px",
            display: "inline-block",
        }}
        onClick={onClick}
    ><EffectText
        displayNameStyles={{colors: data.effectColors, fontId: 1, effectId: data.effectId + 1}}
        effectDisplayType={data.effectId + 1}
        inProfile={true}
        loop={true}
        userName={data.effectName}
    /></Components.Button>
}

const ModalModule = wpGetByKeys(["Modal"]);

export default function OpenDisplayNameStyleModalButton() {
    function handleClick() {
        GlobalModules.ModalModule.openModal(props => {
            return <ModalModule.Modal notice={{
                type: "warning",
                message: GlobalModules.SimpleMarkdownWrapper.parse("`Prism` and `Gummy` are both in rollout, we have implemented `Monkey Brace`, `Mainframe`, `Headbang` and `Journal`. We will slowly implement the new effects as time flies.")
            }} title={"Change Display Name Style"} {...props}>
                <DisplayNameStyle/>
            </ModalModule.Modal>
        })
    }

    return <Components.Button
        onClick={handleClick}
    >
        Change
    </Components.Button>
}

function DisplayNameStyle() {
    const UserNameWithEffects = wpGet(BetterDiscord.Webpack.Filters.bySource('UserNameWithEffects'), {declaration: x => String(x.type).includes("UserNameWithEffects")});
    // this looks like bad practice but cache exists.
    // also its a BetterDiscord plugin, arent we known for bad practice?

    const [fontId, setFontId] = React.useState(11);
    const [effectId, setEffectId] = React.useState(0);
    const [colors, setColors] = React.useState({
        primary: "#ffffff",
        accent: "#000000"
    });

    return <div>
        <div style={{fontSize: "25px", marginBottom: "10px"}}>
            <UserNameWithEffects userName={UserStore.getCurrentUser().globalName} loop={true} shouldWrap={false}
                                 inProfile={true} effectDisplayType={2} displayNameStyles={{
                colors: [colors.primary, colors.accent].filter(Boolean).map(x => parseInt(x.replace("#", "0x"), 16)),
                effectId: effectId+1,
                fontId: fontId,
            }}/>
        </div>

        <Components.Text>Font</Components.Text>
        {Object.values(FONTS).map(font => {
            console.log(font);
            return <FontButton
                fontFamily={font}
                selected={fontId == font.id}
                onClick={() => setFontId(font.id)}
            ></FontButton>
        })}
        <br/><br/>
        <Components.Text>Effect</Components.Text>
        {Object.entries(EFFECTS).map((effect, i) => {
            console.log(effect);
            const data = {
                effectName: effect[0],
                effectColors: effect[1],
                effectId: i
            }

            return <EffectButton
                onClick={() => setEffectId(i)}
                selected={effectId === i}
                data={data}
                colors={data.effectColors}
            >{data.effectName}</EffectButton>;
        })}
        <br/>
        <Components.Text>Primary Color</Components.Text>
        <Components.ColorInput
            value={colors.primary}
            onChange={(e) => {
                setColors({primary: e, accent: colors.accent})
            }}
        />
        {effectId === 1 ? <div><br/>
            <Components.Text>Secondary Color</Components.Text>
            <Components.ColorInput
                value={colors.accent}
                onChange={(e) => {
                    setColors({primary: colors.primary, accent: e})
                }}
            />
        </div> : null}
        <br/>
        <Components.Button
            onClick={() => {
                const PRIMARY_COLOR_DECIMAL = parseInt(colors.primary.replace("#", ''), 16);
                const SECONDARY_COLOR_DECIMAL = parseInt(colors.accent.replace("#", ''), 16);
                const colorString = effectId === 1 ? `${PRIMARY_COLOR_DECIMAL},${SECONDARY_COLOR_DECIMAL}` : PRIMARY_COLOR_DECIMAL;
                copyToClipboard(secondsightifyEncodeOnly(`S{${fontId + 1},${effectId + 1},${colorString}}`), "3y3 copied to clipboard!");
            }}
        >
            Copy 3y3
        </Components.Button>
    </div>

}