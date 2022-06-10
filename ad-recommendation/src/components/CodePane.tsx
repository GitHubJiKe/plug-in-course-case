import React, { useContext } from "react";
import { UserContext } from 'src/hooks';

export default function CodePane() {
    const { user } = useContext(UserContext)
    return <pre className="padding-24px bg-blue text-yellow border-radius-8px font-24px"><code>{JSON.stringify(user)}</code></pre>
}