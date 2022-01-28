import type { NextPage } from "next";
import Head from "next/head";
import Dock from "../components/dock/Dock";
import Heading from "../components/homepage/Heading";
import ProjectsContainer from "../components/homepage/ProjectsContainer";

const Home: NextPage = () => {
    return (
        <div className="min-h-screen bg-black bg-opacity-75">
            <Head>
                <title>Moussa Haidous</title>
                <meta
                    name="description"
                    content="Moussa Haidous, Software Engineer"
                />
                <link rel="icon" href="/images/homepage-favi.ico" />
            </Head>
            <main className="flex flex-col items-center font-mac-terminal">
                <Heading />
                <ProjectsContainer />
            </main>
            <footer className="mt-10 h-32 w-full flex items-center justify-center">
                <Dock />
            </footer>
        </div>
    );
};

export default Home;
