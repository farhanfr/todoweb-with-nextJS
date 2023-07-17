import React from 'react'

export default function GeneralButton({title,onClick}) {
    return (
        <div>
            <button onClick={onClick} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {title ?? "Button"}
            </button>
        </div>
    )
}
