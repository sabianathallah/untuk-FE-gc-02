import React from 'react'

const Search = ({
  value = '',
  onChange = () => {},
  onSubmit = (e) => e.preventDefault(),
  placeholder = 'Search something..',
  formClassName = 'max-w-md mx-auto border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]',
  containerClassName = 'relative flex items-center w-full h-12 rounded-lg bg-white overflow-hidden',
  inputClassName = 'peer h-full w-full outline-none text-sm text-gray-800 pr-2',
  showIcon = true,
  icon = null,
  id = 'search',
  ...inputProps
}) => {
  const defaultIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (typeof onSubmit === 'function') onSubmit(e)
  }

  return (
    <form className={formClassName} onSubmit={handleSubmit}>
      <div className={containerClassName}>
        <div className="grid place-items-center h-full w-12 text-gray-300">
          {showIcon ? (icon || defaultIcon) : null}
        </div>
        <input
          className={inputClassName}
          type="text"
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...inputProps}
        />
      </div>
    </form>
  )
}

export default Search
