import { of } from 'rxjs';

export class AppServiceMock {
  public static instance(): any {
    return {
      onAppUrlOpen$: of()
    };
  }
}
