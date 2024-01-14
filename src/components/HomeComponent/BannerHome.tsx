import Link from "next/link"
import backgroundImage from '../../../public/banner.jpg'
export default function BannerHome() {
  const promoDiscount = 20
  const today = new Date()
  today.setDate(today.getDate() + 5)
  const promoExpiration = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  return (
    <>
      <section
        className="hero h-[660px]"
        style={{ backgroundImage: `url(${backgroundImage.src})` }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-10 text-5xl font-serif font-bold text-base-100">Laptop Room</h1>
            <p className="mb-3 text-sm max-w-[400px]">
              Unlock the future of technology with our {promoDiscount}% discount. Offer ends {promoExpiration}.
            </p>
            <Link href={'/products'} className="btn bg-base-300 hover:bg-base-100">See All Products</Link>
          </div>
        </div>
      </section>
    </>
  )
}