import {BetterDiscord} from "@shared/";
import {copyToClipboard, getDirectImgurHash, secondsightifyEncodeOnly} from "@utils/*";
const {React, Components} = BetterDiscord;

export default function CustomPFP(){
    const [url, setUrl] = React.useState("");

    function handleClick(){
        if(!url.includes("imgur.com")){
            BetterDiscord.UI.showToast("Please use Imgur!",{type: "warning"});
            return;
        }
        let hash = getDirectImgurHash(url);

        copyToClipboard(secondsightifyEncodeOnly(`P{${hash}}`));
    }

    return <div>
        <Components.TextInput
            placeholder={"PFP Imgur URL"}
            onChange={e=> setUrl(e)}
        />
        <Components.Button
            onClick={handleClick}
            disabled={url == ""}
        >
        Copy PFP 3y3
        </Components.Button>

    </div>
}