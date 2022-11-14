import './index.css'
import { createRoot } from 'react-dom/client'
import React from 'react'

import TodoApp from './components/app'

const root = createRoot(document.getElementById('root'))

root.render(<TodoApp />)
