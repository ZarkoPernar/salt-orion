import NewCardIcon from "./assets/icons/NewCard.svg";
import MastercardLogo from "./assets/icons/MastercardLogo.svg";
import ApplePayLogo from "./assets/icons/ApplePayLogo.svg";
import VisaLogo from "./assets/icons/VisaLogo.svg";
import { PaymentMethod } from "./types";
import { EXAMPLE_USER } from "./constants";

const randomPaymentCardNumber = () => {
  let cardNumber = "";

  while (cardNumber.length < 16) {
    const number = Math.floor(Math.random() * 10).toString();
    cardNumber += number;
  }

  return cardNumber;
};

const cardName = EXAMPLE_USER;
const zip = "12345";

const randomExpDate = () => {
  const today = new Date();
  const expMonth = Math.floor(Math.random() * (11 - 1 + 1) + 1);

  const expDateTime = new Date(
    today.getFullYear(),
    today.getMonth() + expMonth,
    1
  ); // x months from today's date

  return new Date(expDateTime).toLocaleDateString(undefined, {
    month: "2-digit",
    year: "2-digit",
  });
};

const commonData = () => ({
  cardNumber: randomPaymentCardNumber(),
  cardName,
  expDate: randomExpDate(),
  cardCVV: "",
  zip,
  cardIsSaved: true,
});

export const paymentCards = [
  {
    cardType: PaymentMethod.NEW_CARD,
    name: "Add new card",
    image: { src: NewCardIcon, alt: "New card" },
    cardNumber: "",
    cardName: "",
    expDate: "",
    cardCVV: "",
    zip: "",
    cardIsSaved: false,
  },
  {
    cardType: PaymentMethod.CHASE_SAPPHIRE,
    name: "Chase Sapphire",
    image: { src: MastercardLogo, alt: "Mastercard" },
    ...commonData(),
  },
  {
    cardType: PaymentMethod.BARCLAYS_PREMIER,
    name: "Barclays Premier",
    image: { src: ApplePayLogo, alt: "Apple pay" },
    ...commonData(),
  },
  {
    cardType: PaymentMethod.UNITED_MILEAGE_PLUS,
    name: "United Mileage Plus",
    image: { src: VisaLogo, alt: "Visa" },
    ...commonData(),
  },
];
