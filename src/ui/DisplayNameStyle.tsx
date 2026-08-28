import { BetterDiscord } from "@shared/";
import { copyToClipboard, secondsightifyEncodeOnly } from "@utils/*";
import { GlobalModules } from "@global/*";
import { wpGet, wpGetByKeys } from "../global/webpack";

const { React, Components } = BetterDiscord;
const EffectText = BetterDiscord.Webpack.getBySource("UserNameWithEffects").A;

const { UserStore } = BetterDiscord.Webpack.Stores;

const FONTS = [
	{ name: "GG Sans", id: 11 },
	{ name: "Tempo", id: 12 },
	{ name: "Sakura", id: 3 },
	{ name: "Jellybean", id: 4 },
	{ name: "Modern", id: 6 },
	{ name: "Medieval", id: 7 },
	{ name: "8Bit", id: 8 },
	{ name: "Vampyre", id: 10 },
	{ name: "Monkey Bars", id: 13 },
	{ name: "Mainframe", id: 14 },
	{ name: "Headbang", id: 15 },
	{ name: "Journal", id: 16 },
];

const EFFECTS = {
	Solid: [15724529],
	Gradient: [2797222, 16762000],
	Neon: [6888941],
	Toon: [15999128],
	Pop: [1036166],
	Gummy: [15724529, 2797222 /*16762000, 15999128, 1036166*/], // for fuck sake...
	Prism: [15724529, 2797222 /*16762000, 15999128, 1036166*/], // for fuck sake...

	// thank you, Discord:tm:
	// Not affiliated with Discord Inc.
	// "Discord" is a registered trademark of Discord Inc.
};

function FontButton({ onClick, selected, fontFamily: font }) {
	return (
		<Components.Button
			style={{
				fontFamily: font.name,
				color: "var(--text-default)",
				backgroundColor: "var(--control-secondary-background-default)",
				border: selected ? "1px solid white" : "none",
				margin: "0px 5px 5px 0px",
				display: "inline-block",
			}}
			onClick={onClick}
		>
			{font.name}
		</Components.Button>
	);
}

function ColorPalette({ color }: { color: string }) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 36 36">
			<path
				fill={color}
				d="M32.23 14.89c-2.1-.56-4.93 1.8-6.34.3c-1.71-1.82 2.27-5.53 1.86-8.92c-.33-2.78-3.51-4.08-6.66-4.1A18.5 18.5 0 0 0 7.74 7.59c-6.64 6.59-8.07 16-1.37 22.48c6.21 6 16.61 4.23 22.67-1.4a17.7 17.7 0 0 0 4.22-6.54c1.08-2.9 1.18-6.64-1.03-7.24M9.4 10.57a2.23 2.23 0 0 1 2.87 1.21a2.22 2.22 0 0 1-1.81 2.53a2.22 2.22 0 0 1-2.87-1.21a2.23 2.23 0 0 1 1.81-2.53M5.07 20.82a2.22 2.22 0 0 1 1.82-2.53a2.22 2.22 0 0 1 2.86 1.21A2.23 2.23 0 0 1 7.94 22a2.24 2.24 0 0 1-2.87-1.18m7 8.33a2.22 2.22 0 0 1-2.87-1.21a2.23 2.23 0 0 1 1.8-2.53a2.23 2.23 0 0 1 2.87 1.21A2.22 2.22 0 0 1 12 29.15ZM15 8.26a2.23 2.23 0 0 1 1.81-2.53a2.24 2.24 0 0 1 2.87 1.21a2.22 2.22 0 0 1-1.82 2.53A2.21 2.21 0 0 1 15 8.26m5.82 22.19a2.22 2.22 0 0 1-2.87-1.21a2.23 2.23 0 0 1 1.81-2.53a2.24 2.24 0 0 1 2.87 1.21a2.22 2.22 0 0 1-1.85 2.53Zm5-10.46a3.2 3.2 0 0 1-1.69 1.76a3.5 3.5 0 0 1-1.4.3a2.78 2.78 0 0 1-2.56-1.5a2.5 2.5 0 0 1-.07-2a3.2 3.2 0 0 1 1.69-1.76a3 3 0 0 1 4 1.2a2.54 2.54 0 0 1 0 2.01Z"
			></path>
		</svg>
	);
}

function ColorSwatch({ colorKey, value, onChange, disabled, toggleDisabled }) {
	const inputRef = React.useRef(null);

	return (
		<div
			style={{
				display: "inline-flex",
				flexDirection: "column",
				alignItems: "center",
				gap: 4,
				cursor: "pointer",
			}}
			onClick={() => inputRef.current?.click()}
			onContextMenu={(e) => {
				toggleDisabled(e, colorKey);
			}}
		>
			<input
				ref={inputRef}
				type="color"
				defaultValue={value}
				onChange={(e) => onChange(colorKey, e.target.value)}
				disabled={disabled}
				style={{
					position: "absolute",
					width: 1,
					height: 1,
					opacity: 0,
					pointerEvents: "none",
				}}
			/>

			<div
				style={{
					width: 40,
					height: 40,
					borderRadius: "50%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					background: disabled ? "rgba(0, 0, 0, 0.35)" : value,
					border: disabled
						? "2px solid rgba(255,255,255,0.6)"
						: "2px solid rgba(0,0,0,0.35)",
					boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
					transition: "background 0.15s ease, border 0.15s ease",
				}}
			>
				<ColorPalette color={disabled ? "#ffffff" : "rgba(0,0,0,0.45)"} />
			</div>
			<span
				style={{
					fontSize: 11,
					color: "#fff",
					textShadow: "0 1px 2px rgba(0,0,0,0.6)",
					textTransform: "capitalize",
				}}
			>
				{colorKey}
			</span>
		</div>
	);
}

function FiveGuys({ colors, onChange, renderCount = Object.keys(colors).length }) {
	const [visualColors, setVisualColors] = React.useState(colors);

	const handleColorChange = (key, newValue) => {
		onChange({ ...colors, [key]: newValue });
		setVisualColors({ ...visualColors, [key]: newValue });
	};

	const visibleKeys = Object.keys(colors).slice(0, renderCount);
	const visibleValues = visibleKeys.map((k) => colors[k]);

	const setValues = visibleValues.filter(Boolean);
	const gradientColors = setValues.length > 0 ? setValues : ["#3a3a3a", "#1e1e1e"];
	const background =
		gradientColors.length === 1
			? gradientColors[0]
			: `linear-gradient(90deg, ${gradientColors.join(", ")})`;

	const toggleDisable = (e, key) => {
		// e.stopPropagation(); // if the ctrl+click idea is added
		if (colors[key] != null) onChange({ ...colors, [key]: null });
		else onChange({ ...colors, [key]: visualColors[key] });
	};

	return (
		<div
			style={{
				display: "flex",
				gap: 14,
				padding: "14px 16px",
				borderRadius: 14,
				background,
				transition: "background 0.25s ease",
			}}
		>
			{visibleKeys.map((key) => (
				<ColorSwatch
					key={key}
					colorKey={key}
					disabled={!colors[key]}
					toggleDisabled={toggleDisable}
					value={visualColors[key]}
					onChange={handleColorChange}
				/>
			))}
		</div>
	);
}

function EffectButton({ onClick, selected, children, data, colors }) {
	return (
		<Components.Button
			style={{
				backgroundColor: "var(--control-secondary-background-default)",
				color: "var(--text-default)",
				border: selected ? "1px solid white" : "none",
				margin: "0px 5px 5px 0px",
				display: "inline-block",
			}}
			onClick={onClick}
		>
			<EffectText
				displayNameStyles={{
					colors: data.effectColors,
					fontId: 1,
					effectId: data.effectId + 1,
				}}
				effectDisplayType={data.effectId + 1}
				inProfile={true}
				loop={true}
				userName={data.effectName}
			/>
		</Components.Button>
	);
}

const ModalModule = wpGetByKeys(["Modal"]);

export default function OpenDisplayNameStyleModalButton() {
	function handleClick() {
		GlobalModules.ModalModule.openModal((props) => {
			return (
				<ModalModule.Modal
					notice={{
						type: "warning",
						message: GlobalModules.SimpleMarkdownWrapper.parse(
							"Right-click to toggle a color in the gradient. Please be warned that when using Gummy or Prism, it can be up to 150 characters!"
						),
					}}
					title={"Change Display Name Style"}
					{...props}
				>
					<DisplayNameStyle />
				</ModalModule.Modal>
			);
		});
	}

	return <Components.Button onClick={handleClick}>Change</Components.Button>;
}

function DisplayNameStyle() {
	const UserNameWithEffects = wpGet(
		BetterDiscord.Webpack.Filters.bySource("UserNameWithEffects"),
		{
			declaration: (x) => String(x.type).includes("UserNameWithEffects"),
		}
	);

	const [fontId, setFontId] = React.useState(11);
	const [effectId, setEffectId] = React.useState(0);
	const [colors, setColors] = React.useState({
		primary: "#ffffff",
		secondary: "#ffffff",
		accent: "#ffffff",
		extra: "#ffffff",
		extraExtra: "#ffffff",
	});

	const renderCount = effectId === 5 || effectId === 6 ? 5 : effectId === 1 ? 2 : 1;

	const activeColors = Object.values(colors)
		.filter(Boolean)
		.slice(0, renderCount)
		.map((x) => parseInt(x.replace("#", "0x"), 16));

	return (
		<div>
			<div style={{ fontSize: "25px", marginBottom: "10px" }}>
				<UserNameWithEffects
					userName={UserStore.getCurrentUser().globalName}
					loop={true}
					shouldWrap={false}
					inProfile={true}
					effectDisplayType={2}
					displayNameStyles={{
						colors: activeColors,
						effectId: effectId + 1,
						fontId: fontId,
					}}
				/>
			</div>

			<Components.Text>Font</Components.Text>
			{Object.values(FONTS).map((font) => (
				<FontButton
					key={font.id}
					fontFamily={font}
					selected={fontId == font.id}
					onClick={() => setFontId(font.id)}
				></FontButton>
			))}
			<br />
			<br />
			<Components.Text>Effect</Components.Text>
			{Object.entries(EFFECTS).map((effect, i) => {
				const data = {
					effectName: effect[0],
					effectColors: effect[1],
					effectId: i,
				};

				return (
					<EffectButton
						key={i}
						onClick={() => setEffectId(i)}
						selected={effectId === i}
						data={data}
						colors={data.effectColors}
					>
						{data.effectName}
					</EffectButton>
				);
			})}
			<br />
			<FiveGuys colors={colors} onChange={setColors} renderCount={renderCount} />
			<br />
			<Components.Button
				onClick={() => {
					const colorString = Object.values(colors)
						.filter(Boolean)
						.slice(0, renderCount)
						.map((x) => parseInt(x.replace("#", ""), 16))
						.join(",");

					copyToClipboard(
						secondsightifyEncodeOnly(`S{${fontId},${effectId + 1},${colorString}}`),
						"3y3 copied to clipboard!"
					);
				}}
			>
				Copy 3y3
			</Components.Button>
		</div>
	);
}
