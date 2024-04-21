import React, { useCallback, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { tags as t } from '@lezer/highlight';
import { draculaInit } from '@uiw/codemirror-theme-dracula';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { updateCodeValue } from '@/redux/slices/CodeSlices';

const CodeEditor = () => {

    const currentLanguage = useSelector(
        (state: RootState) => state.CodeSlices.currentLanguage
    );

    const dispatch = useDispatch();
    const fullCode = useSelector((state: RootState) => state.CodeSlices.fullCode);

    const onChange = useCallback((value: any) => {
        dispatch(updateCodeValue(value));
    }, []);

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

export default CodeEditor