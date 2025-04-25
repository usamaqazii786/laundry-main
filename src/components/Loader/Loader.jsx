import { ColorRing } from "react-loader-spinner"

function Loader() {
    return (
        <>
            <ColorRing
                visible={true}
                height="30"
                width="40"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
            />
        </>
    )
}

export default Loader

