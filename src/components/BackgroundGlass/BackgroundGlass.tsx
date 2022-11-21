import React from "react";
import cn from 'classnames'
interface IProps {
    className?: string,
}
export const BackgroundGlass: React.FC<IProps> = ({className}) => {
    const classNameOfContainer = cn("position-absolute start-0 top-0 w-100 h-100", className);
    const classNameOfGlassElement = cn("container-glass", className)
    return (
        <div className={classNameOfContainer}>
            <div className={classNameOfGlassElement}></div>
        </div>
    )
}