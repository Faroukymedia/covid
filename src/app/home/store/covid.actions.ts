export class HomePageGetWorldSummary {
    public static readonly type = '[HomePage] Get world summary';
    constructor() {}
  }

export class HomePageGetPosition {
  public static readonly type = '[HomePage] Get client position';
  constructor(public latitude: string, public longitude: string) {}
}
