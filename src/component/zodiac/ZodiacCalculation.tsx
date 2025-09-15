import { useState } from "react";

const zodiacData = {
  Aries: "Ram",
  Taurus: "Bull",
  Gemini: "Twins",
  Cancer: "Crab",
  Leo: "Lion",
  Virgo: "Virgin",
  Libra: "Balance",
  Scorpio: "Scorpion",
  Sagittarius: "Archer",
  Capricorn: "Goat",
  Aquarius: "Water Bearer",
  Pisces: "Fish",
};

const getHoroscope = (day, month) => {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) return "Gemini";
  if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) return "Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 23)) return "Libra";
  if ((month === 10 && day >= 24) || (month === 11 && day <= 21)) return "Scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces";
  return "";
};

export default function ZodiacCalculation() {
  const [horoscope, setHoroscope] = useState("");
  const [zodiac, setZodiac] = useState("");

  const calculateZodiac = (date) => {
    if (!date) return;

    const day = date.getDate();
    const month = date.getMonth() + 1;

    const h = getHoroscope(day, month);
    const z = zodiacData[h] || "";

    setHoroscope(h);
    setZodiac(z);

    return { horoscope: h, zodiac: z };
  };

  return { horoscope, zodiac, calculateZodiac };
}
