import type { NextPage } from "next";
import Head from "next/head";
import Heading from "../components/homepage/Heading";
import ProjectsContainer from "../components/homepage/ProjectsContainer";

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Moussa Haidous</title>
                <meta
                    name="description"
                    content="Moussa Haidous, Software Engineer"
                />
                <link rel="icon" href="/images/homepage-favi.ico" />
            </Head>
            <main className="bg-black bg-opacity-75 min-h-screen flex flex-col items-center font-mac-terminal">
                <Heading />
                <ProjectsContainer />
            </main>
        </div>
    );
};

export default Home;
