import Loader from "react-loader-spinner"

const LoaderDots = () => {
    return <div className='w-100 h-100 d-flex align-items-center justify-content-center'>
        <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
    </div>
}

export default LoaderDots