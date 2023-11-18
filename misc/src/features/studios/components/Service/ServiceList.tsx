import { IService } from '@/features/services';
import ServiceCard from './ServiceCard';

export default function ServiceList({ serviceList, studioId }: { serviceList: IService[]; studioId: string }) {
    return (
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3  md:grid-cols-2 ">
            {serviceList.map((service) => {
                return <ServiceCard key={service.id} service={service} studioId={studioId} />;
            })}
        </div>
    );
}
