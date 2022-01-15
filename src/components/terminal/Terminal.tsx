import { Fragment } from "react";
import TerminalStatusBar from "./TerminalStatusBar";
interface Props {
    statusBarHTML: JSX.Element;
    children?: JSX.Element;
}
function Terminal({ statusBarHTML, children }: Props) {
    return (
        <div className="w-full h-full bg-mac-gray-30 rounded-md">
            <TerminalStatusBar statusBarHTML={statusBarHTML} />
            {children}
        </div>
    );
}

export default Terminal;
