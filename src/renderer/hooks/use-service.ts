import { useState } from "react"
import { remote, ipcRenderer } from "electron"

export const useService = () => {
    const [windowId] = useState(remote.getCurrentWindow().id)

    return {
        windowId,
    }
}