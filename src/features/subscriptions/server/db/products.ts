import { db } from "@/drizzle/db"
import { ProductTable } from "@/drizzle/schema"
import { CACHE_TAGS, dbCache, getUserTag } from "@/lib/cache"
import { count, eq } from "drizzle-orm"

export function getProductCount(userId: string) {
    const cacheFn = dbCache(getProductCountInternal, {
        tags: [getUserTag(userId, CACHE_TAGS.products)],
    })

    return cacheFn(userId)
}

async function getProductCountInternal(userId: string) {
    const counts = await db
        .select({ productCount: count() })
        .from(ProductTable)
        .where(eq(ProductTable.clerkUserId, userId))

    return counts[0]?.productCount ?? 0
}