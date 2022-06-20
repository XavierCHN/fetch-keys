import { render, useNetTableKey } from "@demon673/react-panorama";
import React from "react";

function KeyShower() {
    const keys = useNetTableKey(`keys`, `keys`);
    const keys_str = Object.entries(keys)
        .map(([key, value]) => `${key}: ${value}`)
        .join(`\n`);
    return <TextEntry text={keys_str} style={{ color: `white`, fontSize: `40px` }} />;
}

render(<KeyShower />, $.GetContextPanel());
