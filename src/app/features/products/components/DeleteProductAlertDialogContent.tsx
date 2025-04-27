"use client"

import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { useTransition } from "react"
import { toast } from "sonner"
import { deleteProduct } from "@/app/features/products/server/actions/products"

export function DeleteProductAlertDialogContent({ id }: { id: string }) {
    const [isDeletePending, startDeleteTransition] = useTransition()

    return (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this
                    product.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                    onClick={() => {
                        startDeleteTransition(async () => {
                            const data = await deleteProduct(id)
                            if (data.message) {
                                if (data.error) {
                                    toast.error(data.message);
                                } else {
                                    toast.success(data.message);
                                }
                            }
                        })
                    }}
                    disabled={isDeletePending}
                >
                    Delete
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    )
}