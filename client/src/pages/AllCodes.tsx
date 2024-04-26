import CodeItem from '@/components/CodeItem';
import { useGetAllCodesQuery } from '@/redux/slices/api';
import React from 'react'

const AllCodes = () => {

  const { data: allCodes } = useGetAllCodesQuery();

  interface MyCodesItem {
    fullCode: {
      html: string,
      css: string,
      javascript: string
    },
    _id: string,
    title: string,
  }

  return allCodes?.length !== 0 ? (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3 p-3">
      {allCodes?.map((item: MyCodesItem) => {
        return (
          <CodeItem isDelete={false} title={item.title} _id={item._id} />
        );
      })}
    </div>
  ) : (
    <p className="block w-full text-slate-500 font-mono text-center p-3">
      No Codes Found!
    </p>
  );
}

export default AllCodes