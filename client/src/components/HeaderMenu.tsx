import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Code, CodeXml, Copy, Download, Loader, PencilLine, Save, Share, icons } from 'lucide-react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDispatch, useSelector } from 'react-redux'
import { updateCurrentLanguage } from '@/redux/slices/CodeSlices'
import { RootState } from '@/redux/store'
import { handleError } from '@/utils/handleError'
import { useNavigate, useParams } from 'react-router-dom'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from './ui/input'
import toast from 'react-hot-toast'
import { useEditCodeMutation, useSaveCodeMutation } from '@/redux/slices/api'

const HeaderMenu = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { id } = useParams();
  const currentLanguage = useSelector((state: RootState) => state.CodeSlices.currentLanguage);
  const fullCode = useSelector((state: RootState) => state.CodeSlices.fullCode)
  const isOwner = useSelector((state: RootState) => state.CodeSlices.isOwner);
  const [editCode] = useEditCodeMutation();
  const [shareBtn, setShareBtn] = useState<boolean>(false);
  const [postTitle, setPostTitle] = useState<string>("My Code");


  const [saveCode, { isLoading }] = useSaveCodeMutation();

  const handleSaveCode = async () => {
    const body = { fullCode: fullCode, title: postTitle };

    try {
      const response = await saveCode(body).unwrap();
      navigate(`/editor/${response.url}`, { replace: true });
    } catch (error) {
      handleError(error);
      navigate("/login")
    }
  }

  const handleDownloadCode = () => {
    if (fullCode.html === "" && fullCode.css === "" && fullCode.javascript === "") {
      toast.error("Редактор пуст!");
    } else {
      const htmlCode = new Blob([fullCode.html], { type: "text/html" });
      const cssCode = new Blob([fullCode.css], { type: "text/css" });
      const javascriptCode = new Blob([fullCode.javascript], {
        type: "text/javascript",
      });

      const htmlLink = document.createElement("a");
      const cssLink = document.createElement("a");
      const javascriptLink = document.createElement("a");

      htmlLink.href = URL.createObjectURL(htmlCode);
      htmlLink.download = "index.html";
      document.body.appendChild(htmlLink);

      cssLink.href = URL.createObjectURL(cssCode);
      cssLink.download = "style.css";
      document.body.appendChild(cssLink);

      javascriptLink.href = URL.createObjectURL(javascriptCode);
      javascriptLink.download = "script.js";
      document.body.appendChild(javascriptLink);

      if (fullCode.html !== "") {
        htmlLink.click();
      }
      if (fullCode.css !== "") {
        cssLink.click();
      }
      if (fullCode.javascript !== "") {
        javascriptLink.click();
      }

      document.body.removeChild(htmlLink);
      document.body.removeChild(cssLink);
      document.body.removeChild(javascriptLink);

      toast.success("Загрузка кода началась!");
    }
  }

  const handleEditCode = async () => {
    try {
      if (id) {
        await editCode({ fullCode, id: id }).unwrap();
        toast.success("Код успешно обновлён!");
      }
    } catch (error) {
      handleError(error);
    }
  };

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
        {!id && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="success" size="icon" disabled={isLoading}>
                <Save size={16} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex gap-1 justify-center items-center">
                  <Code />
                  Сохранение
                </DialogTitle>
                <div className="__url flex justify-center items-center gap-1">
                  <Input
                    className="bg-slate-700 focus-visible:ring-0"
                    placeholder="Название..."
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                  />
                  <Button
                    variant="success"
                    className="h-full"
                    onClick={handleSaveCode}
                  >
                    Save
                  </Button>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
        <Button onClick={handleDownloadCode} size="icon" variant="blue">
          <Download size={16} />
        </Button>
        {shareBtn && (
          <>
            {isOwner && (
              <Button onClick={handleEditCode} size="icon" variant="blue">
                <PencilLine size={16} />
              </Button>
            )}
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon" variant="secondary"><Share size={16} /></Button>
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
          </>
        )}
      </div>
      <div className='__tab_switcher flex justify-center items-center gap-1'>
        <small>Редактор: </small>
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