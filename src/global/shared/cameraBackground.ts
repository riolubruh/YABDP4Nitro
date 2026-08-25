import { BetterDiscord } from "./index.tsx";

export const MediaFilterModule = BetterDiscord.Webpack.getModule(
	(m) => typeof m.wq === "function" && typeof m.Oo === "function"
)?.wq
	? BetterDiscord.Webpack.getModule(
			(m) => typeof m.wq === "function" && typeof m.Oo === "function"
		)
	: null;

const BackgroundEnums = BetterDiscord.Webpack.getModule(
	(m) => m.Tr?.CAMERA_BACKGROUND_LIVE && m.gO?.BACKGROUND_REPLACEMENT && m.Qo?.INPUT_DEVICE
);
export const PresetModule = BetterDiscord.Webpack.getBySource(
	"52f91129995158682c465310f61e64cd61fbf227f0dc6b43313c5e8226818661"
);

export const Enums = {
	filterType: {
		// a.Tr
		LIVE: BackgroundEnums.Tr.CAMERA_BACKGROUND_LIVE,
		PREVIEW: BackgroundEnums.Tr.CAMERA_BACKGROUND_PREVIEW,
	},
	graph: {
		// a.gO
		NONE: BackgroundEnums.gO.NONE,
		BLUR: BackgroundEnums.gO.BACKGROUND_BLUR,
		REPLACEMENT: BackgroundEnums.gO.BACKGROUND_REPLACEMENT,
	},
	targetType: {
		// a.Qo
		INPUT_DEVICE: BackgroundEnums.Qo.INPUT_DEVICE,
		STREAM: BackgroundEnums.Qo.STREAM,
	},
};

// const MediaEngineStore = BetterDiscord.Webpack.getModule(m => typeof m.isSupported === "function" && typeof m.isVideoAvailable === "function");
// const dims = BetterDiscord.Webpack.getModule(m => m.width && m.height && !m.CAMERA_BACKGROUND_LIVE, {searchExports: true}) ?? {
//     width: 1280,
//     height: 720
// };
//
// async function base64ToImageData(base64, width, height) {
//     const img = new Image();
//     img.crossOrigin = "anonymous";
//     await new Promise((res, rej) => {
//         img.onload = res;
//         img.onerror = rej;
//         img.src = base64.startsWith("data:") ? base64 : `data:image/png;base64,${base64}`;
//     });
//     const canvas = document.createElement("canvas");
//     canvas.width = width;
//     canvas.height = height;
//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(img, 0, 0, width, height);
//     const {data} = ctx.getImageData(0, 0, width, height);
//     return {data, width, height, pixelFormat: "rgba"};
// }
//
// async function base64ToBlobBytes(base64) {
//     const res = await fetch(base64.startsWith("data:") ? base64 : `data:video/mp4;base64,${base64}`);
//     const blob = await res.blob();
//     return new Uint8ClampedArray(await blob.arrayBuffer());
//     // int8clampedarray is insane.
// }

// export async function setCustomVideoBackground(base64Mp4) {
//     const blob = await base64ToBlobBytes(base64Mp4);
//     MediaFilterModule.wq({
//         [Enums.Tr.CAMERA_BACKGROUND_LIVE]: {
//             graph: Enums.gO.BACKGROUND_REPLACEMENT,
//             target: {type: Enums.Qo.INPUT_DEVICE},
//             image: undefined,
//             blob
//             // videos take blobs
//             // image is base64
//         }
//     });
// }
//
// export async function setCustomCameraBackground(base64) {
//     const image = await base64ToImageData(base64, dims.width, dims.height);
//     MediaFilterModule.wq({
//         [Enums.Tr.CAMERA_BACKGROUND_LIVE]: {
//             graph: Enums.gO.BACKGROUND_REPLACEMENT,
//             target: {type: Enums.Qo.INPUT_DEVICE},
//             image
//         }
//     });
// }
