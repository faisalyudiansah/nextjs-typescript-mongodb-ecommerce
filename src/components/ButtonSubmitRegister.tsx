'use client'
import { useEffect, useState } from "react"

export default function ButtonSubmitRegister({ errorMessage }: {
    errorMessage: string | string[] | undefined
}) {
    let [sent, setSent] = useState<boolean>(false)
    function buttonController() {
        setSent(true)
    }

    useEffect(() => {
        setSent(false)
    }, [errorMessage])

    return (
        <>
            <button type="submit" onClick={buttonController} className="btn bg-base-300 hover:bg-base-200">
                {sent ? (
                    <div className="flex justify-center items-center">
                        <p className="font-semibold mr-2">Loading...</p>
                        <span className="loading loading-spinner loading-md"></span>
                    </div>
                ) : (
                    <p>Register</p>
                )}
            </button>
        </>
    )
}