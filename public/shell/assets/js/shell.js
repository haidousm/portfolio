const history = [];
const cmdSubmitted = (cmd) => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            shellOutputLines = JSON.parse("[" + this.response + "]");
            printResponse(cmd, shellOutputLines);
        }
    };
    xhttp.open(
        "POST",
        "https://haidousm.com/shell/inc/php/handle_request.php",
        true
    );
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    formattedCmd = encodeURIComponent(cmd);
    xhttp.send("cmd=" + formattedCmd);
};

const printResponse = (cmd, shellOutputLines) => {
    for (var i = 0; i < shellOutputLines.length; i++) {
        const pTag = document.createElement("p");
        pTag.classList.add("ml-1");
        pTag.innerHTML = shellOutputLines[i];
        document
            .getElementsByClassName("output-container")[0]
            .appendChild(pTag);
    }
};

document.getElementsByClassName("cmd-input")[0].onkeyup = function (e) {
    if (e.key === "Enter" || e.keyCode === 13) {
        let cmd = e.target.value;
        const pTag = document.createElement("p");
        pTag.innerHTML =
            "root<span class='hidden md:inline'>@haidousm.com</span> $ " + cmd;

        document
            .getElementsByClassName("output-container")[0]
            .appendChild(pTag);

        updateScroll();

        if (cmd.includes("sudo")) {
            document
                .getElementsByClassName("rick-container")[0]
                .classList.remove("hidden");
            document
                .getElementsByClassName("terminal-container")[0]
                .classList.add("hidden");
            document.getElementById("rick").src =
                "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&showinfo=0&controls=0&autohide=1";
        } else if (cmd == "clear") {
            document.getElementsByClassName("output-container")[0].innerHTML =
                "";
            history.push(cmd);
        } else if (cmd == "history") {
            printResponse(cmd, history);
        } else {
            cmdSubmitted(cmd);
            history.push(cmd);
        }
        e.target.value = "";
    }
};

function updateScroll() {
    var element = document.getElementsByClassName("terminal-container")[0];
    element.scrollTop = element.scrollHeight;
}

function closeRick() {
    document
        .getElementsByClassName("rick-container")[0]
        .classList.add("hidden");
    document
        .getElementsByClassName("terminal-container")[0]
        .classList.remove("hidden");
    document.getElementById("rick").src = "";
}

document.addEventListener("readystatechange", (event) => {
    var cmdInput = document.getElementsByClassName("cmd-input")[0];
    cmdInput.focus();
    cmdInput.select();

    document
        .getElementsByClassName("terminal-container")[0]
        .addEventListener("click", () => {
            var cmdInput = document.getElementsByClassName("cmd-input")[0];
            cmdInput.focus();
            cmdInput.select();
        });
});
