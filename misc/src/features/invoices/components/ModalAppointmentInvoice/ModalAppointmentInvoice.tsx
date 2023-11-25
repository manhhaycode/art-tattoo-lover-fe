import { numbertoPrice } from '@/lib/helper';
import { useModalStore } from '@/store/componentStore';
import { formatStringTime } from '@/lib/helper/dateHelper';
import { useGetInvoice } from '@/features/invoices';
import { ImageSlider } from '@/components/common/Image';

export default function ModalAppointmentInvoice() {
    const { appointmentModal } = useModalStore();
    const { data: invoice } = useGetInvoice(appointmentModal.invoice?.id || '');
    return (
        <div className="flex overflow-auto flex-col h-full justify-between lgm:w-[800px]">
            {appointmentModal.invoice && (
                <div className="px-4 mt-20">
                    <h1 className="text-xl font-semibold mb-6 text-center">Thông tin hóa đơn và lịch hẹn</h1>
                    <div className="flex flex-col gap-4 p-4">
                        <p className="text-sm">Tên studio: {appointmentModal.invoice.studio.name}</p>
                        <p className="text-sm ">Địa chỉ: {appointmentModal.invoice.studio.address}</p>
                        <p className="text-sm ">
                            Thời gian:{' '}
                            {appointmentModal.invoice.appointment
                                ? formatStringTime(appointmentModal.invoice.appointment.shift.start)
                                : 'Không có lịch hẹn'}
                        </p>
                        <h1 className="text-base font-semibold">Các dịch vụ đã làm</h1>
                        <div className="flex flex-col gap-2">
                            {invoice &&
                                invoice.invoiceServices.map((service) => (
                                    <p key={service.service.id} className="text-sm">
                                        {service.service.name}:{' '}
                                        {numbertoPrice(
                                            service.price * service.quantity -
                                                service.price * service.quantity * (service.discount / 100),
                                        )}
                                    </p>
                                ))}
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-sm ">Tổng tiền: </p>
                            <p className="text-sm font-semibold">{numbertoPrice(appointmentModal.invoice.total)}</p>
                        </div>
                        <h1 className="text-base font-semibold">Hình ảnh từ studio sau xăm</h1>
                        <div className="flex flex-col gap-6 items-center my-4 w-full">
                            {invoice &&
                                invoice.appointment?.listMedia.map((image) => (
                                    <div key={image.id} className="w-full max-w-[90%]">
                                        <ImageSlider src={image.url} className="rounded-lg" />
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
