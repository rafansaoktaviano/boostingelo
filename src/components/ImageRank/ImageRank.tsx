import React from "react";

export type RankType =
  | "Iron"
  | "Bronze"
  | "Silver"
  | "Gold"
  | "Platinum"
  | "Diamond"
  | "Ascendant"
  | "Immortal";

interface ImageRankProps {
  rank: RankType;
}

const ImageRank: React.FC<ImageRankProps> = ({ rank }) => {
  const image: Record<RankType, string> = {
    Iron: "https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-iron.webp",
    Bronze:
      "https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-bronze.webp",
    Silver:
      "https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-silver.webp",
    Gold: "https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-gold.webp",
    Platinum:
      "https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-platinum.webp",
    Diamond:
      "https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-diamond.webp",
    Ascendant:
      "https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-ascendant.webp",
    Immortal:
      "https://cgtifxvessdrpnjdldcw.supabase.co/storage/v1/object/public/rank_image/valorant/valorant-immortal.webp",
  };

  return <img src={image[rank]} alt="" className="w-[75px] py-[10px]" />;
};

export default ImageRank;
