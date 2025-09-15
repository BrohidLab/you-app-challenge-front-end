
export const formatDate = (date) => {
  if (!(date instanceof Date) || isNaN(date)) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export const formatBirthdayWithAge = (birthday) => {
  let birthDate;

  if (typeof birthday === "string") {
    const [day, month, year] = birthday.split("-").map(Number);
    birthDate = new Date(year, month - 1, day);
  } else if (birthday instanceof Date) {
    birthDate = birthday;
    birthday = `${String(birthDate.getDate()).padStart(2, "0")}-${String(birthDate.getMonth() + 1).padStart(2, "0")}-${birthDate.getFullYear()}`;
  } else {
    return "";
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return `${birthday} (${age} age)`;
}

export const getAge = (birthday) => {
  let birthDate;

  if (typeof birthday === "string") {
    const [day, month, year] = birthday.split("-").map(Number);
    birthDate = new Date(year, month - 1, day);
  } else if (birthday instanceof Date) {
    birthDate = birthday;
    birthday = `${String(birthDate.getDate()).padStart(2, "0")}-${String(birthDate.getMonth() + 1).padStart(2, "0")}-${birthDate.getFullYear()}`;
  } else {
    return "";
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
}
