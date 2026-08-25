import { BetterDiscord } from '@shared/*';
import SettingsStore from '../../global/stores/SettingsStore.ts';

const streamSettingsMod = BetterDiscord.Webpack.getMangled(
  BetterDiscord.Webpack.Filters.bySource('getCodecOptions'),
  {
    Connection: (x) => x?.prototype?.getCodecOptions,
  },
  { mapDeclarations: true }
);

export default {
  name: 'Video Codec',
  description: 'Applies chosen video codec.',
  ids: undefined, // array of entry ids
  apply(finale, patcher) {
    patcher.after(streamSettingsMod?.Connection?.prototype, 'getCodecOptions', (_, __, ret) => {
      const videoCodec = SettingsStore.get('videoCodec2');

      videoCodec >= 0 && (ret.videoEncoder = ret.videoDecoders[videoCodec]);
    });
  },
};
