import { Fragment } from "react";
import TerminalStatusBar from "./TerminalStatusBar";
interface Props {
    statusBarHTML: JSX.Element;
}
function Terminal({ statusBarHTML }: Props) {
    return (
        <div>
            <TerminalStatusBar statusBarHTML={statusBarHTML} />
        </div>
    );
}

export default Terminal;
