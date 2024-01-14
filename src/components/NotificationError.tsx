'use client'
import { useEffect } from 'react'
import Swal from 'sweetalert2'

const NotificationError = ({ errorMessage }: { errorMessage: string | string[] | undefined }) => {
    useEffect(() => {
        if (errorMessage) {
            Swal.fire({
                icon: "error",
                text: `${errorMessage}`,
            })
        }
    }, [errorMessage])

    return null
}

export default NotificationError
