import React from "react"
import PropTypes from "prop-types"

export default function Spinner({width, height}) {
    return(
        <div data-testid="spinner" className={`${height || 'h-full'} ${width ?? "w-full"} flex justify-center items-center`}>
            <div className="spinner-icon"></div>
        </div>
    )
}

Spinner.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string
}