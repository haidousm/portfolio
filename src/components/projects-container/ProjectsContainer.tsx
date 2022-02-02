import FinePreview from "../fine-preview/FinePreview";
import ShellPreview from "../shell-preview/ShellPreview";

function ProjectsContainer() {
    return (
        <div className="container text-center">
            <h2 className="text-white text-xl md:text-2xl">
                Here&apos;s a couple of my projects
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center mt-4">
                <ShellPreview />
                <FinePreview />
            </div>
        </div>
    );
}

export default ProjectsContainer;
