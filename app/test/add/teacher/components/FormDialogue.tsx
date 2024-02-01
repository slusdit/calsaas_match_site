import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function FormDialog({ 
    children, 
    triggerMessage,
    title 
}:{ 
    children: React.ReactNode
    triggerMessage?: string
    title?: string
}) {
    return (
        <Dialog>
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
    )
}