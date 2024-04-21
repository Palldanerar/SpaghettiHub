import React from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import CodeEditor from '@/components/CodeEditor'
import HeaderMenu from '@/components/HeaderMenu'
import CodeRender from '@/components/CodeRender'

const Editor = () => {
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