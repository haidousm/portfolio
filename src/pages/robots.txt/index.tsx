import React from "react";

function Robots() {
    return <div></div>;
}

export const getServerSideProps = ({ res }: { res: any }) => {
    res.setHeader("Content-Type", "text/plain");

    res.write(`User-agent: *\nAllow: /`);
    res.end();
    return {
        props: {},
    };
};

export default Robots;
