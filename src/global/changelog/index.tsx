import changelog from "./changelog.json"
import {BetterDiscord} from "../index.ts";

export function startChangelog()
{
    console.log(changelog)
    BetterDiscord.UI.showChangelogModal(changelog);
}