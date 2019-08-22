import { Container } from "inversify"

import { TYPES } from "./types"
import { IController, Controller } from "./controller"
import { ITaskManager } from "../../common/task-manager"
import { TaskManager } from "../task-manager"

const container = new Container()

container.bind<IController>(TYPES.Controller).to(Controller)
container.bind<ITaskManager>(TYPES.TaskManager).to(TaskManager)

export default container