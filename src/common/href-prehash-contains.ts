export function hrefPrehashContains(value: string) {
  return window && window.location.href.indexOf(value) !== -1;
}
