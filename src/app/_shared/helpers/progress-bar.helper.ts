export class ProgressBarHelper {
  public static updateProgressBar(params: { stepURI: string[]; steps: any[]; currentStepName: string }) {
    const currentStepIndex = params.stepURI.indexOf(params.currentStepName);

    for (let it = 0; it < params.steps.length; it++) {
      const step = params.steps[it];
      if (it < currentStepIndex || step.status === 'active') {
        step.status = 'compiled';
      } else if (it === currentStepIndex) {
        step.status = 'active';
      }
    }
    return [...params.steps];
  }
}
