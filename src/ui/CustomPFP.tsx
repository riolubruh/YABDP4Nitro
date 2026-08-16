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

        copyToClipboard(secondsightifyEncodeOnly(`P{${hash}}`), "3y3 copied to clipboard!");
    }

    return <div>
        <Components.TextInput
            placeholder={"PFP Imgur URL"}
            onChange={e=> setUrl(e)}
        />
        <Components.Button
            onClick={handleClick}
            disabled={url == ""}
            style={{
                marginTop: "10px",
            }}
        >
        Copy PFP 3y3
        </Components.Button>

    </div>
}