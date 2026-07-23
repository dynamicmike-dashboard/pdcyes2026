export type EventData = {
  slug: string;
  title: string;
  date: string;
  time?: string;
  venue?: string;
  image?: string;
  speaker1?: string;
  speaker1_image?: string;
  speaker2?: string;
  speaker2_image?: string;
  registration_link?: string;
  body?: string;
  category?: string;
  [key: string]: any;
};
