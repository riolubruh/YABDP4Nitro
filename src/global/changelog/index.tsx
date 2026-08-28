import changelog from "./changelog.json";
import { BetterDiscord } from "@shared/";
import Metadata from "../../../package.json";
import SettingsStore from "../stores/SettingsStore.ts";
import {CHANGELOG_FOOTER} from "../../ui/ChangelogFooter.tsx";

const Meta = Metadata;

function normalizeVersion(v: string): string {
	const parts = v.split(".");
	while (parts.length < 3) parts.push("0");
	return parts.join(".");
}

export function startChangelog(sourceVersion) {
	const lastSeen = normalizeVersion(SettingsStore.get("lastChangelogVersion") ?? "0.0.0");
	const currentVersion = sourceVersion ?? normalizeVersion(Meta.version);

	if (BetterDiscord.Utils.semverCompare(currentVersion, lastSeen) >= 0) return;

	const entry = changelog?.[currentVersion]?.[0];
	if (!entry) return;

	BetterDiscord.UI.showChangelogModal({
		title: Meta.name,
		subtitle: `v${currentVersion}`,
		footer: CHANGELOG_FOOTER,
		...entry,
	});

	SettingsStore.set("lastChangelogVersion", currentVersion);
}
