/**
 * bdapi.d.ts
 *
 * Unofficial TypeScript declarations for BetterDiscord's `BdApi`, generated
 * from BetterDiscord's internal source (src/betterdiscord/api/*.ts and
 * src/betterdiscord/index.tsx). This covers the public surface exposed on
 * `window.BdApi` that plugins interact with.
 *
 * Usage:
 *   /// <reference path="./bdapi.d.ts" />
 * or add this file to your `include`/`typeRoots` in index.ts.
 */
import type { FluxStore } from 'discord-types/stores';

declare global {
  // ---------------------------------------------------------------------
  // Shared / generic helpers
  // ---------------------------------------------------------------------

  namespace BdApiTypes {
    type ModuleExports = any;

    /** Raw webpack module wrapper (only present when `raw: true` is used). */
    interface WebpackModule {
      id: number | string;
      exports: ModuleExports;
      loaded?: boolean;
      [key: string]: any;
    }

    /** A filter function used to locate webpack modules. */
    type ModuleFilter = (
      exports: ModuleExports,
      module?: WebpackModule,
      moduleId?: number | string
    ) => boolean;

    /** A filter function used to locate a declaration within a module (mangled search). */
    type DeclarationFilter = (value: any) => boolean;

    interface BaseModuleOptions {
      /** Only look inside the default export. Default: `true`. */
      defaultExport?: boolean;
      /** Search every export of the module, not just default. Default: `false`. */
      searchExports?: boolean;
      /** Return the raw webpack module object instead of its exports. Default: `false`. */
      raw?: boolean;
      /** Throw instead of returning `undefined` when nothing is found. Default: `false`. */
      fatal?: boolean;
      /** Optional filter run on the resolved module's `declarations` for mangled unwrapping. */
      declarationFilter?: DeclarationFilter;
    }

    interface GetModuleOptions extends BaseModuleOptions {
      /** When `false`, returns every matching module instead of just the first. Default: `true`. */
      first?: boolean;
    }

    interface GetAllModulesOptions extends BaseModuleOptions {}

    interface WaitForModuleOptions extends BaseModuleOptions {
      /** AbortSignal used to cancel waiting for the module. */
      signal?: AbortSignal;
    }

    interface GetByIdOptions {
      raw?: boolean;
      fatal?: boolean;
    }

    interface GetProxyOptions extends BaseModuleOptions {}

    interface GetMangledOptions extends BaseModuleOptions {}

    /** Object whose values are `DeclarationFilter`s; each key becomes a property on the returned object. */
    type MangledMap = Record<string, DeclarationFilter>;

    interface BulkQuery extends GetModuleOptions {
      filter: ModuleFilter;
      /** When true, collects every match for this query instead of the first. */
      all?: boolean;
      map?: MangledMap;
    }

    // -- Filters ----------------------------------------------------------

    interface Filters {
      byKeys(...keys: string[]): ModuleFilter;
      byPrototypeKeys(...props: string[]): ModuleFilter;
      byRegex(regex: RegExp): ModuleFilter;
      bySource(...searches: (string | RegExp)[]): ModuleFilter;
      byStrings(...strings: string[]): ModuleFilter;
      byDisplayName(name: string): ModuleFilter;
      byStoreName(name: string): ModuleFilter;
      combine(...filters: ModuleFilter[]): ModuleFilter;
      not(filter: ModuleFilter): ModuleFilter;
      byComponentType(filter: (component: React.ComponentType<any>) => boolean): ModuleFilter;
    }

    // -- Patcher ------------------------------------------------------------

    type PatchType = 'before' | 'instead' | 'after';

    interface PatchChild {
      caller: string;
      type: PatchType;
      id: number;
      callback: Function;
      unpatch(): void;
    }

    interface Patcher {
      before<T extends object = any>(
        caller: string,
        moduleToPatch: T,
        functionName: keyof T & string,
        callback: (thisObject: T, args: any[]) => void
      ): () => void;

      instead<T extends object = any>(
        caller: string,
        moduleToPatch: T,
        functionName: keyof T & string,
        callback: (thisObject: T, args: any[], originalFunction: Function) => any
      ): () => void;

      after<T extends object = any>(
        caller: string,
        moduleToPatch: T,
        functionName: keyof T & string,
        callback: (thisObject: T, args: any[], returnValue: any) => any
      ): () => void;

      getPatchesByCaller(caller: string): PatchChild[];
      unpatchAll(caller: string): void;
    }

    interface BoundPatcher {
      before<T extends object = any>(
        moduleToPatch: T,
        functionName: keyof T & string,
        callback: (thisObject: T, args: any[]) => void
      ): () => void;

      instead<T extends object = any>(
        moduleToPatch: T,
        functionName: keyof T & string,
        callback: (thisObject: T, args: any[], originalFunction: Function) => any
      ): () => void;

      after<T extends object = any>(
        moduleToPatch: T,
        functionName: keyof T & string,
        callback: (thisObject: T, args: any[], returnValue: any) => any
      ): () => void;

      getPatchesByCaller(): PatchChild[];
      unpatchAll(): void;
    }

    // -- Data -----------------------------------------------------------

    interface Data {
      save(pluginName: string, key: string, data: any): void;
      load<T = any>(pluginName: string, key: string): T;
      recache(pluginName: string): Promise<boolean>;
      delete(pluginName: string, key: string): void;
    }

    interface BoundData {
      save(key: string, data: any): void;
      load<T = any>(key: string): T;
      recache(): Promise<boolean>;
      delete(key: string): void;
    }

    // -- DOM --------------------------------------------------------------

    interface CreateElementOptions {
      [key: string]: any;
      target?: string | Element;
    }

    interface DOMBase {
      readonly screenWidth: number;
      readonly screenHeight: number;

      onRemoved(node: Node, callback: () => void): () => void;
      onAdded(selector: string, callback: (element: Element) => void): () => void;
      animate(
        update: (progress: number) => void,
        duration: number,
        options?: { timing?: (t: number) => number }
      ): () => void;
      createElement<K extends keyof HTMLElementTagNameMap>(
        tag: K,
        options?: CreateElementOptions,
        ...children: (Node | string)[]
      ): HTMLElementTagNameMap[K];
      createElement(
        tag: string,
        options?: CreateElementOptions,
        ...children: (Node | string)[]
      ): HTMLElement;
      parseHTML(html: string, fragment?: false): Node | NodeListOf<ChildNode>;
      parseHTML(html: string, fragment: true): DocumentFragment;
    }

    interface DOM extends DOMBase {
      addStyle(id: string, css: string): void;
      removeStyle(id: string): void;
    }

    interface BoundDOM extends DOMBase {
      /** If css is omitted, id defaults to the bound plugin name. */
      addStyle(id: string, css?: string): void;
      removeStyle(id?: string): void;
    }

    // -- Logger -----------------------------------------------------------

    interface Logger {
      stacktrace(pluginName: string, message: string, error: any): void;
      error(pluginName: string, ...messages: any[]): void;
      warn(pluginName: string, ...messages: any[]): void;
      info(pluginName: string, ...messages: any[]): void;
      debug(pluginName: string, ...messages: any[]): void;
      log(pluginName: string, ...messages: any[]): void;
    }

    interface BoundLogger {
      stacktrace(message: string, error: any): void;
      error(...messages: any[]): void;
      warn(...messages: any[]): void;
      info(...messages: any[]): void;
      debug(...messages: any[]): void;
      log(...messages: any[]): void;
    }

    // -- Webpack ------------------------------------------------------------

    interface Webpack {
      readonly modules: Record<string | number, ModuleExports>;
      readonly Stores: Record<string, any>;
      readonly Filters: Filters;

      getWithKey<T = any>(
        filter: ModuleFilter,
        options?: BaseModuleOptions
      ): [T | undefined, string | undefined];

      getModule<T = any>(filter: ModuleFilter, options?: GetModuleOptions & { first: false }): T[];
      getModule<T = any>(filter: ModuleFilter, options?: GetModuleOptions): T | undefined;

      getModules<T = any>(filter: ModuleFilter, options?: GetAllModulesOptions): T[];

      getBulk(...queries: BulkQuery[]): any[];
      getBulkKeyed(queries: Record<string, BulkQuery>): Record<string, any>;

      waitForModule<T = any>(
        filter: ModuleFilter,
        options?: WaitForModuleOptions
      ): Promise<T | undefined>;

      getByRegex<T = any>(regex: RegExp, options?: GetModuleOptions): T | undefined;
      getAllByRegex<T = any>(regex: RegExp, options?: GetAllModulesOptions): T[];

      getMangled<T = Record<string, any>>(
        filter: ModuleFilter | string | RegExp,
        mangled: MangledMap,
        options?: GetMangledOptions
      ): T;

      getByPrototypeKeys<T = any>(
        ...args: [...props: string[], options?: GetModuleOptions]
      ): T | undefined;
      getAllByPrototypeKeys<T = any>(
        ...args: [...props: string[], options?: GetAllModulesOptions]
      ): T[];

      getByKeys<T = any>(...args: [...props: string[], options?: GetModuleOptions]): T | undefined;
      getAllByKeys<T = any>(...args: [...props: string[], options?: GetAllModulesOptions]): T[];

      getByStrings<T = any>(
        ...args: [...strings: string[], options?: GetModuleOptions]
      ): T | undefined;
      getAllByStrings<T = any>(
        ...args: [...strings: string[], options?: GetAllModulesOptions]
      ): T[];

      getBySource<T = any>(
        ...args: [...searches: (string | RegExp)[], options?: GetModuleOptions]
      ): T | undefined;
      getAllBySource<T = any>(
        ...args: [...searches: (string | RegExp)[], options?: GetAllModulesOptions]
      ): T[];

      getStore<T = any>(name: string): T | undefined;
      getById<T = any>(id: number | string, options?: GetByIdOptions): T | undefined;

      getProxy<T = any>(filter: ModuleFilter, options?: GetProxyOptions): T;
      getMangledProxy<T = Record<string, any>>(
        filter: ModuleFilter,
        mangled: MangledMap,
        options?: GetMangledOptions
      ): T;
    }

    // -- ContextMenu --------------------------------------------------------

    type MenuColor = 'default' | 'brand' | 'danger' | 'premium' | 'premium-gradient' | 'success';

    type MenuBadge = string | { type: string; [key: string]: any };

    interface MenuIconAccessory {
      type: 'icon';
      icon: React.ComponentType<any>;
      color?: string;
      className?: string;
      [key: string]: any;
    }

    interface MenuEmojiAccessory {
      type: 'emoji';
      emojiId?: string;
      src?: string;
      animated?: boolean;
    }

    interface MenuImageAccessory {
      type: 'image';
      src: string;
    }

    interface MenuAvatarAccessory {
      type: 'avatar';
      src: string;
    }

    interface MenuRoleDotAccessory {
      type: 'roleDot';
      variant: 'dot' | 'pill';
      color: string;
      colors?: string[] | null;
    }

    interface MenuStatusAccessory {
      type: 'status';
      status: string;
    }

    interface MenuGuildTagAccessory {
      type: 'guildTag';
      element: React.ReactNode;
    }

    /** Left-hand accessory rendered before an item's label (icon, emoji, avatar, role dot, presence status, guild tag). */
    type MenuAccessory =
      | MenuIconAccessory
      | MenuEmojiAccessory
      | MenuImageAccessory
      | MenuAvatarAccessory
      | MenuRoleDotAccessory
      | MenuStatusAccessory
      | MenuGuildTagAccessory;

    /** Right-hand icon indicator, distinct from the submenu caret. */
    interface MenuTrailingIndicator {
      type: string;
      icon: React.ComponentType<any>;
      color?: string;
      className?: string;
      [key: string]: any;
    }

    interface BaseMenuItemProps {
      id: string;
      color?: MenuColor;
      disabled?: boolean;
      navigable?: boolean;
    }

    interface ContextMenuItemProps extends BaseMenuItemProps {
      label?: React.ReactNode;
      icon?: React.ComponentType<any> | React.ReactNode;
      iconLeft?: React.ComponentType<any> | React.ReactNode;
      leadingAccessory?: MenuAccessory;
      trailingIndicator?: MenuTrailingIndicator;
      shortcut?: React.ReactNode;
      subtext?: React.ReactNode;
      subtextLineClamp?: number;
      loading?: boolean;
      badge?: MenuBadge;
      action?: (event: MouseEvent) => void;
      onClick?: (event: MouseEvent) => void;
      /** Fire the action without closing the menu when shift is held. */
      dontCloseOnActionIfHoldingShiftKey?: boolean;
      dontCloseOnAction?: boolean;
      /** Presence of children makes this a submenu item. */
      children?: ContextMenuItemSetup[];
      childRowHeight?: number;
      className?: string;
      focusedClassName?: string;
      [key: string]: any;
    }

    interface ContextMenuCheckboxItemProps extends BaseMenuItemProps {
      label?: React.ReactNode;
      checked: boolean;
      subtext?: React.ReactNode;
      subtextLineClamp?: number;
      leftIcon?: React.ComponentType<any> | React.ReactNode;
      leadingAccessory?: MenuAccessory;
      action: (event: MouseEvent) => void;
      className?: string;
    }

    interface ContextMenuRadioItemProps extends BaseMenuItemProps {
      label?: React.ReactNode;
      checked: boolean;
      subtext?: React.ReactNode;
      subtextLineClamp?: number;
      leftIcon?: React.ComponentType<any> | React.ReactNode;
      leadingAccessory?: MenuAccessory;
      action: (event: MouseEvent) => void;
    }

    interface ContextMenuSwitchItemProps extends BaseMenuItemProps {
      label?: React.ReactNode;
      subtext?: React.ReactNode;
      subtextLineClamp?: number;
      checked: boolean;
      action: (checked: boolean) => void;
      className?: string;
    }

    interface ContextMenuTextInputItemProps extends BaseMenuItemProps {
      label?: React.ReactNode;
      value: string;
      onChange: (event: any) => void;
      placeholder?: string;
      maxLength?: number;
      'aria-label'?: string;
    }

    interface ContextMenuControlRenderArgs {
      onClose: () => void;
      disabled?: boolean;
      isFocused: boolean;
      onInteraction: (type?: string) => void;
    }

    interface ContextMenuControlItemProps extends BaseMenuItemProps {
      label?: React.ReactNode;
      control: (args: ContextMenuControlRenderArgs, ref: React.Ref<any>) => React.ReactNode;
      showDefaultFocus?: boolean;
      interactive?: boolean;
    }

    interface ContextMenuCustomItemProps extends BaseMenuItemProps {
      keepItemStyles?: boolean;
      action?: (event: MouseEvent) => void;
      dontCloseOnActionIfHoldingShiftKey?: boolean;
      dontCloseOnAction?: boolean;
      render: (ctx: { color: MenuColor; disabled: boolean; isFocused: boolean }) => React.ReactNode;
    }

    interface ContextMenuGroupItem {
      type: 'group';
      label?: string;
      color?: MenuColor;
      items: ContextMenuItemSetup[];
    }

    interface ContextMenuSeparatorItem {
      type: 'separator';
    }

    /** Setup shape accepted by `buildItem`/`buildMenuChildren`/`buildMenu`. `type` defaults to `"text"`. */
    type ContextMenuItemSetup =
      | ({ type?: 'text' } & ContextMenuItemProps)
      | ({ type: 'toggle' } & ContextMenuCheckboxItemProps)
      | ({ type: 'radio' } & ContextMenuRadioItemProps)
      | ({ type: 'switch' } & ContextMenuSwitchItemProps)
      | ({ type: 'textinput' } & ContextMenuTextInputItemProps)
      | ({ type: 'control' } & ContextMenuControlItemProps)
      | ({ type: 'customitem' } & ContextMenuCustomItemProps)
      | ContextMenuGroupItem
      | ContextMenuSeparatorItem;

    interface ContextMenu {
      readonly Separator: React.ComponentType<any>;
      readonly CheckboxItem: React.ComponentType<ContextMenuCheckboxItemProps>;
      readonly RadioItem: React.ComponentType<ContextMenuRadioItemProps>;
      readonly SwitchItem: React.ComponentType<ContextMenuSwitchItemProps>;
      readonly TextInput: React.ComponentType<ContextMenuTextInputItemProps>;
      readonly ControlItem: React.ComponentType<ContextMenuControlItemProps>;
      readonly Group: React.ComponentType<{
        label?: string;
        color?: MenuColor;
        children: React.ReactNode;
      }>;
      readonly Item: React.ComponentType<ContextMenuItemProps>;
      readonly Menu: React.ComponentType<any>;

      patch(
        navId: string,
        callback: (returnValue: React.ReactElement, props: any, instance?: any) => void
      ): () => void;
      unpatch(navId: string, callback: Function): void;

      buildItem(props: ContextMenuItemSetup): React.ReactElement | null;
      buildMenuChildren(setup: ContextMenuItemSetup[]): React.ReactElement[];
      buildMenu(setup: ContextMenuItemSetup[]): React.ComponentType<any>;

      open(
        event: React.MouseEvent | MouseEvent,
        menuComponent: React.ComponentType<any>,
        config?: Record<string, any>
      ): void;

      close(): void;
    }

    // -- Commands -----------------------------------------------------------

    interface CommandOption {
      type: number;
      name: string;
      description: string;
      required?: boolean;
      choices?: Array<{ name: string; value: any }>;
    }

    interface CommandResult {
      content?: string;
      embeds?: any | any[];
    }

    interface Command {
      id: string;
      name: string;
      description: string;
      options?: CommandOption[];
      execute: (
        data: Array<{ name: string; value: any }>,
        ctx: { channel: any; guild: any }
      ) => CommandResult | Promise<CommandResult> | void | Promise<void>;
      [key: string]: any;
    }

    interface CommandTypesEnum {
      readonly OptionTypes: {
        SUB_COMMAND: 1;
        SUB_COMMAND_GROUP: 2;
        STRING: 3;
        INTEGER: 4;
        BOOLEAN: 5;
        USER: 6;
        CHANNEL: 7;
        ROLE: 8;
        MENTIONABLE: 9;
        NUMBER: 10;
        ATTACHMENT: 11;
      };
      readonly CommandTypes: {
        CHAT_INPUT: 1;
        USER: 2;
        MESSAGE: 3;
      };
      readonly InputTypes: {
        BUILT_IN: 0;
        TEXT: 1;
        SEARCH: 2;
        BOT: 3;
        PLACEHOLDER: 4;
      };
      readonly MessageEmbedTypes: {
        IMAGE: 'image';
        VIDEO: 'video';
        LINK: 'link';
        ARTICLE: 'article';
        TWEET: 'tweet';
        RICH: 'rich';
        GIFV: 'gifv';
        APPLICATION_NEWS: 'application_news';
        AUTO_MODERATION_MESSAGE: 'auto_moderation_message';
        AUTO_MODERATION_NOTIFICATION: 'auto_moderation_notification';
        TEXT: 'text';
        POST_PREVIEW: 'post_preview';
        GIFT: 'gift';
        SAFETY_POLICY_NOTICE: 'safety_policy_notice';
        SAFETY_SYSTEM_NOTIFICATION: 'safety_system_notification';
        VOICE_CHANNEL: 'voice_channel';
        GAMING_PROFILE: 'gaming_profile';
      };
    }

    interface CommandAPI extends CommandTypesEnum {
      register(caller: string, command: Command): (() => void) | undefined;
      unregister(caller: string, commandId?: string): void;
      unregisterAll(caller: string): void;
      getCommandsByCaller(caller: string): Command[];
    }

    interface BoundCommandAPI extends CommandTypesEnum {
      register(command: Command): (() => void) | undefined;
      unregister(commandId?: string): void;
      unregisterAll(): void;
      getCommandsByCaller(): Command[];
    }

    // -- Hooks ------------------------------------------------------------

    interface ChangeListenerStore {
      addChangeListener(callback: () => void): () => void;
      removeChangeListener(callback: () => void): void;
    }

    interface HooksBase {
      useStateFromStores<T>(
        stores: ChangeListenerStore | ChangeListenerStore[],
        factory: () => T,
        deps?: any[],
        isStateEqual?: boolean | ((oldState: T, newState: T) => boolean)
      ): T;
      useForceUpdate(): [number, () => void];
    }

    interface Hooks extends HooksBase {
      useData<T = any>(caller: string, key: string): T | undefined;
    }

    interface BoundHooks extends HooksBase {
      useData<T = any>(key: string): T | undefined;
    }

    // -- Net --------------------------------------------------------------

    interface Net {
      fetch(
        input: RequestInfo | URL,
        init?: RequestInit & { timeout?: number | null }
      ): Promise<Response>;
    }

    // -- AddonAPI (Plugins / Themes) -----------------------------------------

    interface Addon {
      id: string;
      name: string;
      author: string;
      description: string;
      version: string;
      filename: string;
      added: number;
      modified: number;
      size: number;
      partial?: boolean;
      [key: string]: any;
    }

    interface AddonAPI {
      readonly folder: string;
      isEnabled(idOrFile: string): boolean;
      enable(idOrFile: string): boolean | undefined;
      disable(idOrFile: string): boolean | undefined;
      toggle(idOrFile: string): void;
      reload(idOrFile: string): boolean;
      get(idOrFile: string): Addon | undefined;
      getAll(): Addon[];
    }

    // -- ReactUtils ---------------------------------------------------------

    interface GetOwnerInstanceOptions {
      include?: string[];
      exclude?: string[];
      filter?: (owner: any) => boolean;
    }

    interface NodePatcherInstance {
      patch(
        node: { type: any },
        callback: (props: any, node: React.ReactNode, instance?: any) => React.ReactNode | void
      ): void;
      destroy(): void;
    }

    interface ReactUtils {
      /** @deprecated */
      readonly rootInstance: any;
      getInternalInstance(node: Element): any;
      getOwnerInstance(node: Element, options?: GetOwnerInstanceOptions): any;
      wrapElement(element: Node | Node[]): React.ComponentType<any>;
      wrapInHooks<T extends Function>(
        functionComponent: T,
        customPatches?: Record<string, Function>
      ): T;
      getType(elementType: any): any;
      createNodePatcher(): NodePatcherInstance;
    }

    // -- Components ---------------------------------------------------------

    interface Components {
      readonly Tooltip: React.ComponentType<any>;
      readonly SettingItem: React.ComponentType<any>;
      readonly ColorInput: React.ComponentType<any>;
      readonly DropdownInput: React.ComponentType<any>;
      readonly KeybindInput: React.ComponentType<any>;
      readonly NumberInput: React.ComponentType<any>;
      readonly RadioInput: React.ComponentType<any>;
      readonly SearchInput: React.ComponentType<any>;
      readonly SliderInput: React.ComponentType<any>;
      readonly SwitchInput: React.ComponentType<any>;
      readonly TextInput: React.ComponentType<any>;
      readonly SettingGroup: React.ComponentType<any>;
      readonly ErrorBoundary: React.ComponentType<any>;
      readonly Text: React.ComponentType<any>;
      readonly Flex: React.ComponentType<any> & {
        Child: React.ComponentType<any>;
        Direction: Record<string, string>;
        Align: Record<string, string>;
        Justify: Record<string, string>;
        Wrap: Record<string, string>;
      };
      readonly Button: React.ComponentType<any> & {
        Looks: Record<string, string>;
        Colors: Record<string, string>;
        Sizes: Record<string, string>;
      };
      readonly Spinner: React.ComponentType<any> & { Type: Record<string, string> };
    }

    // -- UI ---------------------------------------------------------------

    interface ConfirmationModalOptions {
      onClose?: () => void;
      onConfirm?: () => void;
      onCancel?: () => void;
      confirmText?: string | null;
      cancelText?: string | null;
      danger?: boolean;
      key?: string;
      size?: string;
    }

    interface ChangelogEntry {
      title: string;
      type: 'fixed' | 'added' | 'progress' | 'improved';
      items: string[];
      blurb?: string;
    }

    interface ChangelogOptions {
      title?: string;
      subtitle?: string;
      video?: string;
      poster?: string;
      banner?: string;
      blurb?: string;
      changes?: ChangelogEntry[];
      footer?: React.ReactNode;
    }

    interface ToastOptions {
      type?: 'default' | 'info' | 'success' | 'warning' | 'error';
      icon?: boolean;
      timeout?: number;
      forceShow?: boolean;
    }

    interface NoticeButton {
      label: string;
      onClick: (closeNotice: (immediately?: boolean) => void) => void;
    }

    interface NoticeOptions {
      type?: 'info' | 'warning' | 'error' | 'success';
      buttons?: NoticeButton[];
      timeout?: number;
      onClose?: () => void;
    }

    interface NotificationAction {
      label: string;
      onClick?: (event: React.MouseEvent) => void;
      dontClose?: boolean;
      dontCloseOnActionIfHoldingShiftKey?: boolean;
      color?: string;
      look?: string;
    }

    interface NotificationOptions {
      id?: string;
      title?: string;
      content?: React.ReactNode;
      type?: 'info' | 'success' | 'warning' | 'error';
      duration?: number;
      icon?: React.ComponentType<any>;
      actions?: NotificationAction[];
      onClose?: () => void;
    }

    interface NotificationHandle {
      id: string;
      isVisible(): boolean;
      close(): void;
    }

    interface TooltipOptions {
      style?: 'primary' | 'info' | 'success' | 'warn' | 'danger';
      side?: 'top' | 'right' | 'bottom' | 'left';
      preventFlip?: boolean;
      disabled?: boolean;
    }

    interface OpenDialogOptions {
      mode?: 'open' | 'save';
      title?: string;
      defaultPath?: string;
      filters?: Array<{ name: string; extensions: string[] }>;
      multiple?: boolean;
      [key: string]: any;
    }

    interface OpenDialogResult {
      cancelled: boolean;
      filePath?: string;
      filePaths?: string[];
      error?: string;
    }

    type SettingItemUnion =
      | ({ type: 'category'; id: string } & Record<string, any>)
      | ({ type: string; id: string } & Record<string, any>);

    interface BuildSettingsPanelOptions {
      settings: SettingItemUnion[];
      onChange?: (categoryId: string | null, settingId: string, value: any) => void;
      onDrawerToggle?: (categoryId: string, shown: boolean) => void;
      getDrawerState?: (categoryId: string, defaultShown: boolean) => boolean;
    }

    interface FloatingWindowOptions {
      id: string;
      title?: string;
      resizable?: boolean;
      className?: string;
      center?: boolean;
      top?: number;
      left?: number;
      width?: number;
      height?: number;
      minX?: number;
      minY?: number;
      maxX?: number;
      maxY?: number;
      onResize?: () => void;
      onClose?: () => void;
      confirmClose?: boolean | (() => boolean);
      confirmationText?: string;
      children?: React.ReactNode;
    }

    interface FloatingWindowHandle {
      close(): void;
      isOpened(): boolean;
    }

    interface UI {
      alert(title: React.ReactNode, content: React.ReactNode): void;
      showNotification(options: NotificationOptions): NotificationHandle | undefined;
      createTooltip(node: Element, content: string | HTMLElement, options?: TooltipOptions): any;
      showConfirmationModal(
        title: React.ReactNode,
        content: React.ReactNode | React.ReactNode[],
        options?: ConfirmationModalOptions
      ): string | number;
      showChangelogModal(options: ChangelogOptions): string | number;
      showInviteModal(inviteCode: string): Promise<void>;
      showToast(content: string, options?: ToastOptions): void;
      showNotice(
        content: React.ReactNode,
        options?: NoticeOptions
      ): ((immediately?: boolean) => void) | undefined;
      openDialog(options: OpenDialogOptions): Promise<OpenDialogResult>;
      buildSettingItem(setting: SettingItemUnion): React.ReactElement | null;
      buildSettingsPanel(props: BuildSettingsPanelOptions): React.ReactElement;
      openFloatingWindow(window: FloatingWindowOptions): FloatingWindowHandle;
    }

    // -- Utils ------------------------------------------------------------

    interface FindInTreeOptions {
      walkable?: string[] | null;
      ignore?: string[];
    }

    interface StoreConstructor {
      new (): {
        initialize(): void;
        addChangeListener(callback: () => void): () => void;
        removeChangeListener(callback: () => void): void;
        emitChange(): void;
      };
    }

    interface CacheFn {
      <T>(factory: () => T): (() => T) & {
        hasValue(): boolean;
        reset(): void;
        readonly get: T;
        CALL_LIMIT: number;
      };
      proxy<T extends object>(factory: () => T, typeofIsObject?: boolean, CALL_LIMIT?: number): T;
    }

    interface Utils {
      findInTree(
        tree: any,
        searchFilter: string | ((node: any) => boolean),
        options?: FindInTreeOptions
      ): any;
      forceLoad(id: number | string): Promise<any[]>;
      extend<T extends object>(target: T, ...extenders: object[]): T;
      debounce<T extends (...args: any[]) => void>(executor: T, delay: number): T;
      escapeHTML(html: string): string;
      className(...args: any[]): string;
      getNestedValue(object: any, path: string): any;
      semverCompare(currentVersion: string, remoteVersion: string): -1 | 0 | 1;
      mapObject<T = any>(module: any, mappers: MangledMap): T;
      readonly Store: StoreConstructor;
      cache: CacheFn;
    }
  }

  // -------------------------------------------------------------------
  // The BdApi class itself
  // -------------------------------------------------------------------

  /**
   * BetterDiscord's global plugin API, exposed on `window.BdApi`.
   *
   * Can be used statically (`BdApi.Webpack.getModule(...)`) or instantiated
   * with a plugin name (`new BdApi("MyPlugin")`) to receive a scoped
   * instance whose `Patcher`, `Data`, `DOM`, `Logger`, `Commands`, and
   * `Hooks` members are automatically bound to that plugin/caller name.
   */
  class BdApi {
    /** Creates (or retrieves a cached) scoped `BdApi` instance for the given plugin name. */
    constructor(pluginName?: string);

    /** The React module being used inside Discord. */
    static readonly React: typeof import('react');
    readonly React: typeof import('react');

    /** The ReactDOM module being used inside Discord. */
    static readonly ReactDOM: any;
    readonly ReactDOM: any;

    /** A reference string for BD's version. */
    static readonly version: string;
    readonly version: string;

    /** A set of react components plugins can make use of. */
    static readonly Components: BdApiTypes.Components;
    readonly Components: BdApiTypes.Components;

    /** Network related tools. */
    static readonly Net: BdApiTypes.Net;
    readonly Net: BdApiTypes.Net;

    /** Search for webpack modules. */
    static readonly Webpack: BdApiTypes.Webpack;
    readonly Webpack: BdApiTypes.Webpack;

    /** Access installed plugins. */
    static readonly Plugins: BdApiTypes.AddonAPI;
    readonly Plugins: BdApiTypes.AddonAPI;

    /** Access installed themes. */
    static readonly Themes: BdApiTypes.AddonAPI;
    readonly Themes: BdApiTypes.AddonAPI;

    /** General utility functions. */
    static readonly Utils: BdApiTypes.Utils;
    readonly Utils: BdApiTypes.Utils;

    /** Create interfaces (modals, toasts, notices, tooltips, settings panels...). */
    static readonly UI: BdApiTypes.UI;
    readonly UI: BdApiTypes.UI;

    /** Work with React internals. */
    static readonly ReactUtils: BdApiTypes.ReactUtils;
    readonly ReactUtils: BdApiTypes.ReactUtils;

    /** Interact with context menus. */
    static readonly ContextMenu: BdApiTypes.ContextMenu;
    readonly ContextMenu: BdApiTypes.ContextMenu;

    /**
     * Monkey-patch functions.
     * When accessed on a scoped (bound) `BdApi` instance, all methods
     * are already bound to the plugin's caller name.
     */
    static readonly Patcher: BdApiTypes.Patcher;
    readonly Patcher: BdApiTypes.Patcher | BdApiTypes.BoundPatcher;

    /** Manage plugin data. */
    static readonly Data: BdApiTypes.Data;
    readonly Data: BdApiTypes.Data | BdApiTypes.BoundData;

    /** Interact with the DOM. */
    static readonly DOM: BdApiTypes.DOM;
    readonly DOM: BdApiTypes.DOM | BdApiTypes.BoundDOM;

    /** Log information to the console. */
    static readonly Logger: BdApiTypes.Logger;
    readonly Logger: BdApiTypes.Logger | BdApiTypes.BoundLogger;

    /** Add slash commands. */
    static readonly Commands: BdApiTypes.CommandAPI;
    readonly Commands: BdApiTypes.CommandAPI | BdApiTypes.BoundCommandAPI;

    /** React hooks for stores and stored data. */
    static readonly Hooks: BdApiTypes.Hooks;
    readonly Hooks: BdApiTypes.Hooks | BdApiTypes.BoundHooks;
  }

  interface Window {
    BdApi: typeof BdApi;
  }
}

export {};
