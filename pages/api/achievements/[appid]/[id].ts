import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { appid, id } = req.query;

  const data = await fetch(
    `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appid}&key=${process.env.STEAM_API_KEY}&steamid=${id}`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.error("Error getting data " + err);
    });

  res.status(200).json({ data: data });
};

export default handler;
