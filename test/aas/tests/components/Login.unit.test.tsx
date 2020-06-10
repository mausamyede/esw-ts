import React from 'react'
import { Provider } from '../../../../src/aas/components/context/AuthContext'
import { AuthContextConfig, AuthContextProvider, Login } from '../../../../src/aas'
import { render, fireEvent } from '@testing-library/react'
import { mockAuth } from '../../../utils/MockHelpers'
import { delay } from '../../../../integration/utils/eventually'

// DEOPSCSW-630 - Javascript adapter for AAS
// DEOPSCSW-631 - React layer for javascript adapter for AAS
describe('<Login />', () => {
  test('should call login', async () => {
    const config: AuthContextConfig = {
      realm: 'TMT-test',
      clientId: 'esw-gateway-client'
    }
    const { getByText, container } = await render(
      <AuthContextProvider config={config}>
        <Login />
      </AuthContextProvider>
    )

    console.log(container)

    fireEvent.click(getByText('Login'))
    await delay(2000)
    console.log('*****************************************')
    console.log(window)
  })

  test('should render login', async () => {
    const { container } = render(<Login />)
    expect(container).toMatchSnapshot()
  })
})
