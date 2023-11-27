// import { Facebook, Instagram, Pinterest, Twitter, YouTube } from '@mui/icons-material';
// import { Container, IconButton, Typography, styled } from '@mui/material';
// export  default function Footer(){
// const FooterContainer = styled('footer')(({ theme }) => ({
//   backgroundColor: theme.palette.primary.main,
//   color: theme.palette.primary.contrastText,
//   padding: theme.spacing(2),
//   marginTop: 'auto',
// }));

import { LogoIcon } from '@/assets/icons';

//   return (
//     <FooterContainer sx={{ background: "#607d8b"}}>
//       <Container maxWidth="md">
//       <Typography variant="body1" align="center">
//         SOCIAL MEDIA
//         </Typography>
//         <Typography variant="body1" align="center">
//       <IconButton size="large" edge="start" color="inherit" aria-label="logo"><Facebook /></IconButton>
//       <IconButton size="large" edge="start" color="inherit" aria-label="logo"><Instagram /></IconButton>
//       <IconButton size="large" edge="start" color="inherit" aria-label="logo"><Twitter /></IconButton>
//       <IconButton size="large" edge="start" color="inherit" aria-label="logo"><Pinterest /></IconButton>
//       <IconButton size="large" edge="start" color="inherit" aria-label="logo"><YouTube /></IconButton>
//       </Typography>
//         <Typography variant="body1" align="center">
//         ©Art Tatto Lover
//         </Typography>
//       </Container>
//     </FooterContainer>
//   );
// };
export default function Footer() {
    return (
        <footer className="pt-40 mx-auto w-[calc(100%-2rem)] 2xl:w-[1372px] sm:w-[calc(100%-4rem)]">
            <div className="w-full lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <a href="https://art-tattoo-lover.vercel.app/" className="flex items-center">
                            <LogoIcon styles={{ fill: '#fff' }} />
                        </a>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase text-white">Tài nguyên</h2>
                            <ul className=" text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a
                                        href="https://art-tattoo-lover.vercel.app/discovery/"
                                        className="hover:underline"
                                    >
                                        Khám phá
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://art-tattoo-lover.vercel.app/become-studio"
                                        className="hover:underline"
                                    >
                                        Trở thành Studio
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase text-white">Cập nhật</h2>
                            <ul className=" text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a
                                        href="https://www.facebook.com/profile.php?id=100067620955823"
                                        className="hover:underline "
                                    >
                                        Facebook
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com/tattus_/" className="hover:underline">
                                        Instagram
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase text-white">Pháp quyền</h2>
                            <ul className=" text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">
                                        Chính sách quyền riêng tư
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Điểu khoản
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 sm:mx-auto border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm  sm:text-center text-gray-400">
                        © 2023{' '}
                        <a href="https://art-tattoo-lover.vercel.app/" className="hover:underline">
                            Tattus™
                        </a>
                        . All Rights Reserved.
                    </span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0">
                        <a href="#" className=" hover:text-white">
                            <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 8 19"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="sr-only">Facebook </span>
                        </a>
                        <a href="#" className=" hover:text-white ms-5">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M14 2H10a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4V6a4 4 0 0 0-4-4z"
                                ></path>
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M14 8H10v6a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V8z"
                                ></path>
                            </svg>
                            <span className="sr-only">Instagram</span>
                        </a>
                        <a href="#" className=" hover:text-white ms-5">
                            <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 17"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="sr-only">Twitter </span>
                        </a>
                        <a href="#" className=" hover:text-white ms-5">
                            <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="sr-only">GitHub </span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
