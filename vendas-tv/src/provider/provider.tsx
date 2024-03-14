'use client'

import * as React from "react"
import { NextUIProvider } from "@nextui-org/system"
import { Navigation } from "@/components/navigation"

const AppProvider = ({ children }: React.PropsWithChildren<{}>): React.ReactElement => {
    const [open, setOpen] = React.useState(false)

    return (
        <NextUIProvider className="provider">
            <Navigation open={open} setOpen={setOpen} />
            <div style={{ marginLeft: `${open ? '320px' : '0px'}`, transition: 'margin-left .3s ease-in-out' }}>
                {children}
            </div>
        </NextUIProvider>
    )
}

export default AppProvider
