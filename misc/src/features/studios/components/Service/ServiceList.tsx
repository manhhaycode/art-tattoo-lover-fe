import { useGetListServiceStudio } from '@/features/services';
import ServiceCard from './ServiceCard';
import Loading from '@/components/Loading';

export default function ServiceList({ studioId }: { studioId: string }) {
    const { data: listService } = useGetListServiceStudio({
        studioId,
        page: 0,
        pageSize: 100000,
    });
    return !listService ? (
        <Loading />
    ) : (
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3  md:grid-cols-2 ">
            {listService.data.map((service) => {
                return <ServiceCard key={service.id} service={service} studioId={studioId} />;
            })}
        </div>
    );
}
