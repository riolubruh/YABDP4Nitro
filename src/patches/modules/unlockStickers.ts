import type { Patch } from '../../types/patches';
import { BetterDiscord } from '@shared/';
import SettingsStore from '../../global/stores/SettingsStore.ts';

const stickerSendability = BetterDiscord.Webpack.getMangled(
  BetterDiscord.Webpack.Filters.bySource(
    'SENDABLE_WITH_BOOSTED_GUILD',
    'canUseCustomStickersEverywhere'
  ),
  {
    getStickerSendability: (x) => x.toString().includes('canUseCustomStickersEverywhere'),
    isSendableSticker: (x) =>
      typeof x === 'function' && !x.toString().includes('canUseCustomStickersEverywhere'),
  }
);

export default {
  name: 'Unlock Stickers',
  description: 'Fully unlocks stickers.',
  apply(finale, patcher) {
    patcher.instead(stickerSendability, 'getStickerSendability', (_, args, callback) => {
      const { stickerBypass, forceStickersUnlocked } = SettingsStore.getAll();
      if (!stickerBypass && !forceStickersUnlocked) return callback.apply(_, args);

      return 0;
    });
    patcher.instead(stickerSendability, 'isSendableSticker', (_, args, callback) => {
      const { stickerBypass, forceStickersUnlocked } = SettingsStore.getAll();
      if (!stickerBypass && !forceStickersUnlocked) return callback.apply(_, args);

      return true;
    });
  },
} as Patch;
