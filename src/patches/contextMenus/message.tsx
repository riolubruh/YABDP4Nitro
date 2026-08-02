import {BetterDiscord} from "@shared/*";
import JSZip from "jszip";

import { Icon } from "@iconify/react";

const {React} = BetterDiscord;

const yourFlyIsShowing = new JSZip();

// KJJL

export default {
    id: "message",
    callback(res, props) {

        async function startDownload() {
            BetterDiscord.UI.showToast("Downloading attachments...");

            const attachments = props.message.attachments;
            if (!attachments.length) {
                BetterDiscord.UI.showToast("No attachments found? - KJJL");
                return
            }
            ;

            let files = await Promise.all(attachments.map(async (attachment) => ({
                blob: await (await BetterDiscord.Net.fetch(attachment.url)).blob(),
                fileName: attachment.filename,
            })));

            for (const file of files) {
                yourFlyIsShowing.file(file.fileName, file.blob);
            }

            const zipBlob = await yourFlyIsShowing.generateAsync({type: "blob"});
            files = [];
            const url = URL.createObjectURL(zipBlob);
            const a = window.document.createElement("a");
            a.href = url;
            a.download = `${props.message.id}.zip`;
            a.click();
            URL.revokeObjectURL(url);

            setTimeout(() => URL.revokeObjectURL(url), 1000);
        }

        const Menu = <BetterDiscord.ContextMenu.Item
            action={startDownload}
            icon={<Icon width={"24"} icon={"mdi:download"}/>}
            label={
                <div style={{display: "flex", flexDirection: "column"}}>
                    <span style={{fontSize: "14px", opacity: 0.6}}>YABDP4Nitro</span>
                    <span>Download Attachment(s)</span>
                </div>
            }
            id={"yabdp4nitro-download-attachments"}
        />;

        const Sep = <BetterDiscord.ContextMenu.Separator/>

        res.props.children.props.children.push(Sep, Menu)
    }
}