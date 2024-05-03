import CodeItem from '@/components/CodeItem';
import { useGetUserMutation } from '@/redux/slices/api';
import { handleError } from '@/utils/handleError';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const User = () => {

  const { id } = useParams()
  const [user, setUser] = useState()
  const [getUser, { isLoading }] = useGetUserMutation()

  const getInfo = async () => {
    try {
      const response = await getUser(id).unwrap();
      console.log(response)
      setUser(response)
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    getInfo()
  }, [])

  return (
    <div className='w-full h-[calc(100dvh-60px)] bg-gray-800 text-white text-2xl font-bold flex'>
      <div className='w-1/4 border-gray-900 border-r-2 flex flex-col p-4 gap-y-3'>
        <div>
          <img className='w-56 rounded-full mx-auto' src={`http://localhost:4000/${user?.picture}`} alt="avatar" />
        </div>
        <h2 className="text-wrap text-center">{user?.username}</h2>
        <p className="w-full font-mono font-bold text-base break-words">{user?.bio}</p>
      </div>
      <div className="w-full overflow-auto">
        <h2 className="text-center">Код {user?.username}</h2>
        {user?.savedCodes?.length !== 0 ? (
          <div className="p-3 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
            {user?.savedCodes?.map((item: MyCodesItem) => {
              console.log(item)
              return <CodeItem title={item.title} _id={item._id} />;
            })}
          </div>
        ) : (
          <>
            <p className="text-center font-mono text-slate-600 p-3">
              You don't have any saved codes. <Link to="/editor">Create One</Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default User