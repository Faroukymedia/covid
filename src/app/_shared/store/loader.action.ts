const LOADER_DEFAULT_TEXT = 'Chargement...';

export class ShowLoader {
    public static readonly type = '[Loader] Show';
    constructor(public text: string = LOADER_DEFAULT_TEXT) {}
}

export class HideLoader {
    public static readonly type = '[Loader] Hide';
}
