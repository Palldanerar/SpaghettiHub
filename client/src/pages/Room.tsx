import React, { useEffect, useState } from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import HeaderMenu from '@/components/HeaderMenu'
import CodeRender from '@/components/CodeRender'
import { useDispatch, useSelector } from 'react-redux'
import { updateFullCode } from '@/redux/slices/CodeSlices'
import { socket } from '@/socket'
import { RootState } from '@/redux/store';
import OnlineCodeEditor from '@/components/OnlineCodeEditor'

const Room = () => {

    const initState = {
        html: "",
        css: "",
        javascript: "",
    }

    const currentUser = useSelector((state: RootState) => state.AppSlice.currentUser);
    const dispatch = useDispatch();


    dispatch(updateFullCode(initState));

    useEffect(() => {

        socket.emit("joinRoom", currentUser)

        socket.on("currentCode", (code) => {
            dispatch(updateFullCode(code));
        })

    }, [])

    return (
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel className="h-[calc(100dvh-60px)] min-w-[350px]" defaultSize={40}>
                <HeaderMenu />
                <OnlineCodeEditor />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel className="h-[calc(100dvh-60px)] min-w-[350px]" defaultSize={60}>
                <CodeRender />
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

export default Room