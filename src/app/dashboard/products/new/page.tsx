import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageWithBackButton } from "../../_componets/PageWithBackButton";
import { ProductDetailsForm } from "../../_componets/forms/ProductDetailsForm";

export default function NewProductPage(){
    return(
        <PageWithBackButton backButtonHref="/dashboard/products" pageTitle={"New Products"}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Product Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <ProductDetailsForm/>
                </CardContent>
            </Card>
        </PageWithBackButton>
    )
}