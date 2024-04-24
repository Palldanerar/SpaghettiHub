import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { CodeXml, Copy, Loader, Save, Share } from 'lucide-react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDispatch, useSelector } from 'react-redux'
import { updateCurrentLanguage } from '@/redux/slices/CodeSlices'
import { RootState } from '@/redux/store'
import { handleError } from '@/utils/handleError'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from './ui/input'
import toast from 'react-hot-toast'
import { useSaveCodeMutation } from '@/redux/slices/api'

const HeaderMenu = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const currentLanguage = useSelector((state: RootState) => state.CodeSlices.currentLanguage);
  const fullCode = useSelector((state: RootState) => state.CodeSlices.fullCode)
  const [shareBtn, setShareBtn] = useState<boolean>(false);

  const [saveCode, { isLoading }] = useSaveCodeMutation();

  const handleSaveCode = async () => {
    const body = { fullCode: fullCode };
    try {
      const response = await saveCode(body).unwrap();
      navigate(`/editor/${response.url}`, { replace: true });
    } catch (error) {
      handleError(error);
    }
  }

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      setShareBtn(true);
    } else {
      setShareBtn(false);
    }
  }, [id]);

  return (
    <div className='__helper_header h-[50px] bg-black text-white p-2 flex justify-between items-center'>
      <div className="__btn_container flex gap-1">
        <Button onClick={handleSaveCode} disabled={isLoading} variant="success" className='flex justify-between items-center gap-1'>{isLoading ? <Loader className='animate-spin' /> : <><Save /> Save</>}</Button>
        {shareBtn && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" className='flex justify-between items-center gap-1' >Share <Share size={16} /></Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className='flex gap-1 justify-center items-center' ><CodeXml /> Share you Code!</DialogTitle>
                <div className="__url flex justify-center items-center gap-1">
                  <Input disabled className="w-full p-2 rounded bg-slate-800 text-slate-400 select-none" value={window.location.href} />
                  <Button variant="outline" className="h-full"
                    onClick={() => {
                      window.navigator.clipboard.writeText(
                        window.location.href
                      );
                      toast.success("URL Copied to your clipboard!");
                    }}>
                    <Copy size={16} />
                  </Button>
                </div>
                <p className="text-center text-slate-400 text-xs">
                  Share this URL with your friends to collaborate.
                </p>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
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