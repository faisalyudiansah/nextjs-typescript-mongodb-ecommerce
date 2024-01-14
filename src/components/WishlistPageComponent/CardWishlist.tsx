import { Product } from "@/type/typeProduct";
import Link from "next/link";
import ButtonRemoveWishlist from "./ButtonRemoveWishlist";

export default function CardWishlist({ product, setRefresh }: { product: Product, setRefresh: (value: boolean) => void }) {
    function setCurrency(price: number): string {
        return price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })
    }

    return (
        <div className="lg:flex w-[550px] bg-base-100 rounded-xl shadow-xl">
            <figure className="">
                <img
                    src={product.thumbnail}
                    alt="product-image"
                    className="h-60 w-full object-cover lg:rounded-l-xl"
                />
            </figure>
            <div className="flex-1 card-body p-4">
                <h2 className="card-title text-xl font-bold mb-2">{product.name}</h2>
                <p className="text-sm mb-4">{product.excerpt}</p>
                <h3 className="bg-base-200 rounded-xl text-sm font-semibold text-center p-2 mb-4">{setCurrency(product.price)}</h3>
                <div className="flex flex-wrap justify-end gap-3">
                    <ButtonRemoveWishlist productId={product._id} setRefresh={setRefresh} />
                    <Link href={'/products/' + product.slug} className="btn bg-base-200 hover:bg-base-300">
                        Detail
                    </Link>
                </div>
            </div>
        </div>
    )
}
