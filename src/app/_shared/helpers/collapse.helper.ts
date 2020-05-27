export class CollapseHelper {
  public static toggle(elementId: string): boolean {
    const element = document.getElementById(elementId);

    if (element) {
      const isCollapsed = element.getAttribute('data-collapsed') === 'true';

      if (isCollapsed) {
        CollapseHelper.expand(element);
      } else {
        CollapseHelper.collapse(element);
      }

      return true;
    }

    return false;
  }

  public static expand(element: HTMLElement) {
    const elementHeight = element.scrollHeight;

    element.style.height = elementHeight + 'px';

    const callback = () => {
      element.removeEventListener('transitionend', callback);
      element.style.height = 'auto';
    };

    element.addEventListener('transitionend', callback);

    element.setAttribute('data-collapsed', 'false');
  }

  public static collapse(element: HTMLElement) {
    const elementHeight = element.scrollHeight;

    element.style.transition = '';

    window.requestAnimationFrame(() => {
      element.style.height = elementHeight + 'px';
      element.style.transition = 'height .3s';

      requestAnimationFrame(() => {
        element.style.height = '0px';
      });
    });

    element.setAttribute('data-collapsed', 'true');
  }
}
