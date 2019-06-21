import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import { ipcRenderer } from 'electron';

const App = () => {
    const [value, setValue] = useState('')

    const handleChange = (val:string) => {
        setValue(ipcRenderer.sendSync('writeLine', val))
    }

    return (
        <>
            <div>Hello Electron</div>
            <input
            value={value}
            onChange={e => handleChange(e.target.value)}
            />
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('app'))
export default App;