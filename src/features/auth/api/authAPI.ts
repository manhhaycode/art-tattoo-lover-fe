import * as httpRequest from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';

interface LoginCredentials {
    email: string;
    password: string;
}

interface LoginRes {
    message: string;
    token: {
        accessToken: string;
        accessTokenExp: number;
        refreshToken: string;
        refreshTokenExp: number;
    };
    session: SessionRes;
}
interface SessionRes {
    userId: string;
    roleId: string;
    sessionId: string;
}

export const login = async (credentials: LoginCredentials): Promise<LoginRes> => {
    try {
        const resLogin: LoginRes = await httpRequest.post('/auth/login', credentials);
        Cookies.set('tattus-rft', resLogin.token.refreshToken, {
            expires: new Date(resLogin.token.refreshTokenExp * 1000),
        });
        Cookies.set('tattus-at', resLogin.token.accessToken, {
            expires: new Date(resLogin.token.accessTokenExp * 1000),
        });
        const resSession: SessionRes = await getSession();
        return { ...resLogin, session: resSession };
    } catch (e) {
        throw new Error(e.error);
    }
};

export const getSession = async (): Promise<SessionRes> => {
    try {
        const resSession: SessionRes = await httpRequest.get('/auth/session', {
            headers: {
                Authorization: `Bearer ${Cookies.get('tattus-at')}`,
            },
        });
        sessionStorage.setItem('tattus-session', JSON.stringify(resSession));
        return resSession;
    } catch (e) {
        throw new Error(e.error);
    }
};

export const useLoginMutation = (handleFn: {
    onError?: (error: unknown, variables: LoginCredentials, context: unknown) => void;
    onSuccess?: (data: LoginRes, variables: LoginCredentials, context: unknown) => void;
    onMutate?: (variables: LoginCredentials) => Promise<unknown>;
}) => {
    return useMutation({
        mutationFn: (credentials: LoginCredentials) => login(credentials),
        onError: handleFn.onError,
        onSuccess: handleFn.onSuccess,
        onMutate: handleFn.onMutate,
    });
};
