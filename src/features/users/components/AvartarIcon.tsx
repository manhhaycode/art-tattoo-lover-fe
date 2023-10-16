export default function AvartarIcon({ logo, fullName }: { logo?: string; fullName: string }) {
    return (
        <div className="h-9 w-9 rounded-[50%] bg-black text-white flex items-center justify-center relative">
            {logo ? (
                <></>
            ) : (
                <>
                    <p className="text-xs">{fullName.trim().charAt(0)}</p>
                    <svg
                        className="absolute top-[-2px] right-0 z-10"
                        xmlns="http://www.w3.org/2000/svg"
                        width="34"
                        height="36"
                        viewBox="0 0 34 36"
                        fill="none"
                    >
                        <circle cx="28" cy="6" r="5.5" fill="#3CFF38" stroke="white" />
                    </svg>
                </>
            )}
        </div>
    );
}
