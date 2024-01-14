import { TbTruckDelivery } from "react-icons/tb"
import { MdOutlineDiscount } from "react-icons/md"
import { RiSecurePaymentLine } from "react-icons/ri";
import { IoMdReturnLeft } from "react-icons/io";
import { FaLaptop } from "react-icons/fa6";
import { IoFingerPrint } from "react-icons/io5"
export default function InfoEcommerce() {
  return (
    <>
      <section className="min-h-screen bg-base-200 p-10 mx-auto">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center text-center">
          <h2 className="font-serif font-bold text-3xl sm:text-3xl mt-5 md:text-6xl">Explore Laptop Room&apos;s Outstanding Features</h2>
          <p className="max-w-[700px] p-4 mt-5">
            Uncover the extraordinary offerings at Laptop Room, your go-to destination for top-tier laptops and unparalleled shopping experiences.
          </p>
        </div>
        <div className="mx-auto mt-5 grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg bg-base-300 hover:bg-base-100">
            <div className="flex flex-col justify-between rounded-md p-6">
              <div className="">
                <div className="flex items-center">
                  <TbTruckDelivery className="text-3xl mr-2" />
                  <h3 className="font-bold">Fast Delivery</h3>
                </div>
                <p className="text-sm text-muted-foreground">Experience lightning-fast delivery to get your laptop in no time.</p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg bg-base-300 hover:bg-base-100">
            <div className="flex flex-col justify-between rounded-md p-6">
              <div className="">
                <div className="flex items-center">
                  <MdOutlineDiscount className="text-3xl mr-2" />
                  <h3 className="font-bold">Exclusive Promotions</h3>
                </div>
                <p className="text-sm text-muted-foreground">Avail yourself of unbeatable discounts and promotions on our premium laptop collection.</p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg bg-base-300 hover:bg-base-100">
            <div className="flex flex-col justify-between rounded-md p-6">
              <div className="">
                <div className="flex items-center">
                  <IoFingerPrint className="text-3xl mr-2" />
                  <h3 className="font-bold">Authentic Products</h3>
                </div>
                <p className="text-sm text-muted-foreground">Shop with confidence knowing that all our laptops are genuine and of the highest quality.</p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg bg-base-300 hover:bg-base-100">
            <div className="flex flex-col justify-between rounded-md p-6">
              <div className="">
                <div className="flex items-center">
                  <IoMdReturnLeft className="text-3xl mr-2" />
                  <h3 className="font-bold">Easy Returns</h3>
                </div>
                <p className="text-sm text-muted-foreground">Enjoy hassle-free returns, ensuring your satisfaction with every purchase.</p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg bg-base-300 hover:bg-base-100">
            <div className="flex flex-col justify-between rounded-md p-6">
              <div className="">
                <div className="flex items-center">
                  <FaLaptop className="text-3xl mr-2" />
                  <h3 className="font-bold">Diverse Selection</h3>
                </div>
                <p className="text-sm text-muted-foreground">Choose from a diverse range of laptops, catering to all your computing needs.</p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg bg-base-300 hover:bg-base-100">
            <div className="flex flex-col justify-between rounded-md p-6">
              <div className="">
                <div className="flex items-center">
                  <RiSecurePaymentLine className="text-3xl mr-2" />
                  <h3 className="font-bold">Secure Checkout</h3>
                </div>
                <p className="text-sm text-muted-foreground">Shop confidently with our secure checkout process, ensuring your personal information is protected.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}