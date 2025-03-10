import { ReactNode } from "react";
import { NavBar } from "./_components/NavBar";

export default function MarketingLayout({ children }: { children: ReactNode }) {
    return (<div className="selection:bg-[hsl(320,65%,52%, 30%)]">
        <NavBar />
        {children}
    </div>);
};