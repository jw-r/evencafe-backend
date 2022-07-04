-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_coffeeShopId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_coffeeShopId_fkey" FOREIGN KEY ("coffeeShopId") REFERENCES "CoffeeShop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
