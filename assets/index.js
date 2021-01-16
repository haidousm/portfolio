const goTo = (url) => {
    window.location.href = url;
};

pTags = [];
const createShellDemo = () => {
    shellOutputLines = [
        "ls -al",
        "drwx------@  99 moussa  staff    3168 Dec  3 07:53 Library<br> drwxr-xr-x   10 moussa  staff     320 Jan 12 13:15 Local Sites<br> drwx------+  12 moussa  staff     384 Oct  6 21:17 Movies<br> drwx------+   8 moussa  staff     256 Jul 28 17:12 Music<br> drwx------    3 moussa  staff      96 Oct  9 13:56 Parallels<br> drwx------+  11 moussa  staff     352 Sep 28 12:52 Pictures<br> drwxr-xr-x+   4 moussa  staff     128 Dec 29 12:20 Public<br> drwxr-xr-x    4 moussa  staff     128 Dec 27 17:09 PycharmProjects<br> drwxr-xr-x    6 moussa  staff     192 Aug 20 00:02 WindowsSupport",
        "git init",
        "Initialized empty Git repository in /haidousm/demo/.git/",
        "git commit -m 'say hi to person looking at demo'",
        "[master (root-commit) b79b542] say hi to person looking at demo <br> 3 files changed, 286 insertions(+) <br> create mode 100644 github_logo.png <br> create mode 100644 index.html <br> create mode 100644 linkedin_logo.png",
    ];

    for (var i = 0; i < shellOutputLines.length; i++) {
        const pTag = document.createElement("p");
        pTag.id = i;
        if (i % 2 == 0) {
            pTag.innerHTML = "root@haidousm.com $ " + shellOutputLines[i];
        } else {
            pTag.innerHTML = shellOutputLines[i];
        }

        pTags.push(pTag);
    }
};

const startShellDemo = (i) => {
    pTag = pTags[i];
    document.getElementsByClassName("output-container")[0].appendChild(pTag);

    if (i % 2 == 1 && i - 2 >= 0) {
        pTags[i - 2].remove();
    }
};

let j = 0;
createShellDemo();
setInterval(() => {
    if (j == pTags.length) {
        j = 0;
    }
    startShellDemo(j);
    j++;
}, 1000);
