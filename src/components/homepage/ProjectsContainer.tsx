import FinePreview from "./FinePreview";
import ShellPreview from "./ShellPreview";

function ProjectsContainer() {
    return (
        <div className="container text-center">
            <h2 className="text-white text-xl md:text-2xl">
                Here&apos;s a couple of my projects
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center mt-4">
                <div className="h-60 shadow-xl-heavy rounded-md m-4 w-2/3 overflow-hidden">
                    <ShellPreview />
                </div>
                <div className="h-60 shadow-xl-heavy rounded-md m-4 w-2/3 overflow-hidden">
                    <FinePreview />
                </div>
            </div>
        </div>
    );
}

export default ProjectsContainer;
