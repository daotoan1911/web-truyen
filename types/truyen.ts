export type Chapter = {
  slug: string;
  title: string;
  content: string;
};

export type Truyen = {
  slug: string;
  title: string;
  chapters: Chapter[];
};