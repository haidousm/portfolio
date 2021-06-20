const history = [];

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
    let json_payload = { cmd: cmd };
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "https://haidousm.com/shell/inc/php/handle_request.php",
        data: { json_payload },
        success: (res) => {
            printOutput(res.output);
        },
        error: console.error,
    });
};

const closeRick = () => {
    $(".rick-container").addClass("hidden");
    $(".terminal-container").removeClass("hidden");
    $("#rick").src = "";
};
