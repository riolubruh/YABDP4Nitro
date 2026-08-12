import {BetterDiscord} from "@shared/";

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

function EffectButton({onClick, selected, children, effectId, colors}) {
    const data = {fontId: 0, effectId: effectId, colors: colors}
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
        displayNameStyles={data}
        effectDisplayType={effectId}
        inProfile={true}
        loop={true}
        userName={effectId}
    /></Components.Button>
}

export default function DisplayNameStyle() {
    const [fontId, setFontId] = React.useState(0);
    const [effectId, setEffectId] = React.useState(0);
    const [colors, setColors] = React.useState({
        primary: "#ffffff",
        accent: "#000000"
    });

    return <div>
        <Components.Text>Font</Components.Text>
        {Object.values(FONTS).map((fontId, index) => {
            return <FontButton
                fontFamily={fontId}
                selected={fontId === FONTS[index]}
                onClick={() => setFontId(index)}
            ></FontButton>
        })}
        <br/><br/>
        <Components.Text>Effect</Components.Text>
        {Object.entries(EFFECTS).map((effect, i) => {
            const data = {
                effectName: effect[0],
                effectColors: effect[1],
            }

            return <EffectButton
                onClick={() => setEffectId(i)}
                selected={effectId === i}
                effectId={data.effectName}
                colors={data.effectColors}
            >{data.effectName}</EffectButton>;
        })}
        <Components.Button
            onClick={() => {
                BetterDiscord.UI.showToast(`Font: ${fontId} Effect: ${effectId}`);
            }}
        >
            Show selection
        </Components.Button>
    </div>

}