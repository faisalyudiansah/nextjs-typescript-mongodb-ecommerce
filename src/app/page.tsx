import BannerHome from "@/components/HomeComponent/BannerHome"
import Footer from "@/components/Footer"
import InfoEcommerce from "@/components/HomeComponent/InfoEcommerce"
import Navbar from "@/components/Navbar"
import AboutUs from "@/components/HomeComponent/AboutUs"
import ListHomeProduct from "@/components/HomeComponent/ListHomeProduct"
import NotificationError from "@/components/NotificationError"

export default function Home({ searchParams }: {
  searchParams: { [error: string]: string | string[] | undefined }
}) {
  let errorMessage = searchParams.error
  return (
    <>
      <Navbar />
      <NotificationError errorMessage={errorMessage} />
      <BannerHome />
      <AboutUs />
      <ListHomeProduct />
      <InfoEcommerce />
      <Footer />
    </>
  )
}
