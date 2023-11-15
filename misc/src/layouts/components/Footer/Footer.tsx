// import { Facebook, Instagram, Pinterest, Twitter, YouTube } from '@mui/icons-material';
// import { Container, IconButton, Typography, styled } from '@mui/material';
// export  default function Footer(){
// const FooterContainer = styled('footer')(({ theme }) => ({
//   backgroundColor: theme.palette.primary.main,
//   color: theme.palette.primary.contrastText,
//   padding: theme.spacing(2),
//   marginTop: 'auto',
// }));

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
        <footer className="">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <a href="https://art-tattoo-lover.vercel.app/" className="flex items-center">
                            <img
                                src="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAdCAYAAAAzfpVwAAAEMklEQVRYhcWXfWiWZRTGf7OablFOLWhFaW0Z+ZF9kWnLvkhqpFLIUgpXf7Q+tLG/tgyzWVQUFZlaWSEFrRGaFCmIU8uPsKQ0gmrhNqbhRItRC5uorDhy3XC8ed7nfd/p7Prnee7z3M95rufc577OuQsOj6jA4WLgNzKjFrhc139T5g0IBjmnbwK7gTEZPjQEWAzM0w9VDBCnjAhkJwFPAoOBXcDQhBcWu/uLgGP/F9kmZzuSsMQjgRo3fgL45jTwOwFGdipwqTPeDPRE82qj8WSgVPeFwE2ni+xDbvwp8EM0pzSB7INAKzATeAHYBrwPXDKQZE0NOlxk7wA2RXO+B67VfYfydXAGf33aqIuAPzPMqQY6gc35krXIDnPjzuh5lSNqGAdcAbSk+KsD2rVhYwwHPgC+ApYCRfmS7XPjs6Lny93980AvsEd5/k6K3+GKsKVUcQZ/NflqtZE94MZeYy0XS3T/B7AwevfqHPyPcRI3QTkecANwOF+yP7pxta6ms087e13Cux+l5GVAlaTQ8KGzr0zYyDmRfcuNZwC3Aa9F80Y5TR6qPF4GXAC8qNSIsQ74TLYaRRbJ4iP5EkVqYNeNwO1Z5rap1N4LPAo0AK+45wulAgZb+nOV47aBu908W7GXToasaWlXP97/Th8P6nAj8J70ulG2lS5Xe/UT/SrVYWn3q3IdiJ5fBzyW8v71wHoRKlMJHu+Ijog2lanN5ynNUk5kURX6y41NmnZKbkZn6QVmqmNriOzPROMzgUrgJ+Bl4Jx8yPp+tl4OkLNx0dzuqIAkwYrKZdLPC4F9bs5WrZ7H7/qh5Vn8HkeIbIUjinLRwz78CXA0i7+7ndCvcXbL4ylqgD529vO1glZ6Z+VKdnZkr1YK3KWxbb7HlQ5NJGONmhuD5fk1uv/VtZfbgQekKD87L/YjzcCGNFU6Y0Hx8UbpS3X/E4Gz9axU3dVVwLfKZysCq7WktvPPiz54SE3OFvMte7d+osPNbZW+H1KvHPxYCv0CfJ0W2V7lTTmwJJpznxz45nuTcjro5TKnJNYTFLq5oyVta/XjHq/KHrAtSscTEB8YAypFJHa+XRtio7ON18b6Wx1ZSIVMaHTFY6RUJDRQU7RqiQhpEGO3Er9HuRdSw06/c5yUGcGDrv6vUmlGFW+altafRG5VMNpU9bzq2FmwANiRT2Q9inWaeD1qunvVmzaK8ISoOZmslUDHnqeAe7J9TGjXRtvrjYPS3hD+0WYojzqnIilEm449b7tnzY4o2jAW5emaH8Ok7QtnK1N0r/TzcolsjFuA55RfSTCdLUk4dAYUapXmatznlKNOHZkvx3dK0nKKbIzNIlwfnTIC5qcQRfk9T32FRfxZ9+wNYKxy912taotOKf2KrEeZThT3y9alA+WpgvUSVkQeBlacLNkAWyqTNIuMFY1TDxj1H1K66r8BteOiAAAAAElFTkSuQmCC"
                                className="h-8 me-3"
                                alt=""
                            />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                                Tattus
                            </span>
                        </a>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold uppercase text-white">Tài nguyên</h2>
                            <ul className=" text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a href="https://art-tattoo-lover.vercel.app/" className="hover:underline">
                                        Khám phá
                                    </a>
                                </li>
                                <li>
                                    <a href="https://art-tattoo-lover.vercel.app/" className="hover:underline">
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
                                    clip-rule="evenodd"
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
                                    clip-rule="evenodd"
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
                                    clip-rule="evenodd"
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
