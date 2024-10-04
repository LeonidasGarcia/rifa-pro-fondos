import Page from './components/Page.jsx'
import VendedorProvider from './providers/VendedorProvider.jsx'
import CargaGlobalProvider from './providers/CargaGlobalProvider.jsx'

function App() {

  return (
    <>
      <VendedorProvider>
        <CargaGlobalProvider>
          <Page />
        </CargaGlobalProvider>
      </VendedorProvider>
    </>
  )
}

export default App
