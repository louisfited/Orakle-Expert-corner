import React, { useState } from 'react'

type InputDropdownSearchProps = {
  placeholder?: string
  data?: Array<{ label: string; value: any }> // Assuming data is an array of objects with id and label
  onClick: (value: any[]) => void
}

export const InputDropdownSearch: React.FC<InputDropdownSearchProps> = ({
  placeholder = 'Search...',
  data = [],
  onClick,
}) => {
  const [inputValue, setInputValue] = useState('')
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)

  // Filter the data based on the input value
  const filteredData = data.filter((item) => item.label.toLowerCase().includes(inputValue?.toLowerCase()))

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    setIsDropdownVisible(true)
  }

  const handleItemClick = (item: any) => {
    setIsDropdownVisible(false)

    onClick(item.value)

    setInputValue('')
  }

  const handleBlur = () => {
    setTimeout(() => setIsDropdownVisible(false), 50)
  }

  return (
    <div
      className="relative w-full"
      onBlur={handleBlur}
      style={{ zIndex: 10 }}
    >
      <input
        className="rounded-full bg-white px-4 py-2 border border-gray-300 w-full"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => {
          if (inputValue?.length > 1) {
            setIsDropdownVisible(true)
          }
        }}
      />

      {isDropdownVisible && filteredData.length > 0 && (
        <ul className="absolute left-0 bg-white border border-gray-300 rounded-lg w-full mt-1 max-h-60 overflow-y-auto shadow-lg z-20">
          {filteredData.map((item) => (
            <li
              key={item.label}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onMouseDown={() => handleItemClick(item)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
