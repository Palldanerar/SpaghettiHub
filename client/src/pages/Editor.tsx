import React, { useEffect } from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import CodeEditor from '@/components/CodeEditor'
import HeaderMenu from '@/components/HeaderMenu'
import CodeRender from '@/components/CodeRender'
import { useNavigate, useParams } from 'react-router-dom'
import { handleError } from '@/utils/handleError'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { updateFullCode } from '@/redux/slices/CodeSlices'
import toast from 'react-hot-toast'

const Editor = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const loadCode = async () => {
    try {
      if (id) {
        const response = await axios.get(`http://localhost:4000/editor/load/${id}`);
        dispatch(updateFullCode(response.data.fullCode));
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.status == 500) {
          toast.error("Not Found")
          navigate("/editor")
        }
      }
      handleError(error);
    }
  };

  useEffect(() => {
    if (id) {
      loadCode();
    }
  }, [id]);

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel className="h-[calc(100dvh-60px)] min-w-[350px]" defaultSize={40}>
        <HeaderMenu />
        <CodeEditor />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel className="h-[calc(100dvh-60px)] min-w-[350px]" defaultSize={60}>
        <CodeRender />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default Editor