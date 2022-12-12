import React, { Fragment } from 'react'

const Footer = () => {
    const year = new Date().getFullYear()
    return (
        <Fragment>
            <footer className="py-1">
                <p className="text-center mt-1">
                    Shopping Cart - @{year}, developed by Amritendu Nath. All Rights Reserved.
                </p>
            </footer>
        </Fragment>
    )
}

export default Footer
