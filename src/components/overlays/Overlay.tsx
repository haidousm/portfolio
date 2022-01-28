import React from "react";
interface Props {
    children: JSX.Element[];
    isVisible: boolean;
}
function Overlay({ children, isVisible }: Props) {
    return (
        <div className="h-full w-full relative group">
            {children[0]}
            <div
                className="
        container 
        h-full w-full 
        absolute    
        top-0
        left-0
        z-50
        opacity-100
        items-center
        rounded-md"
            >
                {(isVisible && children[1]) ?? null}
            </div>
        </div>
    );
}

export default Overlay;
