import type {Patch} from "../../types/patches";
import {BetterDiscord} from "@shared/*";
import {Enums, MediaFilterModule, PresetModule} from "../../global/shared/steamExploit.ts";
import SettingsStore from "../../global/stores/SettingsStore.ts";

const CUSTOM_ID = 69;
const TARGET_WIDTH = 1280;
const TARGET_HEIGHT = 720;

async function fetchAsBytes(link: string): Promise<Uint8ClampedArray> {
    const res = await BetterDiscord.Net.fetch(link);
    const buf = await res.arrayBuffer();
    return new Uint8ClampedArray(buf);
}

async function fetchAsImageData(link: string) {
    const bytes = await fetchAsBytes(link);
    const blobUrl = URL.createObjectURL(new Blob([bytes]));

    const img = new Image();
    await new Promise<void>((res, rej) => {
        img.onload = () => res();
        img.onerror = rej;
        img.src = blobUrl;
    });

    const canvas = document.createElement("canvas");
    canvas.width = TARGET_WIDTH;
    canvas.height = TARGET_HEIGHT;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, TARGET_WIDTH, TARGET_HEIGHT);
    const {data} = ctx.getImageData(0, 0, TARGET_WIDTH, TARGET_HEIGHT);

    URL.revokeObjectURL(blobUrl);
    return {data, width: TARGET_WIDTH, height: TARGET_HEIGHT, pixelFormat: "rgba"};
}

export default {
    name: "cameraPreviewBypass",
    apply(finale: any, patcher: typeof BetterDiscord.Patcher) {
        patcher.after(PresetModule, "A", (thisObj, args, result) => {
            const enabled = SettingsStore.get("customVideoFilterEnabled");
            if(!enabled) return;
            const filter = SettingsStore.get("customVideoFilter");
            if (filter?.link) {
                result[CUSTOM_ID] = {
                    id: CUSTOM_ID,
                    name: "My Custom Background",
                    source: filter.link,
                    isVideo: filter.type === "mp4",
                };
            }
            return result;
        });

        const mod = BetterDiscord.Webpack.getBySource(
            ".gO.BACKGROUND_BLUR);if",
            {raw: true}
        );
        const {declarations} = mod;
        const [, pKey] = BetterDiscord.Webpack.getWithKey(
            BetterDiscord.Webpack.Filters.byStrings("BACKGROUND_REPLACEMENT"),
            {target: declarations}
        );

        patcher.instead(declarations, pKey, (thisObj, args, original) => {
            const enabled = SettingsStore.get("customVideoFilterEnabled");
            if(!enabled) return original.apply(thisObj, args);

            const [type, target, option] = args;
            if (option !== CUSTOM_ID) return original.apply(thisObj, args);

            const filter = SettingsStore.get("customVideoFilter");
            if (!filter?.link) return original.apply(thisObj, args);

            const isVideo = filter.type === "mp4";

            const apply = async () => {
                const payload = isVideo
                    ? {blob: await fetchAsBytes(filter.link)}
                    : {image: await fetchAsImageData(filter.link)};

                MediaFilterModule.wq({
                    [type]: {
                        graph: Enums.graph.REPLACEMENT,
                        target,
                        ...payload,
                    }
                });
            };

            return apply();
        });
    }
} as Patch