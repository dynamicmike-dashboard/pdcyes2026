export type EventData = {
  slug: string;
  title: string;
  date: string;
  time?: string;
  venue?: string;
  image?: string;
  speaker1?: string;
  speaker2?: string;
  registration_link?: string;
  body?: string;
  category?: string;
  [key: string]: any;
};
