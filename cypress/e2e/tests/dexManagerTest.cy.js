import HomePage from '../../page-objects/HomePage'
import LoginPage from '../../page-objects/LoginPage'
import { generateFailingLogin,generateValidLogin} from '../../utils/fakerUtils'

describe('Automation testing', () => {
    it('Valid login', () => {

        LoginPage.visit()
        const {user, password} = generateValidLogin()
        LoginPage.fillUserAndPass(user, password)
        
    })

    it('Invalid login', () => {

        LoginPage.visit()
        const {user, password} = generateFailingLogin()
        LoginPage.fillUserAndPass(user, password)
        
    })
})

