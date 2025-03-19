"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import Button  from "@/components/Button"
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";


const ThemeToggle = () => {

  const { theme,setTheme } = useTheme()

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;


  return (

        <Button secondary
        onClick={()=>setTheme(theme === "light" ? "dark" : "light")}>
         {theme === "light" ? 
         <>
         <LuSun className="size-5 lg:size-7 lg:my-5"/> 
            </> :
             <>
        <IoMoon className="size-5 lg:size-7 lg:my-5"/>

             </>}
        </Button>
  )
}

export default ThemeToggle