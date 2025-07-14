import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ApolloProvider } from '@apollo/client'
import client from './api/apolloClient'
import { store } from './redux/store'
import App from './App'
import './index.css'

const rootElement = document.getElementById('root')

if(!rootElement) throw new Error('Root element not found')

createRoot(rootElement).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  </StrictMode>,
)
