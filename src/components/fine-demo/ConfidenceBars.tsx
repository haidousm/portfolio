/* eslint-disable react-hooks/exhaustive-deps */
import React, { Ref, useEffect, useRef } from "react";

interface Props {
    className?: string;
    confidence: number[];
}

function ConfidenceBars({ className, confidence }: Props) {
    const [barVals, setBarVals] = React.useState<number[]>([]);
    const barRefs = useRef<HTMLSpanElement[]>([]);

    useEffect(() => {
        barRefs.current = barRefs.current.slice(0, confidence.length);
        setBarVals(confidence);
    }, []);

    useEffect(() => {
        setBarVals(confidence);
    }, [confidence]);

    useEffect(() => {
        barRefs.current.forEach((bar, i) => {
            const percentage: number = barVals[i] * 100;
            bar.style.width = `${(percentage * 1.3 + 3).toPrecision(8)}px`;
        });
    }, [barVals]);

    return (
        <div
            className={
                "mx-5 text-left text-mac-gray-176 text-xl my-auto " + className
            }
        >
            {barVals &&
                barVals.map((val, i) => (
                    <p className="relative" key={i}>
                        {i}:
                        <span
                            className="bg-mac-gray-30 inline-block absolute h-5 top-1 w-2 transition-all duration-200 ease-in-out"
                            ref={(el) => (barRefs.current[i] = el!)}
                        ></span>
                    </p>
                ))}
        </div>
    );
}

export default ConfidenceBars;
