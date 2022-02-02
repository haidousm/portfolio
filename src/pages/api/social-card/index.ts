import axios from "axios";
import { Socket } from "net";
import { NextApiRequest, NextApiResponse } from "next";
import SocialMediaCard from "../../../types/SocialMediaCard";
const fsp = require("fs").promises;

export interface BetterSocket extends Socket {
    encrypted: boolean;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        const card = (await fsp.readFile(
            "./public/social-card.json"
        )) as SocialMediaCard;
        res.status(200).json(card);
    } else if (req.method === "POST") {
        const card = req.body as SocialMediaCard;
        await fsp.writeFile("./public/social-card.json", JSON.stringify(card));
        res.status(200).json(card);
    }
};
export default handler;
