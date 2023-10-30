import { Image } from '@mantine/core';

export default function AvartarIcon({ logo, fullName }: { logo?: string; fullName: string }) {
    return (
        <div className="rounded-[50%] bg-black text-white flex items-center justify-center relative h-full w-full min-h-[36px] min-w-[36px]">
            {logo ? (
                <Image src={logo} alt="logo" className="rounded-[50%]" />
            ) : (
                <p className="text-xs">{fullName.trim().charAt(0)}</p>
            )}
        </div>
    );
}
