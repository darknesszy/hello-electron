import { useState } from "react"
import { remote, ipcRenderer } from "electron"
import { ITaskManager } from "../../common/task-manager"

export const useService = () => {
    const [windowId] = useState(remote.getCurrentWindow().id)

    const taskManager: ITaskManager = {
        nodeTasks:(...args: any[]) => ipcRenderer.sendSync('service', 'taskManager/nodeTasks', ...args),
    }

    return {
        windowId,
        taskManager,
    }
}