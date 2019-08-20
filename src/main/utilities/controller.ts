import { injectable } from "inversify"
import { ipcMain } from 'electron'

export interface IController {
    connect:Function
    cleanup:Function
}
 
@injectable()
export class Controller implements IController {

    private actionMap = new Map()

    public connect() {
        this.actionMap = new Map([ ])
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