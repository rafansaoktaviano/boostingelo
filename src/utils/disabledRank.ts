export const disabledIron = (selectedRank: string) => {
  return selectedRank === "Bronze" ||
    selectedRank === "Silver" ||
    selectedRank === "Gold" ||
    selectedRank === "Platinum" ||
    selectedRank === "Diamond" ||
    selectedRank === "Ascendant" ||
    selectedRank === "Immortal"
    ? "cursor-not-allowed"
    : "cursor-pointer";
};
export const disabledBronze = (selectedRank: string) => {
  return selectedRank === "Silver" ||
    selectedRank === "Gold" ||
    selectedRank === "Platinum" ||
    selectedRank === "Diamond" ||
    selectedRank === "Ascendant" ||
    selectedRank === "Immortal"
    ? "cursor-not-allowed"
    : "cursor-pointer";
};
export const disabledSilver = (selectedRank: string) => {
  return selectedRank === "Gold" ||
    selectedRank === "Platinum" ||
    selectedRank === "Diamond" ||
    selectedRank === "Ascendant" ||
    selectedRank === "Immortal"
    ? "cursor-not-allowed"
    : "cursor-pointer";
};

export const disabledGold = (selectedRank: string) => {
  return selectedRank === "Platinum" ||
    selectedRank === "Diamond" ||
    selectedRank === "Ascendant" ||
    selectedRank === "Immortal"
    ? "cursor-not-allowed"
    : "cursor-pointer";
};
export const disabledPlatinum = (selectedRank: string) => {
  return selectedRank === "Diamond" ||
    selectedRank === "Ascendant" ||
    selectedRank === "Immortal"
    ? "cursor-not-allowed"
    : "cursor-pointer";
};
export const disabledDiamond = (selectedRank: string) => {
  return selectedRank === "Ascendant" || selectedRank === "Immortal"
    ? "cursor-not-allowed"
    : "cursor-pointer";
};
export const Ascendant = (selectedRank: string) => {
  return selectedRank === "Immortal" ? "cursor-not-allowed" : "cursor-pointer";
};
