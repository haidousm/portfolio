import axios from "axios";
import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import Dock from "../components/dock/Dock";
import DockIcon from "../components/dock/DockIcon";
import Heading from "../components/homepage/Heading";
import ProjectsContainer from "../components/homepage/ProjectsContainer";
import SocialMediaCard from "../types/SocialMediaCard";
import { BetterSocket } from "./api/social-card";

interface Props {
    socialMediaCard: SocialMediaCard;
}

const Home: NextPage<Props> = ({ socialMediaCard }: Props) => {
    return (
        <div className="min-h-screen bg-black bg-opacity-75">
            <Head>
                <title>Moussa Haidous</title>
                <meta
                    name="description"
                    content="Moussa Haidous, Software Engineer | haidousm | github/haidousm | linkedin/in/haidousm"
                />
                <meta property="og:url" content={socialMediaCard.url} />
                <meta property="og:type" content={socialMediaCard.type} />
                <meta property="og:title" content={socialMediaCard.title} />
                <meta
                    property="og:description"
                    content={socialMediaCard.description}
                />
                <meta property="og:image" content={socialMediaCard.image} />
                <link rel="icon" href="/images/homepage-favi.ico" />
            </Head>
            <main className="flex flex-col items-center font-mac-terminal">
                <Heading />
                <ProjectsContainer />
            </main>
            <footer className="mt-10 h-32 w-full flex items-center justify-center">
                <Dock>
                    <DockIcon
                        href="https://github.com/haidousm"
                        imageSrc="/images/github_logo.png"
                        imageAlt="Github's Logo"
                    />
                    <DockIcon
                        href="https://linkedin.com/in/haidousm"
                        imageSrc="/images/linkedin_logo.png"
                        imageAlt="LinkedIn's Logo"
                        imageClassName="bg-white"
                    />
                </Dock>
            </footer>
        </div>
    );
};

export default Home;
export const getServerSideProps = async (context: NextPageContext) => {
    const proto =
        context.req!.headers["x-forwarded-proto"] ||
        (context.req!.socket as BetterSocket).encrypted
            ? "https"
            : "http";

    const response = await axios.get(
        `${proto}://${context.req!.headers.host}/api/social-card`
    );
    const card = response.data as SocialMediaCard;
    return {
        props: {
            socialMediaCard: card,
        },
    };
};
