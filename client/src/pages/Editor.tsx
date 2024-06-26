import React, { useEffect } from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import CodeEditor from '@/components/CodeEditor'
import HeaderMenu from '@/components/HeaderMenu'
import CodeRender from '@/components/CodeRender'
import { useNavigate, useParams } from 'react-router-dom'
import { handleError } from '@/utils/handleError'
import { useDispatch } from 'react-redux'
import { updateFullCode, updateIsOwner } from '@/redux/slices/CodeSlices'
import { useLoadCodeMutation } from '@/redux/slices/api'
import Loader from '@/components/Loaders/Loader'


const Editor = () => {

  const initState = {
    html: "",
    css: "",
    javascript: "",
  }

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [loadCodeProgram, { isLoading }] = useLoadCodeMutation()

  const loadCode = async () => {
    try {
      if (id) {
        const response = await loadCodeProgram(id).unwrap()
        dispatch(updateFullCode(response.fullCode));
        dispatch(updateIsOwner(response.isOwner));
      }
    } catch (error) {
      handleError(error);
      navigate("/editor")
    }
  };

  useEffect(() => {
    if (id) {
      loadCode();
    }

    dispatch(updateFullCode(initState));
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