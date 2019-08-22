import { injectable, inject } from "inversify"
import { ipcMain } from 'electron'
import { TYPES } from "./types";

export interface IController {
    connect:Function
    cleanup:Function
}
 
@injectable()
export class Controller implements IController {

    @inject(TYPES.TaskManager) taskManager!: IControllable
    private actionMap = new Map()

    public connect() {
        this.actionMap = new Map([
            ...this.taskManager.actionMap
        ])
        ipcMain.on('service', this.listener.bind(this))
    }

    public cleanup() {
        ipcMain.removeListener('service', this.listener.bind(this))
    }

    private async listener(event:any, type:string, ...args:any[]) {
        const action = this.actionMap.get(type)    
        event.returnValue = action ? await action(...args) : false
    }
}

export interface IControllable {
    readonly actionMap:Map<string, Function>;
}