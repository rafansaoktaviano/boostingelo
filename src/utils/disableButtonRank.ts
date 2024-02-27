export const disabledButtonIron = (
  selectedRank: string,
  selectedDivision: string
) => {
  return selectedRank === "Bronze" ||
    (selectedRank === "Iron" && selectedDivision === "3") ||
    selectedRank === "Silver" ||
    selectedRank === "Gold" ||
    selectedRank === "Platinum" ||
    selectedRank === "Diamond" ||
    selectedRank === "Ascendant" ||
    selectedRank === "Immortal"
    ? true
    : false;
};

export const disabledButtonBronze = (
  selectedRank: string,
  selectedDivision: string
) => {
  return (selectedRank === "Bronze" && selectedDivision === "3") ||
    selectedRank === "Silver" ||
    selectedRank === "Gold" ||
    selectedRank === "Platinum" ||
    selectedRank === "Diamond" ||
    selectedRank === "Ascendant" ||
    selectedRank === "Immortal"
    ? true
    : false;
};
export const disabledButtonSilver = (
  selectedRank: string,
  selectedDivision: string
) => {
  return (selectedRank === "Silver" && selectedDivision === "3") ||
    selectedRank === "Gold" ||
    selectedRank === "Platinum" ||
    selectedRank === "Diamond" ||
    selectedRank === "Ascendant" ||
    selectedRank === "Immortal"
    ? true
    : false;
};

export const disabledButtonGold = (
  selectedRank: string,
  selectedDivision: string
) => {
  return (selectedRank === "Gold" && selectedDivision === "3") ||
    selectedRank === "Platinum" ||
    selectedRank === "Diamond" ||
    selectedRank === "Ascendant" ||
    selectedRank === "Immortal"
    ? true
    : false;
};
export const disabledButtonPlatinum = (
  selectedRank: string,
  selectedDivision: string
) => {
  return (selectedRank === "Platinum" && selectedDivision === "3") ||
    selectedRank === "Diamond" ||
    selectedRank === "Ascendant" ||
    selectedRank === "Immortal"
    ? true
    : false;
};
export const disabledButtonDiamond = (
  selectedRank: string,
  selectedDivision: string
) => {
  return (selectedRank === "Diamond" && selectedDivision === "3") ||
    selectedRank === "Ascendant" ||
    selectedRank === "Immortal"
    ? true
    : false;
};
export const disabledButtonAscendant = (
  selectedRank: string,
  selectedDivision: string
) => {
  return (selectedRank === "Ascendant" && selectedDivision === "3") ||
    selectedRank === "Immortal"
    ? true
    : false;
};
