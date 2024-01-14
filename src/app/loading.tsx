export default function LoadingPage() {
    return (
        <>
            <div className='min-h-screen flex justify-center items-center bg-base-200'>
                <div className="mockup-window w-[500px] bg-base-300 shadow-lg">
                    <div className="flex justify-center px-4 py-16 bg-base-100">
                        <div className='text-center'>
                            <span className="loading loading-bars loading-lg mb-3 mx-auto"></span>
                            <h2 className='text-4xl font-bold font-serif mb-2'>Loading...</h2>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
