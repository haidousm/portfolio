import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";
import React, { Fragment, useEffect, useState } from "react";
import ShellDemo from "../../components/shell-demo/ShellDemo";

const Shell: NextPage = () => {
    const focusOnCmdInput = () => {
        const cmdInput = document.getElementById("cmd-input");
        if (cmdInput) {
            cmdInput.focus();
        }
    };

    return (
        <div
            className="min-h-screen bg-black bg-opacity-75"
            onClick={focusOnCmdInput}
        >
            <Head>
                <title>Unix Shell | Moussa Haidous</title>
                <meta
                    name="description"
                    content="a simple unix shell built with C | Moussa Haidous | haidousm | github/haidousm | linkedin/in/haidousm"
                />
                <link rel="icon" href="/images/shell-favi.ico" />
            </Head>
            <main className="min-h-screen flex flex-col items-center justify-center font-mac-terminal">
                <ShellDemo />
            </main>
        </div>
    );
};

export default Shell;
