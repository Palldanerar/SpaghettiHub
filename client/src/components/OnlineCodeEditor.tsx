import React, { useCallback, useEffect, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { tags as t } from '@lezer/highlight';
import { draculaInit } from '@uiw/codemirror-theme-dracula';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { RootState } from '@/redux/store';
import { updateCodeValue } from '@/redux/slices/CodeSlices';
import { socket } from '@/socket';
import { set } from 'zod';

const OnlineCodeEditor = () => {

    const currentLanguage = useSelector(
        (state: RootState) => state.CodeSlices.currentLanguage
    );

    const dispatch = useDispatch();
    const fullCode = useSelector((state: RootState) => state.CodeSlices.fullCode);

    const onChange = (value: any) => {
        dispatch(updateCodeValue(value))

        console.log(currentLanguage)

        if (currentLanguage == "html") {
            socket.emit("changeCode", {html: value})
        }

        if (currentLanguage == "css") {
            socket.emit("changeCode", {css: value})
        }

        if (currentLanguage == "javascript") {
            socket.emit("changeCode", {javascript: value})
        }
    };

    return (
        <div>
            <CodeMirror
                value={fullCode[currentLanguage]}
                height="calc(100vh - 60px - 50px)"
                extensions={[loadLanguage(currentLanguage)!]}
                onChange={onChange}
                theme={draculaInit({
                    settings: {
                        caret: '#c6c6c6',
                        fontFamily: 'monospace',
                    },
                    styles: [
                        { tag: t.comment, color: '#6272a4' },
                    ]
                })}
            />
        </div>
    )
}

export default OnlineCodeEditor;