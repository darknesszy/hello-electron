import { injectable } from "inversify"
import { exec } from "child_process"
import { ITaskManager, Task } from "../common/task-manager"
import { IControllable } from "./utilities/controller"


@injectable()
export class TaskManager implements ITaskManager, IControllable {

    actionMap: Map<string, Function> = new Map([
        ['taskManager/nodeTasks', this.nodeTasks.bind(this)]
    ])
    
    async nodeTasks() {

        const tasks = await this.fetchTaskList()
        const listStart = tasks.lastIndexOf('=')
        const data = tasks.slice(listStart, tasks.length).split('\n')

        data.shift()

        return data.filter(el => el).map<Task>(el => {

            const cols = el.split(/\s{3,}/)
            const session = cols[1].split(' ')

            return {
                name: cols[0],
                pid: Number(session[0]),
                session: session[1],
                sessionNum: Number(cols[2]),
                memoryUsage: cols[3]
            }
        })
    }

    private fetchTaskList() {

        return new Promise<string>((resolve, reject) => {
            exec('tasklist', (error, stdout, stderr) => {
                if (error) {
                  console.error(`exec error: ${error}`)
                  reject(error)
                }
                // console.log(`stdout: ${stdout}`)
                // console.error(`stderr: ${stderr}`)
    
                resolve(stdout)
            })
        })
    }
}