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

function FontButton({onClick, selected, fontFamily}){
    return <Components.Button
        style={{
            fontFamily: fontFamily,
            backgroundColor: "var(--control-secondary-background-default)",
            border: selected ? "1px solid white" : "none",
            margin: "0px 5px 5px 0px",
            display: "inline-block",
        }}
        onClick={onClick}
    >{fontFamily}</Components.Button>
}

function EffectButton({onClick, selected, children}){
    return <Components.Button
        style={{
            backgroundColor: "var(--control-secondary-background-default)",
            border: selected ? "1px solid white" : "none",
            margin: "0px 5px 5px 0px",
            display: "inline-block",
        }}
        onClick={onClick}
    >{...children}</Components.Button>
}

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
        >{EFFECTS[i]}</EffectButton>)
    }

    return <div style={{
    }}>
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