import { InputWrapper } from '@mantine/core';
import RichTextEditor, { Editor } from '@mantine/rte';
import React, { useEffect, useRef, useState } from 'react'

const EditBox = ({ description, errors, clearErrors, getEditorContent }) => {

    const [value, setValue] = useState(description);
    const editorRef = useRef(Editor);

    useEffect(() => {
        if (description) {
            editorRef.current.editor.root.innerHTML = description;
        }
    }, [description]);

    useEffect(() => {
        if (value) {
            getEditorContent(value)
        }
    }, [value, getEditorContent])

    return (
        <>
            <InputWrapper error={errors.description?.message}>
                <RichTextEditor ref={editorRef} value={value} onChange={(e) => { setValue(e); clearErrors('description') }} sx={{ border: errors.description ? '2px solid red' : '', padding: 2 }} />
            </InputWrapper>

        </>
    )
}

export default EditBox
