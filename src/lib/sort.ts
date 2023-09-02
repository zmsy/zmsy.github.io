/**
 * Sorting functions for displaying content.
 */
type DatedContent = { data: { publishDate: Date } };
export const sortPublishDateDesc = <T extends DatedContent>(
  a: T,
  b: T,
): number => b.data.publishDate.valueOf() - a.data.publishDate.valueOf();
