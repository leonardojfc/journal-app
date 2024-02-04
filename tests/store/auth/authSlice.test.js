import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";

describe('Pruebas en authSlice', () => { 
    test('should return initial state and named "auth"', () => { 
        const state = authSlice.reducer( initialState, {} );
        expect( state ).toEqual(initialState);
        expect( authSlice.name ).toBe('auth');
    });    
    test('should do authentication', () => {
        const loginAction = login(demoUser); 
        const state = authSlice.reducer( initialState, loginAction );
        expect( state ).toEqual( {
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null
        });
    });    
    test('should do logout without args', () => {
        const logoutAction = logout(); 
        const state = authSlice.reducer( authenticatedState, logoutAction );
        expect( state ).toEqual( {
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        });
    });    
    test('should do logout and show an error message', () => {
        const errorMessage = 'This is an error message'
        const logoutAction = logout({errorMessage}); 
        const state = authSlice.reducer( authenticatedState, logoutAction );
        expect( state ).toEqual( {
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: 'This is an error message'
        });
    });    
    test('should change state to checking', () => {
        const state = authSlice.reducer( authenticatedState, checkingCredentials() );
        expect( state.status ).toBe('checking')
    });    
})