import { Fragment } from "react";
import TerminalStatusBar from "./TerminalStatusBar";
interface Props {
    statusBarHTML: JSX.Element;
    children?: JSX.Element;
}
function Terminal({ statusBarHTML, children }: Props) {
    return (
        <div className="w-full h-full bg-mac-gray-30 rounded-md relative">
            <TerminalStatusBar statusBarHTML={statusBarHTML} />
            <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0 z-0">
                <div className="w-full h-full">{children}</div>
            </div>
        </div>
    );
}

export default Terminal;
