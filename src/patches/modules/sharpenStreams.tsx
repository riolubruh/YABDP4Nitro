import {BetterDiscord} from "@shared/*";
import SettingsStore from "../../global/stores/SettingsStore.ts";
import {findMangledName} from "@utils/*";
const {React} = BetterDiscord;

export function Sharpener ({userId}){
    let ref = BetterDiscord.React.useRef(null);
    const sharpness = BetterDiscord.Hooks.useStateFromStores([SettingsStore], () => SettingsStore.get("userSharpenPreferences")[userId])
    const [size, setSize] = BetterDiscord.React.useState({
        width: 0,
        height: 0
    });
    let filterIntensityFactoringScreen = (size.height / screen.height) * 2;
    (filterIntensityFactoringScreen > 1) && (filterIntensityFactoringScreen = 1);

    BetterDiscord.React.useEffect(() => {
        if(ref.current){
            const observer = new ResizeObserver((ResizeObserverEntry) => {
                if(ResizeObserverEntry?.[0]){
                    setSize({width: ResizeObserverEntry[0].contentRect.width, height: ResizeObserverEntry[0].contentRect.height});
                    console.log(ResizeObserverEntry);
                }
            });
            observer.observe(ref.current);

            return () => {
                observer.disconnect();
            };
        }
    },[]);


    return (<svg ref={ref} id={"yabd-svgSharpen-" + userId} colorInterpolationFilters={"sRGB"} style={{width:"100%", height:"100%"}} >
        <filter>
            <feConvolveMatrix order="3" kernelMatrix="0 -1 0 -1 5 -1 0 -1 0" result="sharpen"/>
            <feComposite
                in="SourceGraphic"
                in2="sharpen"
                operator="arithmetic"
                result="userPreference"
                k1="0" k2={1 - sharpness} k3={sharpness} k4="0"
            />

            <feComposite
                id={`yabd-svgSharpen-${userId}-size`}
                in="SourceGraphic"
                in2="userPreference"
                operator="arithmetic"
                k1="0" k2={1-filterIntensityFactoringScreen} k3={filterIntensityFactoringScreen} k4="0"
            />
        </filter>
    </svg>);
}

export default {
    name: "Stream Sharpener",
    description: "Sharpens streams.",
    ids: undefined, // array of entry ids
    waitFor: [BetterDiscord.Webpack.Filters.bySource('VideoStream', 'videoComponent')],
    apply(finale, patcher) {
        const mod = Object.values(finale.modules.find(Boolean)).find(x=>x.type);
        console.log(mod);
        patcher.after(mod, "type", (_, [args], ret) => {
            console.log(args);
            console.log(ret);
            ret.props.children.push(<Sharpener userId={args.userId}/>)
            ret.props.children[0].props.style = {filter: `url(#yabd-svgSharpen-${args.userId})`};
        });
    }
}