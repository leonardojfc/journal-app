import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth";
import { checkingAuthentication, startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks"
import { clearNotesLogout } from "../../../src/store/journal";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../src/firebase/providers')
jest.mock

describe('Pruebas en thunks', () => { 
    const dispatch = jest.fn();

    beforeEach(() => jest.clearAllMocks());
    test('should invoke checkingAuthentication', async () => {
        await checkingAuthentication()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    });    
    test('startGoogleSignIn should call checkingAuthentication and login', async () => {
        const loginData = {ok: true, ...demoUser};
        await singInWithGoogle.mockResolvedValue( loginData );

        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login( loginData ));
    });    
    test('startGoogleSignIn should call checkingAuthentication and logout', async () => {
        const loginData = {ok: false, errorMessage: 'An error has occured on Google'};
        await singInWithGoogle.mockResolvedValue( loginData );

        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout( loginData.errorMessage ));
    });    
    test('startLoginWithEmailPassword should call checkingAuthentication and login', async () => {
        const loginData = {ok: true, ...demoUser};
        const formData = {email: demoUser.email, password: '123456'};
        await loginWithEmailPassword.mockResolvedValue( loginData );

        await startLoginWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login( loginData ));
    });
    test('startLoginWithEmailPassword should call checkingAuthentication and logout', async () => {
        const loginData = {ok: false, errorMessage: 'An error occured on login'};
        const formData = {email: demoUser.email, password: '123456'};
        await loginWithEmailPassword.mockResolvedValue( loginData );

        await startLoginWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout( loginData.errorMessage ));
    });    
    test('startCreatingUserWithEmailPassword should call checkingAuthentication and login', async () => {
        const loginData = {ok: true, ...demoUser};
        const formData = {email: demoUser.email, password: '123456', displayName: demoUser.displayName};
        await registerUserWithEmailPassword.mockResolvedValue( loginData );

        await startCreatingUserWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login( loginData ));
    });    
    test('startCreatingUserWithEmailPassword should call checkingAuthentication and logout', async () => {
        const loginData = {ok: false, errorMessage: 'An error occured while creating user'};
        const formData = {email: demoUser.email, password: '123456', displayName: demoUser.displayName};
        await registerUserWithEmailPassword.mockResolvedValue( loginData );

        await startCreatingUserWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout( loginData.errorMessage ));
    });    
    test('startLogout should call logoutFirebase, clearNotesLogout and logout', async () => {
        await startLogout()(dispatch);

        expect( logoutFirebase ).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
        expect(dispatch).toHaveBeenCalledWith(logout());
    });    
})