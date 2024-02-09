const { render, screen, fireEvent } = require("@testing-library/react");
const { LoginPage } = require("../../../src/auth/pages/LoginPage");
const { Provider } = require("react-redux");
const { configureStore } = require("@reduxjs/toolkit");
const { authSlice } = require("../../../src/store/auth");
const { MemoryRouter } = require("react-router-dom");
const { notAuthenticatedState } = require("../../fixtures/authFixtures");

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailPassword: ({email, password}) => () => mockStartLoginWithEmailPassword({email, password})
}))

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn()
}))

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,

    },
    preloadedState: {
        auth: notAuthenticatedState
    }
})

describe('Pruebas en <LoginPage/>', () => {
    
    beforeEach(() => jest.clearAllMocks())
    
    test('should show the component correctly', () => { 
       render(
        <Provider store={store}>
            <MemoryRouter>
                <LoginPage/>
            </MemoryRouter>
        </Provider>
       )
       
       expect(screen.getAllByText('Login').length).toBeGreaterThan(0);
    });

    test('should call startGoogleSignIn when click on Google button', () => { 
       render(
        <Provider store={store}>
            <MemoryRouter>
                <LoginPage/>
            </MemoryRouter>
        </Provider>
       )
       
       const googleBtn = screen.getByLabelText('google-btn');
       fireEvent.click( googleBtn );

       expect(mockStartGoogleSignIn).toHaveBeenCalled();
    });    
    test('should submit and call startLoginWithEmailPassword', () => { 
        const email = "leonardojfc9@gmail.com"
        const password = "12346"
       render(
        <Provider store={store}>
            <MemoryRouter>
                <LoginPage/>
            </MemoryRouter>
        </Provider>
       )

       const emailField = screen.getByRole('textbox', {name: 'Correo'});
       fireEvent.change(emailField, {target: {name: 'email', value: email}})

       const passwordField = screen.getByTestId('password');
       fireEvent.change(passwordField, {target: {name: 'password', value: password}})

       const loginForm = screen.getByLabelText('submit-form');
       fireEvent.submit(loginForm);

       expect( mockStartLoginWithEmailPassword ).toHaveBeenCalledWith({
        email, password
       })
    });    
})