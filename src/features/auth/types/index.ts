export interface LoginCredentials {
    email: string;
    password: string;
}

export interface ILogin {
    message: string;
    token: IRefreshToken;
    session: ISession;
}

export interface IRefreshToken {
    accessToken: string;
    accessTokenExp: number;
    refreshToken: string;
    refreshTokenExp: number;
}

export interface ILogout {
    message: string;
    success: boolean;
}

export interface ISession {
    userId: string;
    roleId: string;
    sessionId: string;
}
