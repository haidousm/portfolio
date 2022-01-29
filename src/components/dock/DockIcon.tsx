import React from "react";
import Image from "next/image";

interface Props {
    href: string;
    imageSrc: string;
    imageAlt: string;
    imageClassName?: string;
}

function DockIcon({ href, imageSrc, imageAlt, imageClassName }: Props) {
    return (
        <a
            href={href}
            className="
transition-all
duration-300
transform
hover:scale-125 hover:-translate-y-0.5"
        >
            <Image
                src={imageSrc}
                className={imageClassName + " rounded-xl"}
                alt={imageAlt}
                width={80}
                height={80}
            />
        </a>
    );
}

export default DockIcon;
