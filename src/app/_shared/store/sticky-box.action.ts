import { StickyBoxOptions } from '@shared/models/sticky-box.model';

export class ShowStickyBox {
  public static readonly type = '[Sticky Box] Show';
  constructor(public message: { text: string; options?: any }, public stickyBoxOptions?: StickyBoxOptions) {}
}

export class ChangeHiddenPropertyStickyBox {
  public static readonly type = '[Sticky Box] Change Hidden Property';
  constructor(public hidden: boolean) {}
}
