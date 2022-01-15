interface Props {
    children: JSX.Element[];
}
function ContainerOverlay({ children }: Props) {
    return (
        <div className="h-full w-full relative group">
            {children[0]}
            <div
                className="
                container 
                backdrop-filter 
                backdrop-blur 
                h-full w-full 
                absolute    
                top-0
                left-0
                z-50
                opacity-100
                lg:opacity-0 lg:group-hover:opacity-100
                grid grid-rows-2
                items-center
                transition-all
                duration-300
                rounded-md"
            >
                {children[1] ?? null}
            </div>
        </div>
    );
}

export default ContainerOverlay;
