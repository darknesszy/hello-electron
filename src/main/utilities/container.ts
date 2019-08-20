import { Container } from "inversify"

import { TYPES } from "./types"
import { IController, Controller } from "./controller"

const container = new Container()

container.bind<IController>(TYPES.Controller).to(Controller)

export default container