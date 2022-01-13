const history = [];

const API_URL = "https://shell.haidousm.com/api/execute";

$(document).ready(() => {
    let cmdInput = $(".cmd-input");
    cmdInput.trigger("focus");
    cmdInput.trigger("select");

    $(cmdInput).on("keyup", (e) => inputChanged(e));
    $(".terminal-container").on("click", () => {
        let cmdInput = $(".cmd-input");
        cmdInput.trigger("focus");
        cmdInput.trigger("select");
    });
});

const inputChanged = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
        let cmd = e.target.value;
        const pTag = document.createElement("p");
        $(pTag).html(
            `root<span class='hidden md:inline'>@haidousm.com</span> $ ${cmd}`
        );

        $(".output-container").append($(pTag));

        if (cmd.includes("sudo")) {
            $(".rick-container").removeClass("hidden");
            $(".terminal-container").addClass("hidden");
            $("#rick").attr(
                "src",
                "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&showinfo=0&controls=0&autohide=1"
            );
        } else if (cmd == "clear") {
            $(".output-container").html("");
            history.push(cmd);
        } else if (cmd == "history") {
            printOutput(history);
        } else {
            cmdSubmitted(cmd);
            history.push(cmd);
        }
        e.target.value = "";
        $(".terminal-container").scrollTop(
            $(".terminal-container").height() + 1000
        );
    }
};

const printOutput = (output) => {
    for (var i = 0; i < output.length; i++) {
        const pTag = document.createElement("p");
        $(pTag).addClass("ml-1");
        $(pTag).html(output[i]);
        $(".output-container").append($(pTag));
    }
    $(".terminal-container").scrollTop(
        $(".terminal-container").height() + 1000
    );
};

const cmdSubmitted = (cmd) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ command: cmd });

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    fetch(API_URL, requestOptions)
        .then((response) => response.json())
        .then((result) => printOutput(result.command_output.split("\n")))
        .catch((error) => console.log("error", error));
};

const closeRick = () => {
    $(".rick-container").addClass("hidden");
    $(".terminal-container").removeClass("hidden");
    $("#rick").src = "";
};
