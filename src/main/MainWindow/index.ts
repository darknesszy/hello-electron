import { BrowserWindow, ipcMain } from "electron";

export default class MainWindow extends BrowserWindow {
    constructor() { super()
        ipcMain.on('writeLine', this.writeLine)
    }

    writeLine(event:any, args:any) {
        console.log(args)
        event.returnValue = args
    }
}