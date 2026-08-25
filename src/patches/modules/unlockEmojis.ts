import type { Patch } from '../../types/patches';
import { BetterDiscord } from '@shared/';
import SettingsStore from '../../global/stores/SettingsStore.ts';

export default {
  name: 'Unlock Emojis',
  description: 'Fully unlocks emojis.',
  waitFor: [BetterDiscord.Webpack.Filters.byKeys('isEmojiFilteredOrLocked')],
  apply(finale, patcher) {
    ['isEmojiFilteredOrLocked', 'isEmojiDisabled', 'isEmojiFiltered', 'isEmojiPremiumLocked'].map(
      (x) =>
        patcher.instead(finale.modules[0], x, (_, args, callback) => {
          const emojiBypassEnabled = SettingsStore.get('emojiBypass');
          if (emojiBypassEnabled) return false;
          else return callback.apply(_, args);
        })
    );
    patcher.instead(finale.modules[0], 'getEmojiUnavailableReason', (_, args, callback) => {
      const emojiBypassEnabled = SettingsStore.get('emojiBypass');
      if (emojiBypassEnabled) return;
      else return callback.apply(_, args);
    });
  },
} as Patch;
