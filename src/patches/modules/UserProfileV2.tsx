import { BetterDiscord } from "@shared/*";
import {
  AccentColors,
  AvatarDecorations,
  CustomBanner,
  CustomPFP,
  DisplayNameStyle,
  Nameplates,
  ProfileEffects,
  ProfileFrames,
} from "../../ui";
import { getKey, wpGet, wpWait } from "../../global/webpack";
import { copyToClipboard, secondsightifyEncodeOnly, styled } from "@utils/*";
import BadgesStore from "../../global/stores/BadgesStore.tsx";
import SettingsStore from "../../global/stores/SettingsStore.ts";

const { React, Components } = BetterDiscord;
const { UserStore } = BetterDiscord.Webpack.Stores;

const GLOBAL_FILTER = BetterDiscord.Webpack.Filters.bySource(".RP.ACTIVITY?(0,");

const Scroller = styled.div({
  overflowY: "scroll",
  scrollbarWidth: "none",
  maxWidth: "400px",
});

const Grid = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "8px",
});

const Card = styled.div({
  padding: "12px 12px 12px 0px",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  gap: "8px",
  minWidth: 0,
  overflow: "hidden",
});

const CardTop = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  minWidth: 0,
  overflow: "hidden",
  marginTop: "8px",
});

const CardLabel = styled.div({
  fontSize: "12px",
  fontWeight: "var(--font-weight-bold)",
  color: "var(--text-default)",
  textTransform: "uppercase",
  letterSpacing: "0.02em",
});

export function CustomSettingsTab() {
  const isDeveloper = BadgesStore.isImportant(UserStore.getCurrentUser().id);
  const advancedProfileCustomization = SettingsStore.get("advancedProfileCustomization");
  const [devText, setDevText] = React.useState<string>("");

  return (
    <Scroller>
      <Grid>
        <CardTop style={{ gridColumn: "span 2" }}>
          <CardLabel>Theme Colors</CardLabel>
          <AccentColors />
        </CardTop>

        <Card>
          <CardLabel>Custom PFP</CardLabel>
          <CustomPFP />
        </Card>
        <Card>
          <CardLabel>Custom Banner</CardLabel>
          <CustomBanner />
        </Card>

        <Card>
          <CardLabel>Display Name Style</CardLabel>
          <DisplayNameStyle />
        </Card>
        <Card>
          <CardLabel>Profile Effect</CardLabel>
          <ProfileEffects />
        </Card>

        <Card>
          <CardLabel>Avatar Decoration</CardLabel>
          <AvatarDecorations />
        </Card>
        <Card>
          <CardLabel>Nameplate</CardLabel>
          <Nameplates />
        </Card>

        <Card style={{ gridColumn: "span 2" }}>
          <CardLabel>Profile Frame</CardLabel>
          <ProfileFrames />
        </Card>

        {isDeveloper || advancedProfileCustomization ? (
          <Card style={{ gridColumn: "span 2" }}>
            <CardLabel>Developer</CardLabel>
            <div style={{ display: "flex", gap: "8px", width: "100%" }}>
              <Components.TextInput value={devText} onChange={setDevText} style={{ flex: 1 }} />
              <Components.Button
                onClick={() => {
                  copyToClipboard(
                    secondsightifyEncodeOnly(devText),
                    "Copied encoded text to clipboard!"
                  );
                }}
              >
                Encode
              </Components.Button>
            </div>
          </Card>
        ) : null}
      </Grid>
    </Scroller>
  );
}

export default {
  name: "User Profile V2",
  description: "skibidi toilet",
  ids: [
    async () =>
      await wpWait(BetterDiscord.Webpack.Filters.bySource("speakingWhilePTTInactive"), {
        raw: true,
      }).then((x) => x.id),
    async () =>
      await wpWait(BetterDiscord.Webpack.Filters.bySource("StageChannelCall"), { raw: true }).then(
        (x) => x.id
      ),
    async () =>
      await wpWait(
        BetterDiscord.Webpack.Filters.bySource(/initialSelectedNameplate:.,stackingBehavior/),
        { raw: true }
      ).then((x) => x.id),
    async () =>
      await wpWait(
        BetterDiscord.Webpack.Filters.bySource(
          /initialSelectedProfileFrame:.,stackingBehavior:.,returnRef/
        ),
        { raw: true }
      ).then((x) => x.id),
  ],
  priority: 10,
  waitFor: [GLOBAL_FILTER],
  apply(finale, patcher) {
    const TabBarInjectLocation = wpGet(GLOBAL_FILTER, { raw: true }).declarations;
    const module = getKey(
      TabBarInjectLocation,
      BetterDiscord.Webpack.Filters.byStrings(".RP.ACTIVITY?(0,")
    );
    const tabSectionReturn = getKey(
      TabBarInjectLocation,
      BetterDiscord.Webpack.Filters.byStrings(".section===")
    );

    const GoLiveModalV2UpsellMod = BetterDiscord.Webpack.getBySource(
      "profile-editing-nameplate-error",
      { raw: true }
    );
    const upsell = getKey(
      GoLiveModalV2UpsellMod.declarations,
      BetterDiscord.Webpack.Filters.byStrings("nitro-pink")
    );

    patcher.after(module.module, module.key, (a, [args], callback) => {
      if (args.section == "YABDP4Nitro") {
        return <CustomSettingsTab />;
      }

      return callback;
    });

    patcher.before(tabSectionReturn.module, tabSectionReturn.key, (a, [args], res) => {
      if (args?.displayProfile?.userId != UserStore.getCurrentUser().id) return res;
      if (args?.items && args.items.find((x) => x.text.includes("YABD"))) return;

      args.items.push({
        text: "YABDP4Nitro",
        section: "YABDP4Nitro",
      });
    });

    patcher.instead(upsell.module, upsell.key, (_, args, originalFunction) => {
      const upsellRemovalEnabled = SettingsStore.get("removeProfileUpsell");
      if (upsellRemovalEnabled) return null;
      return originalFunction.apply(args);
    });
    return;
  },
};
