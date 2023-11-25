import Button from '@/components/common/Button';
import { ImageSlider } from '@/components/common/Image';
import { IInvoice } from '@/features/invoices';
import { numbertoPrice } from '@/lib/helper';
import { formatStringTime } from '@/lib/helper/dateHelper';
import { useModalStore } from '@/store/componentStore';
import { IconCalendar, IconCalendarPin } from '@tabler/icons-react';

export default function InvoiceCard({ invoice }: { invoice: IInvoice }) {
    const { setTesimonialModal, setAppointmentModal } = useModalStore();
    return (
        <div
            onClick={() => setAppointmentModal({ invoice: invoice, visible: true, appointment: null })}
            className="px-6 py-4 rounded-xl bg-gray-dark shadow-shadow-dropdown relative cursor-pointer"
        >
            <div className="flex flex-col gap-3 xs:flex-row items-center">
                <div className="flex flex-col gap-y-3 w-full min-w-[40%] sm:w-auto">
                    <ImageSlider className="rounded-xl" src={invoice.studio.logo} />
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            setTesimonialModal({
                                studio: invoice.studio,
                                visible: true,
                            });
                        }}
                        className="text-sm p-[10px]"
                    >
                        Đánh giá studio
                    </Button>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <h4 className="text-base font-semibold xs:text-lg max-w-[70%] truncate">
                            {invoice.studio.name}
                        </h4>
                    </div>
                    <div className="flex items-start gap-1">
                        <div className="w-5">
                            <IconCalendarPin size={16} className="text-white w-5 mt-1" />
                        </div>
                        <p className="text-sm">{invoice.studio.address}</p>
                    </div>

                    <div className="flex items-center gap-1">
                        <IconCalendar size={16} className="text-white w-5" />
                        <h6 className="text-sm">
                            {invoice.appointment
                                ? formatStringTime(invoice.appointment.shift.start)
                                : 'Không có lịch hẹn'}
                        </h6>
                    </div>
                    <div className="flex items-center">
                        <p className="text-sm">Tổng tiền: </p>
                        <p className="text-sm font-semibold ml-1">{numbertoPrice(invoice.total)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
