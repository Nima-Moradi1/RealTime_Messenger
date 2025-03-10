'use client'

import useRoutes from "@/hooks/useRoutes"
import { useState } from "react"
import DesktopItem from "./DesktopItem"


const DesktopSidebar = () => {

    const routes = useRoutes()
    const [isOpen, setIsOpen]= useState(false)

  return (
    <div
    className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:w-16 lg:border-r lg:border-r-gray-2 lg:z-40 xl:px-6 lg:overflow-y-auto lg:overflow-x-hidden
    lg:bg-background lg:pb-4 lg:flex lg:flex-col lg:justify-between">
        <nav className="mt-4 flex flex-col justify-between"
        >
            <ul role="list"
            className="flex flex-col items-center space-y-1">
                {
                    routes?.map((route)=> (
                        <DesktopItem key={route.label} icon={route.icon}
                        href={route.href} label={route.label} active={route.active}
                        onClick={route.onClick}/>
                    ))
                }
            </ul>
        </nav>
    </div>
  )
}

export default DesktopSidebar