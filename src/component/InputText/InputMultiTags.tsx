import React, { useRef } from "react";
import { WithContext as ReactTags, SEPARATORS } from "react-tag-input";

const InputMultiTags = ({tags, handleDelete, handleAddition}) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    return (
        <>
            <ReactTags
                tags={tags}
                separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]}
                handleDelete={handleDelete}
                autoFocus={false}
                handleAddition={handleAddition}
                inputFieldPosition="inline"
                inputRef={inputRef}
                placeholder="Enter your interest..."
                classNames={{
                    tags: "w-full flex flex-col flex-wrap gap-3 bg-[#D9D9D90F] rounded-lg px-2 py-3  shadow-sm",
                    tag: "bg-[rgba(255,255,255,0.2)] text-white text-sm px-3 py-2 rounded-md mr-1 mb-2",
                    remove: "ml-2 cursor-pointer hover:text-red-300",
                    tagInputField: "w-[100%] rounded-md border-0 p-2 mt-2 outline-none",
                }}
                
            />
        </>
    )
}

export default InputMultiTags;