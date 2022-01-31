import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Canvas from "../../components/canvas/Canvas";
import FineDemo from "../../components/fine-demo/FineDemo";

const Fine: NextPage = () => {
    return (
        <div className="min-h-screen bg-black bg-opacity-75">
            <Head>
                <title>Fine Neural Network</title>
                <meta
                    name="description"
                    content="a demo of Fine, a neural network framework built from scratch in Python | Moussa Haidous | haidousm | github/haidousm | linkedin/in/haidousm"
                />
                <link rel="icon" href="/images/fine-favi.ico" />
            </Head>
            <main className="min-h-screen flex flex-col items-center justify-center font-mac-terminal">
                <FineDemo />
            </main>
        </div>
    );
};

export default Fine;
