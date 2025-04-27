import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageWithBackButton } from "@/features/products/components/PageWithBackButton";
import { ProductDetailsForm } from "@/features/products/components/forms/ProductDetailsForm";
import { HasPermission } from "@/components/HasPermission";
import { canCreateProduct } from "@/lib/permissions";

export default function NewProductPage() {
    return (
        <PageWithBackButton backButtonHref="/dashboard/products" pageTitle={"New Products"}>
            <HasPermission
                permission={canCreateProduct}
                renderFallback
                fallbackText="You have already created the maximum number of products. Try upgrading your account to create more."
            >
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Product Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ProductDetailsForm />
                    </CardContent>
                </Card>
            </HasPermission>
        </PageWithBackButton>
    )
}