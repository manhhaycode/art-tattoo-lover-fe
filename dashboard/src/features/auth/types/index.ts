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
    roleId: number;
    studioId?: string;
    sessionId: string;
    permissions: EPermissionPermission[];
}

export enum EPermissionPermission {
    MANAGE_BLOG = 'BLOG.ALL',
    MANAGE_OWNED_BLOG = 'BLOG.OWN',
    MANAGE_CATEGORY = 'CATE.ALL',
    MANAGE_PERMISSION = 'PER.ALL',
    MANAGE_ROLE = 'ROLE.ALL',
    MANAGE_STUDIO = 'STU.ALL',
    MANAGE_OWNED_STUDIO = 'STU.OWN',
    MANAGE_STUDIO_ARTISTS = 'STU_A.ALL',
    VIEW_STUDIO_ARTISTS = 'STU_A.R',
    MANAGE_STUDIO_ARTISTS_SCHEDULE = 'STU_AS.ALL',
    VIEW_STUDIO_ARTISTS_SCHEDULE = 'STU_AS.R',
    MANAGE_STUDIO_BOOKING = 'STU_B.ALL',
    VIEW_STUDIO_BOOKING = 'STU_B.R',
    MANAGE_STUDIO_INVOICE = 'STU_I.ALL',
    VIEW_STUDIO_INVOICE = 'STU_I.R',
    MANAGE_STUDIO_SERVICES = 'STU_S.ALL',
    VIEW_STUDIO_SERVICES = 'STU_S.R',
    MANAGE_STUDIO_CUSTOMERS = 'STU_U.R',
    MANAGE_TESTIMONIAL = 'TESTI.ALL',
    MANAGE_OWNED_TESTIMONIAL = 'TESTI.OWN',
    MANAGE_USERS = 'USR.ALL',
    VIEW_OWNED_INVOICE = 'USR_I.R',
}

export enum ERole {
    ADMIN = 'Admin',
    SYSTEM_STAFF = 'System Staff',
    STUDIO_MANAGER = 'Studio Manager',
    STUDIO_STAFF = 'Studio Staff',
    ARTIST = 'Artist',
    MEMBER = 'Member',
}

export enum EStatus {
    ACTIVE = 'Đang hoạt động',
    INACTIVE = 'Tạm ngưng hoạt động',
    DISABLED = 'Đã vô hiệu hóa',
}

export enum ERoleId {
    ADMIN = 1,
    SYSTEM_STAFF = 2,
    STUDIO_MANAGER = 3,
    STUDIO_STAFF = 4,
    ARTIST = 5,
    MEMBER = 6,
}

export const roleMap: Record<number, ERole> = {
    1: ERole.ADMIN,
    2: ERole.SYSTEM_STAFF,
    3: ERole.STUDIO_MANAGER,
    4: ERole.STUDIO_STAFF,
    5: ERole.ARTIST,
    6: ERole.MEMBER,
};

export const statusMap: Record<string, EStatus> = {
    0: EStatus.ACTIVE,
    1: EStatus.INACTIVE,
    2: EStatus.DISABLED,
};

export interface RegisterCredentials {
    fullName: string;
    email: string;
    password: string;
    verifyCode: string;
    phoneNumber: string;
}

export interface ResetPasswordCredentials {
    email: string;
    code: string;
    password: string;
}

export interface IResetPassword extends ILogout {}

export interface IRegister extends ILogout {}

export interface IVerifyEmail extends ILogout {}

export interface IRequestCode extends ILogout {}
