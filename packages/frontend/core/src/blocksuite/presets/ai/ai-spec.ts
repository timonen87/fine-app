import {
  BlockServiceWatcher,
  type ExtensionType,
  WidgetViewMapIdentifier,
} from '@blocksuite/block-std';
import {
  AFFINE_AI_PANEL_WIDGET,
  AFFINE_EDGELESS_COPILOT_WIDGET,
  AffineAIPanelWidget,
  AffineCodeToolbarWidget,
  AffineFormatBarWidget,
  AffineImageToolbarWidget,
  AffineSlashMenuWidget,
  CodeBlockSpec,
  EdgelessCopilotWidget,
  EdgelessElementToolbarWidget,
  EdgelessRootBlockSpec,
  edgelessRootWigetViewMap,
  ImageBlockSpec,
  PageRootBlockSpec,
  pageRootWidgetViewMap,
  ParagraphBlockService,
  ParagraphBlockSpec,
} from '@blocksuite/blocks';
import { assertInstanceOf } from '@blocksuite/global/utils';
import { literal, unsafeStatic } from 'lit/static-html.js';

import { buildAIPanelConfig } from './ai-panel';
import { setupCodeToolbarEntry } from './entries/code-toolbar/setup-code-toolbar';
import {
  setupEdgelessCopilot,
  setupEdgelessElementToolbarEntry,
} from './entries/edgeless/index';
import { setupFormatBarEntry } from './entries/format-bar/setup-format-bar';
import { setupImageToolbarEntry } from './entries/image-toolbar/setup-image-toolbar';
import { setupSlashMenuEntry } from './entries/slash-menu/setup-slash-menu';
import { setupSpaceEntry } from './entries/space/setup-space';

class AIPageRootWatcher extends BlockServiceWatcher {
  static override readonly flavour = 'affine:page';

  override mounted() {
    super.mounted();
    this.blockService.specSlots.widgetConnected.on(view => {
      if (view.component instanceof AffineAIPanelWidget) {
        view.component.style.width = '630px';
        view.component.config = buildAIPanelConfig(view.component);
        setupSpaceEntry(view.component);
      }

      if (view.component instanceof AffineFormatBarWidget) {
        setupFormatBarEntry(view.component);
      }

      if (view.component instanceof AffineSlashMenuWidget) {
        setupSlashMenuEntry(view.component);
      }
    });
  }
}

export const AIPageRootBlockSpec: ExtensionType[] = [
  ...PageRootBlockSpec,
  AIPageRootWatcher,
  {
    setup: di => {
      di.override(WidgetViewMapIdentifier('affine:page'), () => {
        return {
          ...pageRootWidgetViewMap,
          [AFFINE_AI_PANEL_WIDGET]: literal`${unsafeStatic(
            AFFINE_AI_PANEL_WIDGET
          )}`,
        };
      });
    },
  },
];

class AIEdgelessRootWatcher extends BlockServiceWatcher {
  static override readonly flavour = 'affine:page';

  override mounted() {
    super.mounted();
    this.blockService.specSlots.widgetConnected.on(view => {
      if (view.component instanceof AffineAIPanelWidget) {
        view.component.style.width = '430px';
        view.component.config = buildAIPanelConfig(view.component);
        setupSpaceEntry(view.component);
      }

      if (view.component instanceof EdgelessCopilotWidget) {
        setupEdgelessCopilot(view.component);
      }

      if (view.component instanceof EdgelessElementToolbarWidget) {
        setupEdgelessElementToolbarEntry(view.component);
      }

      if (view.component instanceof AffineFormatBarWidget) {
        setupFormatBarEntry(view.component);
      }

      if (view.component instanceof AffineSlashMenuWidget) {
        setupSlashMenuEntry(view.component);
      }
    });
  }
}

export const AIEdgelessRootBlockSpec: ExtensionType[] = [
  ...EdgelessRootBlockSpec,
  AIEdgelessRootWatcher,
  {
    setup: di => {
      di.override(WidgetViewMapIdentifier('affine:page'), () => {
        return {
          ...edgelessRootWigetViewMap,
          [AFFINE_EDGELESS_COPILOT_WIDGET]: literal`${unsafeStatic(
            AFFINE_EDGELESS_COPILOT_WIDGET
          )}`,
          [AFFINE_AI_PANEL_WIDGET]: literal`${unsafeStatic(
            AFFINE_AI_PANEL_WIDGET
          )}`,
        };
      });
    },
  },
];

class AIParagraphBlockWatcher extends BlockServiceWatcher {
  static override readonly flavour = 'affine:paragraph';

  override mounted() {
    super.mounted();
    const service = this.blockService;
    assertInstanceOf(service, ParagraphBlockService);
    service.placeholderGenerator = model => {
      if (model.type === 'text') {
        return "Type '/' for commands, 'space' for AI";
      }

      const placeholders = {
        h1: 'Heading 1',
        h2: 'Heading 2',
        h3: 'Heading 3',
        h4: 'Heading 4',
        h5: 'Heading 5',
        h6: 'Heading 6',
        quote: '',
      };
      return placeholders[model.type];
    };
  }
}

export const AIParagraphBlockSpec: ExtensionType[] = [
  ...ParagraphBlockSpec,
  AIParagraphBlockWatcher,
];

class AICodeBlockWatcher extends BlockServiceWatcher {
  static override readonly flavour = 'affine:code';

  override mounted() {
    super.mounted();
    const service = this.blockService;
    service.specSlots.widgetConnected.on(view => {
      if (view.component instanceof AffineCodeToolbarWidget) {
        setupCodeToolbarEntry(view.component);
      }
    });
  }
}

export const AICodeBlockSpec: ExtensionType[] = [
  ...CodeBlockSpec,
  AICodeBlockWatcher,
];

class AIImageBlockWatcher extends BlockServiceWatcher {
  static override readonly flavour = 'affine:image';

  override mounted() {
    super.mounted();
    this.blockService.specSlots.widgetConnected.on(view => {
      if (view.component instanceof AffineImageToolbarWidget) {
        setupImageToolbarEntry(view.component);
      }
    });
  }
}

export const AIImageBlockSpec: ExtensionType[] = [
  ...ImageBlockSpec,
  AIImageBlockWatcher,
];
