import { BetterDiscord } from '@shared/';
import { copyToClipboard, secondsightifyEncodeOnly } from '@utils/*';
const { UserProfileStore, UserStore } = BetterDiscord.Webpack.Stores;
const { React, Components } = BetterDiscord;

export default function AccentColors() {
  const CurrentUser = UserStore.getCurrentUser();
  const currentUserProfile = UserProfileStore.getUserProfile(CurrentUser.id);

  const [primary, setPrimary] = React.useState(
    currentUserProfile.themeColors
      ? `#${currentUserProfile.themeColors[0].toString(16).padStart(6, '0')}`
      : '#FFCFF8'
  );
  const [accent, setAccent] = React.useState(
    currentUserProfile.themeColors
      ? `#${currentUserProfile.themeColors[1].toString(16).padStart(6, '0')}`
      : '#FFCFF8'
  ); // waifu color of zero two.

  return (
    <div>
      <Components.Text
        style={{
          fontSize: '14px',
          fontWeight: 'var(--font-weight-bold)',
        }}
      >
        Primary
      </Components.Text>
      <Components.ColorInput
        value={primary}
        defaultValue={primary}
        disabled={false}
        onChange={(e) => setPrimary(e)}
      />
      <br />
      <Components.Text
        style={{
          fontSize: '14px',
          fontWeight: 'var(--font-weight-bold)',
        }}
      >
        Accent
      </Components.Text>
      <Components.ColorInput
        value={accent}
        defaultValue={accent}
        disabled={false}
        onChange={(e) => setAccent(e)}
      />
      <br />
      <Components.Button
        className={'yabd-generic-button'}
        style={{
          height: '32px',
          width: 'auto',
          marginTop: '10px',
        }}
        onClick={() => {
          copyToClipboard(
            ' ' + secondsightifyEncodeOnly(`[${primary},${accent}]`),
            '3y3 copied to clipboard!'
          );
        }}
      >
        Copy Colors 3y3
      </Components.Button>
    </div>
  );
}
