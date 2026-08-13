import {BetterDiscord} from "@shared/*";
import {getKey, wpGet, wpWait} from "../../global/webpack";
const {React, Components} = BetterDiscord;

export default {
    name: "customClientThemes",
    description: "Adds an apply button to the custom client theme panel.",
    apply(finale: any, patcher: any) {
        // const module = wpGet(BetterDiscord.Webpack.Filters.bySource(`custom_themes_editor_footer`),{declaration: BetterDiscord.Webpack.Filters.byStrings("custom_themes_editor_footer"), raw:true})
        // nitro footer to press apply.

        // console.log(module)
    }
}