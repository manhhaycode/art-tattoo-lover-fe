import * as httpRequest from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { ILogin, ILogout, IRefreshToken, ISession, LoginCredentials } from '../types';

const login = async (credentials: LoginCredentials): Promise<ILogin> => {
    try {
        const resLogin: ILogin = await httpRequest.post('/auth/login', credentials);
        Cookies.set('tattus-rft', resLogin.token.refreshToken, {
            expires: new Date(resLogin.token.refreshTokenExp * 1000),
        });
        Cookies.set('tattus-at', resLogin.token.accessToken, {
            expires: new Date(resLogin.token.accessTokenExp * 1000),
        });
        const resSession: ISession = await getSession();
        return { ...resLogin, session: resSession };
    } catch (e) {
        throw new Error(e.error);
    }
};

const logout = async (): Promise<ILogout> => {
    try {
        const refreshToken = Cookies.get('tattus-rft');
        const res: ILogout = await httpRequest.post(
            '/auth/logout',
            { refreshToken },
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('tattus-at')}`,
                },
            },
        );
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
        const resSession: ISession = await httpRequest.get('/auth/session', {
            headers: {
                Authorization: `Bearer ${Cookies.get('tattus-at')}`,
            },
        });
        sessionStorage.setItem('tattus-session', resSession.sessionId);
        return resSession;
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
        onMutate?: (variables: unknown) => Promise<unknown>;
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
