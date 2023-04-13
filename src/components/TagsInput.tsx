import React from 'react'
import { IconType } from 'react-icons'
import { AiFillApple } from 'react-icons/ai'

interface TagsInputProps {
  label: string
  selected?: boolean
  onClick: (value: string) => void
}

export const tags = [
  {
    label: 'Fun',
  },
  {
    label: 'Informative',
  },
  {
    label: 'Adventurous',
  },
]

const TagsInput: React.FC<TagsInputProps> = ({
  label,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
        rounded-xl
        border-2
        p-4
        flex
        flex-col
        gap-3
        hover:border-black
        dark:hover:border-white
        transition
        cursor-pointer
        ${
          selected
            ? 'border-black dark:border-white'
            : 'border-neutral-200 dark:border-neutral-600'
        }
      `}
    >
      <div className="font-semibold">{label}</div>
    </div>
  )
}

export default TagsInput
