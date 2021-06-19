<?php


if (isset($_POST["json_payload"]) && !empty($_POST["json_payload"])){

    $payload = $_POST["json_payload"];

    $cmd = $payload["cmd"];
    $cmd = strtolower($cmd);
    if (strpos($cmd, "sudo") !== false) {

        $output = "rick";

    }else if (strpos($cmd, 'rm') !== false || strpos($cmd, 'cd') !== false || strpos($cmd, 'touch') !== false) {
        $output = "you naughty naughty";

    }else{

        $demo_folder_path = realpath('../php/demo-folder');
        chdir($demo_folder_path);

        $path = realpath('../../c/demo-shell');
        exec($path.' "' . $cmd . '" 2>&1', $output);

    }

    if(empty($output) || !isset($output)){

        $output = array(["error: invalid command."]);
    }

    $res = array('status'=> 200, 'output'=> $output);
    $json_res = json_encode($res);
    echo $json_res;
    die();

}
