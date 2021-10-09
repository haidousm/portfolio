$(document).ready(() => {
    let shellOutput = initShellOutput();
    let i = 0;
    setInterval(() => {
        if (i == shellOutput.length) {
            i = 0;
        }
        printOutput(i, shellOutput);
        i++;
    }, 1000);

    let mnistDemoData = [
        [1, [0.1, 0.9, 0.3, 0.2, 0.25, 0.17, 0.43, 0.23, 0.1, 0.24]],
        [2, [0.1, 0.3, 0.9, 0.25, 0.48, 0.23, 0.58, 0.49, 0.25, 0.43]],
        [3, [0.25, 0.1, 0.3, 0.9, 0.28, 0.11, 0.06, 0.32, 0.43, 0.23]],
        [4, [0.12, 0.15, 0.06, 0.3, 0.92, 0.11, 0.26, 0.12, 0.23, 0.53]],
        [5, [0.12, 0.15, 0.06, 0.25, 0.26, 0.92, 0.26, 0.12, 0.23, 0.53]],
        [8, [0.12, 0.15, 0.06, 0.25, 0.26, 0.24, 0.26, 0.12, 0.91, 0.53]],
    ];

    let j = 0;
    setInterval(() => {
        if (j == mnistDemoData.length) {
            j = 0;
        }

        let gifSrc = "assets/images/gifs/" + mnistDemoData[j][0] + ".gif";
        playGif(gifSrc);
        confidences = mnistDemoData[j][1];
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
        }, 2000);

        j++;
    }, 2500);
});

const initShellOutput = () => {
    let shellOutput = [];
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
            $(pTag).html("root@haidousm.com $ " + shellOutputLines[i]);
        } else {
            $(pTag).html(shellOutputLines[i]);
        }

        shellOutput.push(pTag);
    }

    return shellOutput;
};

const printOutput = (i, shellOutput) => {
    pTag = shellOutput[i];
    jQuery(".output-container").append($(pTag));

    if (i % 2 == 1 && i - 2 >= 0) {
        shellOutput[i - 2].remove();
    }
};

const playGif = (gifSrc) => {
    document.getElementById("gif-src").src = gifSrc;
};

// const toggleEmailClient = (display) => {
//     if (display) {
//         document.getElementsByClassName(
//             "email-client-container"
//         )[0].style.visibility = "visible";
//         document.getElementsByClassName(
//             "email-client-container"
//         )[0].style.opacity = 1;
//     } else {
//         document.getElementById("email").value = "";
//         document.getElementById("subject").value = "";
//         document.getElementById("email-body").value = "";
//         document.getElementsByClassName(
//             "email-client-container"
//         )[0].style.visibility = "hidden";
//         document.getElementsByClassName(
//             "email-client-container"
//         )[0].style.opacity = 0;
//     }
// };

// const sendEmail = () => {
//     let email = document.getElementById("email").value;
//     let subject = document.getElementById("subject").value;
//     let body = document.getElementById("email-body").value;

//     $.ajax({
//         url: "https://haidousm.com/inc/submit_email.php",
//         type: "post",
//         data: `email=${email}&subject=${subject}&body=${body}`,
//         success: function (response) {
//             toggleEmailClient(0);
//         },
//     });
// };
