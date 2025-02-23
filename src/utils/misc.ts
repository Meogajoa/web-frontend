export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const delay = sleep;

export const getCssVariableValue = (
  variableName: `--color-${string}` | string,
) => {
  const fallback = '#ffffff';

  if (typeof document !== 'undefined') {
    return (
      getComputedStyle(document.documentElement).getPropertyValue(
        variableName,
      ) || fallback
    );
  }

  return fallback;
};
