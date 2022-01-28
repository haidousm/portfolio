import Image from "next/image";
import React from "react";

function Dock() {
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
            <a
                href="https://github.com/haidousm"
                className="
        transition-all
        duration-300
        transform
        hover:scale-125 hover:-translate-y-0.5
    "
            >
                <Image
                    src="/images/github_logo.png"
                    className="rounded-xl"
                    alt="github_logo"
                    width={80}
                    height={80}
                />
            </a>
            <a
                href="https://linkedin.com/in/haidousm"
                className="
                transition-all
                duration-300
                transform
                hover:scale-125 hover:-translate-y-0.5
                
    "
            >
                <Image
                    src="/images/linkedin_logo.png"
                    className="rounded-xl bg-white"
                    alt="linkedin_logo"
                    width={80}
                    height={80}
                />
            </a>
        </div>
    );
}

export default Dock;
