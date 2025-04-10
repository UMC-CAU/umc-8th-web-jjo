export const LoadingSpinner = () => {
    return (
        /*<div className="flex justify-center items-center h-screen">
            <svg
                className="animate-spin h-10 w-10 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="blue"
                    d="M4 12a8 8 0 1 1 16 0A8 8 0 1 1 4 12z"
                ></path>
            </svg>
        </div>*/
        <div
            className="flex justify-center items-center
            size-12 animate-spin rounded-full border-6 
            border-t-transparent border-blue-500"
            role='status'
            >
            <span className="sr-only">로딩 중...</span>
            </div>
    );
}