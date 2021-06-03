<?php


if (isset($_POST["cmd"])) {

    $cmd = $_POST["cmd"];
    $cmd = strtolower($cmd);
    if (strpos($cmd, 'sudo') !== false) {




        $res = '"rick"';
        die();
    }

    if (strpos($cmd, 'rm') !== false || strpos($cmd, 'cd') !== false || strpos($cmd, 'touch') !== false) {

        $res = '"you naughty naughty"';
        echo $res;
        die();
    }

    $output = NULL;
    $err = NULL;
    chdir('demo-folder');

    exec('../../c/demo-shell "' . $cmd . '"', $output);
    $res = '"';
    foreach ($output as $key => $line) {
        if ($key == 0) {
            $res .=  $line . '"';
        } else {

            $res .= ',"' . $line . '"';
        }
    }

    echo $res;
}
