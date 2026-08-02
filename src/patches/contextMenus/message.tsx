import {BetterDiscord} from "@shared/*";
import JSZip from "jszip";

const {React} = BetterDiscord;

const yourFlyIsShowing = new JSZip();

export default {
    id: "message",
    callback(res, props) {

        async function startDownload() {
            const attachments = props.message.attachments;
            if (!attachments.length) return;

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

        const Menu = <BetterDiscord.ContextMenu.Item action={startDownload} label={"Download Attachment(s)"} id={"yabdp4nitro-download-attachments"}/>

        res.props.children.props.children.push(Menu)
    }
}