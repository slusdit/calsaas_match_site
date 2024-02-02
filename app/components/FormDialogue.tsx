'use client'
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DialogProvider, useDialog } from "./DialogContext";
import { useState } from "react";

export default function FormDialog({ 
    children, 
    triggerMessage,
    title 
}:{ 
    children: React.ReactNode
    triggerMessage?: string
    title?: string
}) {
    // const { closeDialog } = useDialog()
    const [open, setOpen] = useState(false)

        return (
        // <DialogProvider>

        <Dialog >
            <DialogTrigger asChild>
                <Button>
                    {triggerMessage ?? 'Open'}
                </Button>
            </DialogTrigger>
        <DialogContent>
            <DialogTitle>{title ?? ''}</DialogTitle>
            {children}
        </DialogContent>
        </Dialog>
        // </DialogProvider>
    )
}