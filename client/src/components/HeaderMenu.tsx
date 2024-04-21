import React from 'react'
import { Button } from './ui/button'
import { Save, Share } from 'lucide-react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDispatch, useSelector } from 'react-redux'
import { updateCurrentLanguage } from '@/redux/slices/CodeSlices'
import { RootState } from '@/redux/store'

const HeaderMenu = () => {

  const dispatch = useDispatch()
  const currentLanguage = useSelector(
    (state: RootState) => state.CodeSlices.currentLanguage
  );

  return (
    <div className='__helper_header h-[50px] bg-black text-white p-2 flex justify-between items-center'>
      <div className="__btn_container flex gap-1">
        <Button variant="success" className='flex justify-between items-center gap-1'>Save <Save /></Button>
        <Button variant="secondary" className='flex justify-between items-center gap-1' >Share <Share size={16} /></Button>
      </div>
      <div className='__tab_switcher flex justify-center items-center gap-1'>
        <small>Current Language: </small>
        {/* @ts-ignore */}
        <Select defaultValue={currentLanguage} onValueChange={(value) => dispatch(updateCurrentLanguage(value))}>
          <SelectTrigger className="w-[120px] bg-gray-800 outline-none focus:ring-0">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="html">HTML</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default HeaderMenu