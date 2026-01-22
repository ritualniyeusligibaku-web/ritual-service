interface LocalizedString {
  az: string;
  ru: string;
  en: string;
}

export interface Service {
  _id: string;
  name: LocalizedString;
  slug: string;
  description: LocalizedString;
  image: string;
  title1?: LocalizedString;
  paragraph1?: LocalizedString;
  title2?: LocalizedString;
  paragraph2?: LocalizedString;
  title3?: LocalizedString;
  paragraph3?: LocalizedString;
  title4?: LocalizedString;
  paragraph4?: LocalizedString;
  title5?: LocalizedString;
  paragraph5?: LocalizedString;
  title6?: LocalizedString;
  paragraph6?: LocalizedString;
  title7?: LocalizedString;
  paragraph7?: LocalizedString;
  createdAt: string;
  updatedAt: string;
}