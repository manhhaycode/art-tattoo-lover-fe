import * as httpRequest from '@/lib/axios';
import * as httpAuth from '@/lib/axios-auth';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import {
    ILogin,
    ILogout,
    IRefreshToken,
    IRegister,
    IRequestCode,
    IResetPassword,
    ISession,
    IVerifyEmail,
    LoginCredentials,
    RegisterCredentials,
    ResetPasswordCredentials,
} from '../types';

const login = async (credentials: LoginCredentials): Promise<ILogin> => {
    try {
        const resLogin: ILogin = await httpRequest.post('/auth/login', credentials);
        Cookies.set('tattus-rft', resLogin.token.refreshToken, {
            expires: new Date(resLogin.token.refreshTokenExp * 1000),
        });
        Cookies.set('tattus-at', resLogin.token.accessToken, {
            expires: new Date(resLogin.token.accessTokenExp * 1000),
        });
        const resSession = await getSession();
        if (resSession.roleId === 6) {
            Cookies.remove('tattus-rft');
            Cookies.remove('tattus-at');
            sessionStorage.removeItem('tattus-session');
            throw new Error('You are not allowed to access this page');
        }
        return { ...resLogin, session: resSession };
    } catch (e) {
        throw new Error(e.error);
    }
};

const logout = async (): Promise<ILogout> => {
    try {
        const refreshToken = Cookies.get('tattus-rft');
        const res: ILogout = await httpRequest.post('/auth/logout', { refreshToken });
        Cookies.remove('tattus-rft');
        Cookies.remove('tattus-at');
        sessionStorage.removeItem('tattus-session');
        return res;
    } catch (e) {
        throw new Error(e.error);
    }
};

export const refreshToken = async (): Promise<IRefreshToken> => {
    try {
        const refreshToken = Cookies.get('tattus-rft');
        const res: IRefreshToken = await httpRequest.post('/auth/refresh', { refreshToken });
        Cookies.set('tattus-at', res.accessToken, { expires: new Date(res.accessTokenExp * 1000) });
        return res;
    } catch (e) {
        throw new Error(e.error);
    }
};

const getSession = async (): Promise<ISession> => {
    try {
        const resSession: ISession = await httpAuth.get('/auth/session');
        sessionStorage.setItem('tattus-session', resSession.sessionId);
        sessionStorage.setItem('tattus-role', resSession.roleId.toString());
        return resSession;
    } catch (e) {
        throw new Error(e.error);
    }
};

const verifyEmail = async (email: string): Promise<IVerifyEmail> => {
    try {
        const resVerify: IVerifyEmail = await httpRequest.post('/auth/require-verify', { email });
        return resVerify;
    } catch (e) {
        throw new Error(e.error);
    }
};

const register = async (credential: RegisterCredentials): Promise<IRegister> => {
    try {
        const resRegister: IRegister = await httpRequest.post('/auth/register', credential);
        return resRegister;
    } catch (e) {
        throw new Error(e.error);
    }
};

export const resetPassword = async (credential: ResetPasswordCredentials): Promise<IResetPassword> => {
    try {
        const resReset: IResetPassword = await httpRequest.post('/auth/reset-password', credential);
        return resReset;
    } catch (e) {
        throw new Error(e.error);
    }
};

export const requestCode = async (email: string): Promise<IVerifyEmail> => {
    try {
        const resRequestCode: IVerifyEmail = await httpRequest.post('/auth/request-code', { email });
        return resRequestCode;
    } catch (e) {
        throw new Error(e.error);
    }
};

export const useLoginMutation = (
    handleFn: {
        onError?: (error: unknown, variables: LoginCredentials, context: unknown) => void;
        onSuccess?: (data: ILogin, variables: LoginCredentials, context: unknown) => void;
        onMutate?: (variables: LoginCredentials) => Promise<ILogin>;
    },
    retry?: number,
) => {
    return useMutation({
        mutationFn: (credentials: LoginCredentials) => login(credentials),
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
        retry,
    });
};

export const useLogoutMutation = (
    handleFn: {
        onError?: (error: unknown, variables: unknown, context: unknown) => void;
        onSuccess?: (data: ILogout, variables: unknown, context: unknown) => void;
        onMutate?: () => Promise<ILogout>;
    },
    retry?: number,
) => {
    return useMutation({
        mutationFn: logout,
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
        retry,
    });
};

export const useRefreshTokenMutation = (
    handleFn: {
        onError?: (error: unknown, variables: unknown, context: unknown) => void;
        onSuccess?: (data: IRefreshToken, variables: unknown, context: unknown) => void;
        onMutate?: () => Promise<IRefreshToken>;
    },
    retry?: number,
) => {
    return useMutation({
        mutationFn: refreshToken,
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
        retry,
    });
};

export const useGetSessionMutation = (
    handleFn: {
        onError?: (error: unknown, variables: unknown, context: unknown) => void;
        onSuccess?: (data: ISession, variables: unknown, context: unknown) => void;
        onMutate?: (variables: unknown) => Promise<ISession>;
    },
    retry?: number,
) => {
    return useMutation({
        mutationFn: getSession,
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
        retry,
    });
};

export const useVerifyEmailMutation = (handleFn: {
    onError?: (error: Error, variables: unknown, context: unknown) => void;
    onSuccess?: (data: IVerifyEmail, variables: unknown, context: unknown) => void;
    onMutate?: (variables: string) => Promise<IVerifyEmail>;
}) => {
    return useMutation({
        mutationFn: (email: string) => verifyEmail(email),
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
    });
};

export const useRegisterMutation = (handleFn: {
    onError?: (error: Error, variables: RegisterCredentials, context: unknown) => void;
    onSuccess?: (data: IRegister, variables: RegisterCredentials, context: unknown) => void;
    onMutate?: (variables: RegisterCredentials) => Promise<IRegister>;
}) => {
    return useMutation({
        mutationFn: (credentials: RegisterCredentials) => register(credentials),
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
    });
};

export const useResestPasswordMutation = (handleFn: {
    onError?: (error: Error, variables: ResetPasswordCredentials, context: unknown) => void;
    onSuccess?: (data: IRegister, variables: ResetPasswordCredentials, context: unknown) => void;
    onMutate?: (variables: ResetPasswordCredentials) => Promise<IResetPassword>;
}) => {
    return useMutation({
        mutationFn: (credentials: ResetPasswordCredentials) => resetPassword(credentials),
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
    });
};

export const useRequestCodeMutation = (handleFn: {
    onError?: (error: Error, variables: string, context: unknown) => void;
    onSuccess?: (data: IRequestCode, variables: string, context: unknown) => void;
    onMutate?: (variables: string) => Promise<IRequestCode>;
}) => {
    return useMutation({
        mutationFn: (email: string) => requestCode(email),
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
    });
};
