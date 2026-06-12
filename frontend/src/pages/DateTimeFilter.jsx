import React from 'react'

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

import {options} from '@/lib/data.js'

const DateTimeFilter = ({dateQuery, setDateQuery}) => {
   return (
    <Combobox value={dateQuery} onValueChange={setDateQuery} items={options}>
      <ComboboxInput placeholder="Chọn lọc" className='bg-success/10 '/>
      <ComboboxContent>
        <ComboboxList>
          {options.map((item) => (
            <ComboboxItem
              key={item.value}
              value={item.value}
            >
              {item.label}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

export default DateTimeFilter