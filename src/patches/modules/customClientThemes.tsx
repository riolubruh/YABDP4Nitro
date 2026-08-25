import { BetterDiscord } from "@shared/*";
import { wpGet, wpWait } from "../../global/webpack";
import SettingsStore from "../../global/stores/SettingsStore.ts";
const { React, Components } = BetterDiscord;

const CustomClientThemePanelState = BetterDiscord.Webpack.getMangled(
  BetterDiscord.Webpack.Filters.bySource("CLIENT_THEMES_EDITOR", "activePanel", "SHARE_MESSAGE"),
  {
    state: (x) => x?.setState,
  }
);

export default {
  name: "customClientThemes",
  description: "Adds an apply button to the custom client theme panel.",
  waitFor: [BetterDiscord.Webpack.Filters.byKeys("openUserSettings")],
  apply(finale: any, patcher: any) {
    wpWait(
      BetterDiscord.Webpack.Filters.bySource(
        "onSaveTheme",
        "CUSTOM_THEMES_EDITOR",
        "CUSTOM_THEME_COACHMARK"
      )
    ).then((mod) => {
      patcher.after(mod, "default", (_, [args], ret) => {
        const clientThemesEnabled = SettingsStore.get("clientThemes");
        if (!clientThemesEnabled) return;

        const ShareThemeButton = wpGet(
          BetterDiscord.Webpack.Filters.bySource(`custom_themes_editor_footer`),
          {
            declaration: BetterDiscord.Webpack.Filters.byStrings("CustomThemesShareModalWrapper"),
            raw: true,
          }
        );

        const onSaveTheme = BetterDiscord.Utils.findInTree(ret, (x) => x?.onSaveTheme).onSaveTheme;

        ret.props.children[1] = (
          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "16px 15px",
              borderTop: "1px solid var(--border-subtle)",
            }}
          >
            <ShareThemeButton />
            <Components.Button
              onClick={(e) => {
                CustomClientThemePanelState.state.setState(
                  CustomClientThemePanelState.state.getInitialState()
                );
                finale.modules[0].openUserSettings("appearance_panel");
              }}
              style={{
                backgroundColor: "var(--control-secondary-background-default)",
              }}
            >
              <Components.Text
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Back
              </Components.Text>
            </Components.Button>
            <Components.Button onClick={(e) => onSaveTheme(e)}>
              <Components.Text
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Apply
              </Components.Text>
            </Components.Button>
          </div>
        );
      });
    });
  },
};
