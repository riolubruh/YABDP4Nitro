import SettingsStore from '../../global/stores/SettingsStore.ts';

import { BetterDiscord } from '@shared/';
import { ContextMenuLabel, ContextMenuWrapper } from '@utils/*';
import { CloseAllContextMenus } from '@global/*';

const { UserStore } = BetterDiscord.Webpack.Stores;

const Slider = BetterDiscord.Webpack.getByStrings('initialValue', 'label', 'sortedMarkers', {
  searchExports: true,
});

export default {
  id: 'stream-context',
  callback(res, props) {
    const sharpenStreamsEnabled = SettingsStore.get('sharpenStreams');
    const currentUserId = UserStore.getCurrentUser().id;
    const streamingUserId = props?.stream?.ownerId;
    const userSharpnessPreferences = BetterDiscord.Hooks.useStateFromStores([SettingsStore], () =>
      SettingsStore.get('userSharpenPreferences')
    );
    const streamSharpnessPreference = userSharpnessPreferences?.[streamingUserId] ?? 0;

    if (
      !sharpenStreamsEnabled ||
      !props?.stream?.ownerId ||
      props?.stream?.ownerId == currentUserId
    )
      return;

    function handleChange(percentSharpness: number) {
      SettingsStore.set('userSharpenPreferences', {
        ...SettingsStore.get('userSharpenPreferences'),
        [streamingUserId]: percentSharpness,
      });
    }

    const ContextMenuSlider = (
      <BetterDiscord.ContextMenu.Item
        onClose={CloseAllContextMenus}
        id={'yabd-sharpness-slider'}
        label={
          <Slider
            initialValue={streamSharpnessPreference}
            label={
              <ContextMenuWrapper>
                <ContextMenuLabel />
                <BetterDiscord.Components.Text
                  style={{
                    fontSize: '14px',
                    fontWeight: 'var(--font-weight-medium)',
                  }}
                >
                  Sharpness
                  {`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`}
                </BetterDiscord.Components.Text>
              </ContextMenuWrapper>
            }
            mini={true}
            handleSize={16}
            keyboardStep={1}
            onValueChange={handleChange}
            asValueChanges={handleChange}
          />
        }
      />
    );

    res.props.children.props.children.splice(2, 0, ContextMenuSlider);
  },
};
