import suggondeeznutz from "../../global/shared/regexReveals.ts";

export function extractDisplayNameStyles(revealedText: string | undefined | null) {
	if (!revealedText) return null;
	const match = revealedText
		.match(suggondeeznutz.DISPLAY_NAME_STYLES)?.[0]
		?.slice?.(2, -1)
		?.split?.(",");
	return match || null;
}

export function extractDecoration(revealedText: string | undefined | null) {
	if (!revealedText) return null;
	const skuId = revealedText.match(suggondeeznutz.DECORATION)?.[0]?.slice?.(2);
	return skuId || null;
}

export function extractNameplate(revealedText: string | undefined | null) {
	if (!revealedText) return null;
	const match = revealedText.match(suggondeeznutz.NAMEPLATE)?.[0]?.slice(2, -1)?.split?.(",");
	return match || null;
}

export function extractProfileEffects(parsedText: string | undefined | null) {
	if (!parsedText) return null;
	const skuId = parsedText.match(suggondeeznutz.PROFILE_EFFECTS)?.[0]?.slice(2);
	return skuId || null;
}

export function extractProfileFrame(revealedText: string | undefined | null) {
	if (!revealedText) return null;
	const match = revealedText.match(suggondeeznutz.PROFILE_FRAME)?.[0]?.substring(2);
	return match || null;
}

export function extractProfilePicture(revealedText: string | undefined | null) {
	if (!revealedText) return null;
	const matches = revealedText
		.match(suggondeeznutz.PROFILE_PICTURE)?.[0]
		.replace("P{", "")
		.replace("}", "");
	return matches || null;
}

export function containsBanner(revealedSurrogate: string | undefined | null) {
	return revealedSurrogate?.includes("B{") || false;
}

export function containsProfileEffects(revealedSurrogate: string | undefined | null) {
	return revealedSurrogate?.includes("fx") || false;
}

export function containsProfileFrame(revealedSurrogate: string | undefined | null) {
	return revealedSurrogate?.includes("pf") || false;
}

export function encodeTypingStyle(style) {
	const byte = ((style.animation & 0xf) << 4 | (style.typingSuggestion & 0xf))
		.toString(16).padStart(2, "0");

	const emojis = (style.emojis ?? []).map(e => {
		if (e.emoji.oneofKind === "unicodeEmoji") {
			return e.emoji.unicodeEmoji;
		}
		return ":" + (e.animated ? "a" : "") + e.emoji.customEmojiId;
	}).join("|");

	return emojis ? `t{${byte},${emojis}}` : `t{${byte}}`;
}

export function extractTypingStyles(revealedText) {
	if (!revealedText) return null;
	const m = revealedText.match(suggondeeznutz.TYPING_STYLES);
	if (!m) return null;

	const byte = parseInt(m[1], 16);
	const animation = (byte >> 4) & 0xf;
	const typingSuggestion = byte & 0xf;

	const emojis = m[2]
		? m[2].split("|").map(s => {
			if (s.startsWith(":")) {
				const rest = s.slice(1);
				const animated = rest.startsWith("a");
				const customEmojiId = animated ? rest.slice(1) : rest;
				return {emoji: {oneofKind: "customEmojiId", customEmojiId}, animated};
			}
			return {emoji: {oneofKind: "unicodeEmoji", unicodeEmoji: s}, animated: false};
		})
		: [];

	return {animation, typingSuggestion, emojis};
}