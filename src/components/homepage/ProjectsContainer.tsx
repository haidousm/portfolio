import { Fragment } from "react";
import Terminal from "../terminal/Terminal";

function ProjectsContainer() {
    return (
        <div className="container text-center">
            <h2 className="text-white text-xl md:text-2xl">
                Here&apos;s a couple of my projects
            </h2>
            <Terminal
                statusBarHTML={
                    <Fragment>
                        root@haidousm.com
                        <span className="hidden lg:inline"> -- bash</span>
                    </Fragment>
                }
            />
        </div>
    );
}

export default ProjectsContainer;
