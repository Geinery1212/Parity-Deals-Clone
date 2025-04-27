import { db } from "@/drizzle/db";
import { CACHE_TAGS, dbCache, getUserTag } from "@/lib/cache";

export function getProducts(userId: string, { limit }: { limit?: number } = {}) {
    const cacheFn = dbCache(getProductsInternal, {
        tags: [getUserTag(userId, CACHE_TAGS.products)],
    });
    return cacheFn(userId, { limit });
}
function getProductsInternal(userId: string, { limit }: { limit?: number }) {
    return db.query.ProductTable.findMany({
        where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
        orderBy: ({ createdAt }, { desc }) => desc(createdAt)
    })
}

