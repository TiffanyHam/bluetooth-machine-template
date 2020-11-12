/*
 * @Descripttion:
 * @version:
 * @Author: Tiffany
 * @Date: 2020-11-12 09:49:26
 * @LastEditors: Tiffany
 * @LastEditTime: 2020-11-12 10:24:54
 */
export function getPageTitle(i18n, key) {
  const hasKey = i18n.te(`meta.${key}`);
  const title = i18n.t(`meta.title`);
  if (hasKey) {
    const pageName = i18n.t(`meta.${key}`);
    return `${pageName} - ${title}`;
  }
  return `${title}`;
}
