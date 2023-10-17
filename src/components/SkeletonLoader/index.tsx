import Skeleton, { SkeletonProps } from 'react-loading-skeleton';

export const SkeletonLoader = ({ ...props }: SkeletonProps) => (
    <Skeleton
        width={'100%'}
        height={'100%'}
        baseColor="#18191A"
        highlightColor="#505253"
        duration={1}
        {...props}
    ></Skeleton>
);
