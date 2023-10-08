import { useCountDown } from '@/hooks';
import { useEffect } from 'react';

export default function CountDown({
    timeTarget,
    typeDisplay = {
        days: false,
        hours: false,
        minutes: true,
        seconds: true,
    },
    onExpire,
    ...props
}: {
    timeTarget: Date;
    typeDisplay?: {
        days: boolean;
        hours: boolean;
        minutes: boolean;
        seconds: boolean;
    };
    onExpire: () => void;
} & React.HTMLAttributes<HTMLParagraphElement>) {
    const { days, hours, minutes, seconds } = useCountDown(timeTarget);

    useEffect(() => {
        if (days + hours + minutes + seconds <= 0) {
            onExpire();
        }
    }, [days, hours, minutes, onExpire, seconds]);

    return (
        <p {...props}>
            {typeDisplay.days && days + ':'}
            {typeDisplay.hours && hours + ':'}
            {typeDisplay.minutes && minutes + ':'}
            {typeDisplay.seconds && seconds}
        </p>
    );
}
