import React, { useState } from 'react'
import { useService } from './hooks/use-service'
import { Task } from '../common/task-manager'

const App = () => {

    const { taskManager } = useService()
    const [tasks, setTasks] = useState<Task[]>([])
    const [hover, setHover] = useState()

    return (
        <div className="container">

            <div className="row">
                <div className="col-auto">
                    <h2>Hello Electron</h2>
                </div>
            </div>

            <div className="row justify-content-between">
                <div className="col-auto">
                    <button onClick={async e => setTasks(await taskManager.nodeTasks())}>
                        Check Processes
                    </button>
                    <button onClick={e => setTasks([])} disabled={tasks.length == 0}>
                        Clear
                    </button>
                </div>
                <div className="col-auto">
                    <span style={{ fontSize: 12 }}>
                        { tasks.length != 0 && `${tasks.indexOf(hover) + 1} of ${tasks.length} processes` }
                    </span>
                </div>
            </div>

            <div className="row">
                <ul 
                className="col-12" 
                style={{ 
                    height: '70vh', 
                    overflowY: tasks.length > 9 ? 'scroll' : 'hidden'
                }}
                >
                    { tasks.map(el => 
                        <li 
                        onMouseOver={e => setHover(el)}
                        style={{ 
                            listStyle: 'none', 
                            borderTop: '1px solid rgba(0,0,0,0.1)', 
                            outline: hover == el ? '1px dotted blue' : '',
                            padding: 10
                        }}
                        >
                            {el.name}
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default () => <App />