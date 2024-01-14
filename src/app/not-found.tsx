import Link from "next/link"
import { LuFileSearch2 } from "react-icons/lu";

export default function NotFoundPage() {
    return (
        <>
            <div className="min-h-screen flex justify-center items-center">
                <div className="text-center">
                    <div className="mb-2">
                        <LuFileSearch2 size={44} className="mx-auto" />
                    </div>
                    <h2 className="text-4xl font-bold mb-2">404 | Not Found</h2>
                    <p className="text-base-content">The page you&apos;re looking for does not exist.</p>
                    <Link href={"/"} className="text-base-content underline">Back to homepage</Link>
                </div>
            </div>
        </>
    )
}
