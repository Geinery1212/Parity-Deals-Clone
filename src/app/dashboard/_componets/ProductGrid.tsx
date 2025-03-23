import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AddToSiteProductModalContent } from "./AddToSiteProductModalContent";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { DeleteProductAlertDialogContent } from "./DeleteProductAlertDialogContent";

export function ProductGrid({
    products
}: {
    products: {
        id: string;
        name: string;
        url: string;
        description?: string | null;
    }[];
}) {
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
            products.map(p => {
                return <CardProduct key={p.id} {...p} />
            })
        }

    </div>
}
export function CardProduct({
    id,
    name,
    url,
    description
}: {
    id: string;
    name: string;
    url: string;
    description?: string | null;

}) {
    return (
        <Card>
            <CardHeader>
                <div className="flex gap-2 justify-between">
                    <CardTitle>
                        <Link href={`/dashboard/products/${id}/edit`} >{name}</Link>
                    </CardTitle>
                    <Dialog>
                        <AlertDialog>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="size-8 p-0">
                                        <div className="sr-only">Action Menu</div>
                                        <DotsHorizontalIcon className="size-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem asChild>
                                        <Link href={`/dashboard/products/${id}/edit`}>Edit</Link>
                                    </DropdownMenuItem>
                                    <DialogTrigger asChild>
                                        <DropdownMenuItem>
                                            Add To Site
                                        </DropdownMenuItem>
                                    </DialogTrigger>
                                    <DropdownMenuSeparator />
                                    <AlertDialogTrigger>
                                        <DropdownMenuItem>
                                            Delete
                                        </DropdownMenuItem>
                                    </AlertDialogTrigger>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DeleteProductAlertDialogContent id={id} />
                        </AlertDialog>
                        <AddToSiteProductModalContent id={id} />
                    </Dialog>
                </div>
                <CardDescription>{url}</CardDescription>
            </CardHeader>
            {description && <CardContent>{description}</CardContent>}
        </Card>
    )
}