import suggondeeznutz from "../../global/shared/regexReveals.ts";

export function extractDisplayNameStyles(revealedText: string | undefined | null) {
    if (!revealedText) return null;
    const match = revealedText.match(suggondeeznutz.DISPLAY_NAME_STYLES)?.[0]?.slice?.(2, -1)?.split?.(",");
    return match || null;
}

export function extractDecoration(revealedText: string | undefined | null) {
    if (!revealedText) return null;
    const skuId = revealedText.match(suggondeeznutz.DECORATION)?.[0]?.slice?.(2);
    return skuId || null;
}

export function extractNameplate(revealedText: string | undefined | null) {
    if (!revealedText) return null;
    const match = revealedText.match(suggondeeznutz.NAMEPLATE)?.[0]?.slice(2, -1)?.split?.(',');
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
    const matches = revealedText.match(suggondeeznutz.PROFILE_PICTURE)?.[0].replace("P{", "").replace("}", "");
    return matches || null;
}

export function containsProfileV2(revealedSurrogate: string | undefined | null) {
    return revealedSurrogate?.includes("B{") || false;
}

export function containsProfileEffects(revealedSurrogate: string | undefined | null) {
    return revealedSurrogate?.includes("fx") || false;
}

export function containsProfileFrame(revealedSurrogate: string | undefined | null) {
    return revealedSurrogate?.includes("pf") || false;
}