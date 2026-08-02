import {BetterDiscord} from "@shared/*";
import {Icon} from "@iconify/react";
import {ContextMenuLabel, ContextMenuWrapper, copyToClipboard} from "@utils/*";

const GIFPickerRender = BetterDiscord.Webpack.getByPrototypeKeys('renderGIF', {searchExports:true})

export default {
    name: "GIF Picker Context Menu",
    description: "Adds copy/open url context menu to GIFs in GIF Picker.",
    ids: undefined, // array of entry ids
    waitFor: [], // filters to wait for.
    apply(finale, patcher) {
        patcher.after(GIFPickerRender.prototype, "render", (instance, __, ret) => {
            ret.props.onContextMenu = (event: any) => {
                console.log(instance);
                let url: string = instance?.props?.item?.url ? instance.props.item.url : instance.props.src;
                console.log(url);
                url.startsWith('//') && (url = "https:" + url);

                //this shit keeps crashing fuck this
                // function copyUrl(){
                //     copyToClipboard(url);
                // }
                //
                // function openUrl(){
                //     window.open(url);
                // }

                // const Menu = <BetterDiscord.ContextMenu.Menu>
                //     <BetterDiscord.ContextMenu.Item
                //         icon={<Icon width={"24"} icon={"mdi:external-link"}/>}
                //         label={
                //             <ContextMenuWrapper>
                //                 <ContextMenuLabel/>
                //                 <span>Copy GIF URL</span>
                //             </ContextMenuWrapper>
                //         }
                //         id={"yabd-copy-url-gif-picker"}
                //         action={copyUrl}
                //     />;
                //     <BetterDiscord.ContextMenu.Item
                //         icon={<Icon width={"24"} icon={"mdi:external-link"}/>}
                //         label={
                //             <ContextMenuWrapper>
                //                 <ContextMenuLabel/>
                //                 <span>Open GIF URL</span>
                //             </ContextMenuWrapper>
                //         }
                //         id={"yabd-open-url-gif-picker"}
                //         action={openUrl}
                //     />;
                // </BetterDiscord.ContextMenu.Menu>;

                BetterDiscord.ContextMenu.open(event, BetterDiscord.ContextMenu.buildMenu([{
                    type: "text",
                    label: "Copy Link",
                    onClick: () => {
                        copyToClipboard(url);
                    }
                },{
                    type:"text",
                    label: "Open Link",
                    onClick: () => {
                        window.open(url);
                    }
                }]))
            }
        })
    }
}