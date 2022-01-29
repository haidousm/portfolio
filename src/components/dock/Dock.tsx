import React from "react";

interface Props {
    children: React.ReactNode;
}

function Dock({ children }: Props) {
    return (
        <div
            className="
    bg-mac-gray-30 bg-opacity-20
    rounded-3xl
    w-64
    flex
    justify-around
    py-3
"
        >
            {children}
        </div>
    );
}

export default Dock;
