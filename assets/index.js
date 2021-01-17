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

gifs = [
    [1, [0.1, 0.9, 0.3, 0.2, 0.25, 0.17, 0.43, 0.23, 0.1, 0.24]],
    [2, [0.1, 0.3, 0.9, 0.25, 0.48, 0.23, 0.58, 0.49, 0.25, 0.43]],
    [3, [0.25, 0.1, 0.3, 0.9, 0.28, 0.11, 0.06, 0.32, 0.43, 0.23]],
    [4, [0.12, 0.15, 0.06, 0.3, 0.92, 0.11, 0.26, 0.12, 0.23, 0.53]],
    [5, [0.12, 0.15, 0.06, 0.25, 0.26, 0.92, 0.26, 0.12, 0.23, 0.53]],
    [8, [0.12, 0.15, 0.06, 0.25, 0.26, 0.24, 0.26, 0.12, 0.91, 0.53]],
];

const playGif = (gifSrc) => {
    document.getElementById("gif-src").src = gifSrc;
};

let k = 0;
setInterval(() => {
    if (k == gifs.length) {
        k = 0;
    }
    let gifSrc = "assets/gifs/" + gifs[k][0] + ".gif";
    playGif(gifSrc);
    confidences = gifs[k][1];

    setTimeout(function () {
        jQuery.each(jQuery(".conf-score"), function (index, elem) {
            let percentage = (confidences[index] * 100).toPrecision(8);
            jQuery(elem).animate(
                {
                    width: 3 + percentage * 1.3 + "px",
                },
                300
            );
        });
    }, 1500);

    k++;
}, 2500);

const toggleEmailClient = (display) => {
    if (display) {
        document.getElementsByClassName(
            "email-client-container"
        )[0].style.visibility = "visible";
        document.getElementsByClassName(
            "email-client-container"
        )[0].style.opacity = 1;
    } else {
        document.getElementsByClassName(
            "email-client-container"
        )[0].style.visibility = "hidden";
        document.getElementsByClassName(
            "email-client-container"
        )[0].style.opacity = 0;
    }
};
