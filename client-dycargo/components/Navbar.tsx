
import { Moon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { SidebarTrigger } from "./ui/sidebar";

const Navbar = () => {
  return (<nav className="p-4 flex items-center justify-between">
    {/* LEFT */}
    <SidebarTrigger/>
    {/* RIGHT */}
    <div className="flex items-center">
    <Link href={"/"}>Dashboard</Link>
    <Moon/>

    </div>
  </nav>);
};

export default Navbar;
