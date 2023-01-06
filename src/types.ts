export enum Status {
  POST = 'Paid',
  IN_PROGRESS = 'In progress',
  UNPOSTED = 'Due',
}

export type TransactionsDataType = {
  id?: number;
  date: string;
  amount_paid: string;
  status: Status;
  reference: string;
  activity_name: string;
  date_received: string;
  payment_type: string;
  payment_method: PaymentCardType;
};

export enum PaymentMethod {
  NEW_CARD = 'newCard',
  CHASE_SAPPHIRE = 'chaseSapphire',
  BARCLAYS_PREMIER = 'barclaysPremier',
  UNITED_MILEAGE_PLUS = 'unitedMileagePlus',
}

export type PaymentCardType = {
  cardType: PaymentMethod;
  name: string;
  image: { src: string; alt: string };
  cardNumber: string;
  cardName: string;
  expDate: string;
  cardCVV: string;
  zip: string;
  cardIsSaved: boolean;
};

export type User = {
  email: string;
  password: string;
  name: string;
};

export type DensityClassKey = 'touchDensity' | 'lowDensity';
