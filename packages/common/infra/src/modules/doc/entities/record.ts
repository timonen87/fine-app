import type { DocMode } from '@blocksuite/blocks';
import type { DocMeta } from '@blocksuite/store';

import { Entity } from '../../../framework';
import { LiveData } from '../../../livedata';
import type { DocsStore } from '../stores/docs';

/**
 * # DocRecord
 *
 * Some data you can use without open a doc.
 */
export class DocRecord extends Entity<{ id: string }> {
  id: string = this.props.id;
  constructor(private readonly docsStore: DocsStore) {
    super();
  }

  meta$ = LiveData.from<Partial<DocMeta>>(
    this.docsStore.watchDocMeta(this.id),
    {}
  );

  setMeta(meta: Partial<DocMeta>): void {
    this.docsStore.setDocMeta(this.id, meta);
  }

  primaryMode$: LiveData<DocMode> = LiveData.from(
    this.docsStore.watchDocPrimaryModeSetting(this.id),
    'page' as DocMode
  ).map(mode => (mode === 'edgeless' ? 'edgeless' : 'page') as DocMode);

  setPrimaryMode(mode: DocMode) {
    return this.docsStore.setDocPrimaryModeSetting(this.id, mode);
  }

  getPrimaryMode() {
    return this.docsStore.getDocPrimaryModeSetting(this.id);
  }

  moveToTrash() {
    return this.setMeta({ trash: true });
  }

  restoreFromTrash() {
    return this.setMeta({ trash: false });
  }

  title$ = this.meta$.map(meta => meta.title ?? '');

  trash$ = this.meta$.map(meta => meta.trash ?? false);
}
