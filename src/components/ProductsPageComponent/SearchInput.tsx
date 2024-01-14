'use client'
import { ChangeEvent, useEffect, useState } from "react"
import { RiDeleteBack2Fill } from "react-icons/ri"
export default function SearchInput({ handleChange, searchKeyword, setSearchKeyword }: {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
  searchKeyword: string | null
  setSearchKeyword: (value: string) => void
}) {

  let deleteSearchKeyword = () => {
    setSearchKeyword('')
  }
  
  return (
    <>
      <div className="flex items-center mb-10 justify-center relative">
        <div className='relative'>
          <input
            className='w-80 md:w-96 p-1 rounded-xl outline-base-200 placeholder-base-200 hover:shadow-md'
            style={{ textIndent: '10px' }}
            placeholder='Search laptop...'
            value={searchKeyword || ""}
            onChange={handleChange}
          />
          {searchKeyword && (
            <button onClick={deleteSearchKeyword} className='absolute top-1 end-2'>
              <RiDeleteBack2Fill
                className='text-base-primary-content hover:text-base-200 hover:scale-110'
                size={24}
              />
            </button>
          )}

        </div>
      </div>
    </>
  )
}
