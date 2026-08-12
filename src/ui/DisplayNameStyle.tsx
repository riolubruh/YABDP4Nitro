import {BetterDiscord} from "@shared/";
import {copyToClipboard, secondsightifyEncodeOnly} from "@utils/*";
import {GlobalModules} from "@global/*";
import {wpGetByKeys} from "../global/webpack";

const {React, Components} = BetterDiscord;
const EffectText = BetterDiscord.Webpack.getBySource('UserNameWithEffects').A

const FONTS = [
    "gg sans",
    "Tempo",
    "Sakura",
    "Jellybean",
    "Modern",
    "Medieval",
    "8Bit",
    "Vampyre"
];

const EFFECTS = {
    "Solid": [15724529],
    "Gradient": [2797222, 16762000],
    "Neon": [6888941],
    "Toon": [15999128],
    "Pop": [1036166]
}

function FontButton({onClick, selected, fontFamily}) {
    return <Components.Button
        style={{
            fontFamily: fontFamily,
            color: 'var(--text-default)',
            backgroundColor: "var(--control-secondary-background-default)",
            border: selected ? "1px solid white" : "none",
            margin: "0px 5px 5px 0px",
            display: "inline-block",
        }}
        onClick={onClick}
    >{fontFamily}</Components.Button>
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
        displayNameStyles={{colors:data.effectColors, fontId:1, effectId:data.effectId+1}}
        effectDisplayType={data.effectId+1}
        inProfile={true}
        loop={true}
        userName={data.effectName}
    /></Components.Button>
}

const ModalModule = wpGetByKeys(["Modal"]);

export default function OpenDisplayNameStyleModalButton(){
    function handleClick(){
        GlobalModules.ModalModule.openModal(props => {
            return <ModalModule.Modal title={"Change Display Name Style"} {...props}>
                <DisplayNameStyle/>
            </ModalModule.Modal>
        })
    }

    return <Components.Button
        onClick={handleClick}
    >
        Change Display Name Style
    </Components.Button>
}

function DisplayNameStyle() {
    const [fontId, setFontId] = React.useState(0);
    const [effectId, setEffectId] = React.useState(0);
    const [colors, setColors] = React.useState({
        primary: "#ffffff",
        accent: "#000000"
    });

    return <div>
        <Components.Text>Font</Components.Text>
        {Object.values(FONTS).map((_fontId, index) => {
            return <FontButton
                fontFamily={_fontId}
                selected={fontId == index}
                onClick={() => setFontId(index)}
            ></FontButton>
        })}
        <br/><br/>
        <Components.Text>Effect</Components.Text>
        {Object.entries(EFFECTS).map((effect, i) => {
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
            onChange={(e)=>{setColors({primary: e, accent: colors.accent})}}
        />
        {effectId === 1 ? <div><br/>
            <Components.Text>Secondary Color</Components.Text>
            <Components.ColorInput
                value={colors.accent}
                onChange={(e)=>{console.log(e); setColors({primary: colors.primary, accent: e})}}
            />
        </div> : null}
        <br/>
        <Components.Button
            onClick={() => {
                const PRIMARY_COLOR_DECIMAL = parseInt(colors.primary.replace("#",''),16);
                const SECONDARY_COLOR_DECIMAL = parseInt(colors.accent.replace("#",''),16);
                const colorString = effectId === 1 ? `${PRIMARY_COLOR_DECIMAL},${SECONDARY_COLOR_DECIMAL}` : PRIMARY_COLOR_DECIMAL;
                copyToClipboard(secondsightifyEncodeOnly(`S{${fontId+1},${effectId+1},${colorString}}`), "3y3 copied to clipboard!");
            }}
        >
            Copy 3y3
        </Components.Button>
    </div>

}