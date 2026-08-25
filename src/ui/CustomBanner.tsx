import { BetterDiscord } from "@shared/";
import { copyToClipboard, getDirectImgurHash, secondsightifyEncodeOnly } from "@utils/*";
const { React, Components } = BetterDiscord;

export default function CustomBanner() {
	const [url, setUrl] = React.useState("");

	async function handleClick() {
		if (!url.includes("imgur.com")) {
			BetterDiscord.UI.showToast("Please use Imgur!", { type: "warning" });
			return;
		}
		let hash = await getDirectImgurHash(url);

		copyToClipboard(secondsightifyEncodeOnly(`B{${hash}}`), "3y3 copied to clipboard!");
	}

	return (
		<div>
			<input
				className={"bd-text-input"}
				placeholder={"Banner Imgur URL"}
				onChange={(e) => setUrl(e.target.value)}
				style={{
					minWidth: "180px",
					width: "180px",
					maxWidth: "180px",
				}}
			/>
			<Components.Button
				onClick={handleClick}
				disabled={url == ""}
				style={{
					marginTop: "10px",
				}}
			>
				Copy Banner 3y3
			</Components.Button>
		</div>
	);
}
