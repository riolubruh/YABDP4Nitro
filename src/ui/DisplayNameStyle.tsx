import {BetterDiscord} from "@shared/";
import {copyToClipboard, getDirectImgurHash, secondsightifyEncodeOnly, styled} from "@utils/*";
const {React, Components} = BetterDiscord;

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

const EFFECTS = [
    "Solid",
    "Gradient",
    "Neon",
    "Toon",
    "Pop"
]

const EFFECT_DEFAULT_COLORS = [
    [15724529], //Solid
    [2797222, 16762000], //Gradient
    [6888941], //Neon
    [15999128] //Toon
    [1036166] //Toon
]

function FontButton({onClick, selected, fontFamily}){
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

function EffectButton({onClick, selected, children, effectId, colors}){
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
        displayNameStyles={{fontId: 0, effectId: effectId, colors: colors}}
        effectDisplayType={effectId}
        inProfile={true}
        loop={true}
        userName={EFFECTS[effectId]}
    /></Components.Button>
}

const EffectText = BetterDiscord.Webpack.getAllBySource('UserNameWithEffects')?.[1];

export default function DisplayNameStyle() {
    const [fontId, setFontId] = React.useState(0);
    const [effectId, setEffectId] = React.useState(0);
    const [colors, setColors] = React.useState({
        primary: "#ffffff",
        accent: "#000000"
    });

    let fontButtons = [];
    for(let i = 0; i < FONTS.length; i++){
        fontButtons.push(<FontButton
            fontFamily={FONTS[i]}
            selected={fontId === i}
            onClick={() => setFontId(i)}
        ></FontButton>);
    }

    let effectButtons = [];
    for(let i = 0; i < EFFECTS.length; i++){
        effectButtons.push(<EffectButton
            onClick={() => setEffectId(i)}
            selected={effectId===i}
            effectId={effectId}
            colors={EFFECT_DEFAULT_COLORS[i]}
        >{EFFECTS[i]}</EffectButton>)
    }

    return <div>
        <Components.Text>Font</Components.Text>
        {...fontButtons}
        <br/><br/>
        <Components.Text>Effect</Components.Text>
        {...effectButtons}
        <Components.Button
            onClick={()=>{
                BetterDiscord.UI.showToast(`Font: ${fontId} Effect: ${effectId}`);
            }}
        >
        Show selection
        </Components.Button>
    </div>

}