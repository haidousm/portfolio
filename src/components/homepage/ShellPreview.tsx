/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from "react";
import ContainerOverlay from "../container-overlay/ContainerOverlay";
import Terminal from "../terminal/Terminal";

function ShellPreview() {
    const [shellPreviewRange, setShellPreviewRange] = useState({
        start: 0,
        end: 10,
    });
    const shellPreviewLines = [
        "root@haidousm.com $ ls -al",
        "drwx------@  99 moussa  staff    3168 Dec  3 07:53 Library",
        "drwxr-xr-x   10 moussa  staff     320 Jan 12 13:15 Local Sites",
        "drwx------+  12 moussa  staff     384 Oct  6 21:17 Movies",
        "drwx------+   8 moussa  staff     256 Jul 28 17:12 Music",
        "drwx------    3 moussa  staff      96 Oct  9 13:56 Parallels",
        "drwx------+  11 moussa  staff     352 Sep 28 12:52 Pictures",
        "drwxr-xr-x+   4 moussa  staff     128 Dec 29 12:20 Public",
        "drwxr-xr-x    4 moussa  staff     128 Dec 27 17:09 PycharmProjects",
        "drwxr-xr-x    6 moussa  staff     192 Aug 20 00:02 WindowsSupport",
        "root@haidousm.com $ git init",
        "Initialized empty Git repository in /haidousm/demo/.git/",
        "root@haidousm.com $ git commit -m 'say hi to person looking at demo'",
        "[master (root-commit) b79b542] say hi to person looking at demo ",
        "3 files changed, 286 insertions(+)",
        "create mode 100644 github_logo.png",
        "create mode 100644 index.html",
        "create mode 100644 linkedin_logo.png",
        "root@haidousm.com $ ps aux | grep node",
        "PID TTY          TIME CMD",
        "  1 ?        00:00:00 bash",
        "  2 ?        00:00:00 ps aux",
        "  3 ?        00:00:00 node /haidousm/demo/server.js",
        "root@haidousm.com $ git status",
        "On branch master",
        "Your branch is up-to-date with 'origin/master'.",
        "Changes not staged for commit:",
        '  (use "git add <file>..." to update what will be committed)',
        '  (use "git checkout -- <file>..." to discard changes in working directory)',
        'no changes added to commit (use "git add" and/or "git commit -a")',
    ];

    useEffect(() => {
        const intervalID = setInterval(() => {
            setShellPreviewRange((prevState) => {
                const newStart = prevState.start + 1;
                const newEnd = prevState.end + 1;
                if (newEnd >= shellPreviewLines.length) {
                    return { start: 0, end: 10 };
                }
                return { start: newStart, end: newEnd };
            });
        }, 1000);
        return () => clearInterval(intervalID);
    }, []);

    return (
        <ContainerOverlay>
            <Terminal statusBarHTML={<Fragment> UNIX Shell </Fragment>}>
                <div
                    className="m-1 text-white relative text-left flex flex-col h-full text-xs"
                    data-nosnippet
                >
                    {shellPreviewLines
                        .slice(shellPreviewRange.start, shellPreviewRange.end)
                        .map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                </div>
            </Terminal>
            <Fragment>
                <h3 className="text-2xl text-white text-center">Unix Shell</h3>
                <div
                    className="
                                    container
                                    flex
                                    items-center
                                    justify-around
                                "
                >
                    <a
                        className="
                                        text-white
                                        border border-white
                                        text-2xl
                                        rounded-xl
                                        p-2
                                        hover:bg-white hover:text-black
                                    "
                        href="/shell"
                    >
                        Demo
                    </a>
                    <a
                        className="
                                         text-white
                                        border border-white
                                        text-2xl
                                        rounded-xl
                                        p-2
                                        hover:bg-white hover:text-black
                                    "
                        href="https://github.com/haidousm/unix-shell"
                    >
                        GitHub
                    </a>
                </div>
            </Fragment>
        </ContainerOverlay>
    );
}

export default ShellPreview;
