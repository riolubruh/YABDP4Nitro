import {BetterDiscord} from "@shared/*";
import JSZip from "jszip";

import { Icon } from "@iconify/react";
import {ContextMenuLabel, ContextMenuWrapper} from "@utils/*";
import {CloseAllContextMenus} from "@global/*";

const {React} = BetterDiscord;

const yourFlyIsShowing = new JSZip();

export default {
    id: "message",
    callback(res, props) {
        const attachmentsLmao = [
            ...props.message.attachments,
            ...(props?.message?.messageSnapshots?.[0]?.message?.attachments ?? [])
        ]

        async function startDownload() {
            BetterDiscord.UI.showToast("Downloading attachments...");

            const attachments = attachmentsLmao.filter(Boolean);
            if (!attachments.length) {
                BetterDiscord.UI.showToast("No attachments found?");
                return
            }

            let files = await Promise.all(attachments.map(async (attachment) => ({
                blob: await (await BetterDiscord.Net.fetch(attachment.url)).blob(),
                fileName: attachment.filename.replace(".zip.mp4", '.zip').replace('.7z.mp4','.7z'),
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

        const Menu = <BetterDiscord.ContextMenu.Item onClose={CloseAllContextMenus}
            action={startDownload}
            leadingAccessory={{
                type: "icon",
                icon: () => <Icon width={"22"} icon={"mdi:download"}/>
            }}
            label={
                <ContextMenuWrapper>
                    <ContextMenuLabel/>
                    <span>Download Attachment(s)</span>
                </ContextMenuWrapper>
            }
            id={"yabdp4nitro-download-attachments"}
        />;

        const Sep = <BetterDiscord.ContextMenu.Separator/>

        console.log(attachmentsLmao)
        attachmentsLmao.length > 0 && res.props.children.props.children.push(Sep, Menu)
    }
}