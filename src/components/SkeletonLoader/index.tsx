import Skeleton, { SkeletonProps } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const SkeletonLoader = ({ ...props }: SkeletonProps) => (
    <Skeleton width={'100%'} height={'100%'} baseColor="#dedede" duration={2} {...props}></Skeleton>
);
