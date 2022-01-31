import axios from "axios";
import { Socket } from "net";
import { NextApiRequest, NextApiResponse } from "next";
const fsp = require("fs").promises;

interface SocialMediaCard {
    title: string;
    image: string;
    type: string;
    url: string;
    description: string;
}

export interface BetterSocket extends Socket {
    encrypted: boolean;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        const proto =
            req.headers["x-forwarded-proto"] ||
            (req.socket as BetterSocket).encrypted
                ? "https"
                : "http";
        const response = await axios.get(
            `${proto}://${req.headers.host}/social-card.json`
        );
        const card = response.data as SocialMediaCard;
        res.status(200).json(card);
    }
};
export default handler;
