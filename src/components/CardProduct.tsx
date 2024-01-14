import { Product } from "@/type/typeProduct";
import Link from "next/link";
import ButtonAddWishlist from "./ButtonAddWishlist";

export default function CardProduct({ product }: { product: Product }) {
    function setCurrency(price: number): string {
        return price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })
    }

    return (
        <>
            <div className="card w-80 bg-base-100 rounded-xl shadow-xl">
                <figure>
                    <img
                        src={product.thumbnail}
                        alt="product-image"
                        className="h-72 w-full object-cover"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{product.name}</h2>
                    <p>{product.excerpt}</p>
                    <h3 className="bg-base-200 text-sm font-semibold text-center p-2">{setCurrency(product.price)}</h3>
                    <div className="card-actions justify-end mt-3">
                        <ButtonAddWishlist productId={product._id} />
                        <Link href={'/products/' + product.slug} className="btn bg-base-200 hover:bg-base-300">
                            Detail
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}