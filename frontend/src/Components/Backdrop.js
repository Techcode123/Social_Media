import React from "react";

export const Backdrop = ({ value }) => {
    return (
        <>

            <div className='fixed w-screen h-screen top-0  left-0 right-0 bottom-0 backdrop-blur-sm z-10' onClick={() => setDisplay("none")} style={{ display: display }}></div>
        </>
    )
}