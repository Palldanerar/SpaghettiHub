import React, { useState } from 'react'
import CodeItem from '@/components/CodeItem';
import { useGetAllCodesQuery } from '@/redux/slices/api';
import { Input } from "@/components/ui/input"

const Home = () => {

  const { data: allCodes } = useGetAllCodesQuery();
  const [search, setSearch] = useState("")

  interface MyCodesItem {
    fullCode: {
      html: string,
      css: string,
      javascript: string
    },
    _id: string,
    title: string,
    ownerInfo: Object,
  }

  const searchCode = () => {

    if (search == "") {
      return allCodes
    }

    return [...allCodes].filter(el => el.title.toLowerCase().includes(search.toLowerCase()))
  }

  return (
    <div className="w-full h-[calc(100dvh-60px)]">
      <div className='p-3'>
        <Input placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div>
        {searchCode() ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3 p-3">
            {searchCode()?.map((item: MyCodesItem) => {
              return (
                <CodeItem title={item.title} _id={item._id} owner={item.ownerInfo} />
              );
            })}
          </div>
        ) : (
          <p className="block w-full text-slate-500 font-mono text-center p-3">
            No Codes Found!
          </p>
        )}
      </div>
    </div>
  )
}

export default Home