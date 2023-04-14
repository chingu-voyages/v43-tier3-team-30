import React, { FC } from 'react'

interface ChipProps {
    label: string,
    textColor?: string,
    bgColor?: string
    onClick?: () => void
}

const Chip: FC<ChipProps> = ({ label, textColor, bgColor, onClick }) => {
    return (
        <div className={`${textColor} ${bgColor} inline-flex px-4 py-0.5 rounded-full`} onClick={onClick}>
            {label}
        </div>
    )
}

export default Chip;