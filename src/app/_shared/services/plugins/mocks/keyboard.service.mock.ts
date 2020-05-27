import { of } from 'rxjs';

export class KeyboardServiceMock {
  public static instance(): any {
    return {
      onKeyboardWillShow$: of(),
      onKeyboardWillHide$: of(),
      onKeyboardDidShow$: of(),
      onKeyboardDidHide$: of()
    };
  }
}
