export interface ITaskManager {
    nodeTasks(): Promise<Task[]>
}

export interface Task {
    name: string
    pid: number
    session: string
    sessionNum: number
    memoryUsage: string
}