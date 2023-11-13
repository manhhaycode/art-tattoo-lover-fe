import { useGetListInvoice } from '@/features/invoices';
import { Pagination } from '@mantine/core';
import { useState } from 'react';
import InvoiceCard from './InvoiceCard';
import { useUnmount } from 'react-use';
import queryClient from '@/lib/react-query';
import Loading from '@/components/Loading';

export default function ManageInvoice() {
    const [page, setPage] = useState(0);

    const { data: invoiceList, isFetching } = useGetListInvoice({
        page,
        pageSize: 16,
    });

    useUnmount(() => {
        queryClient.invalidateQueries(['invoices']);
    });

    return (
        <>
            {isFetching && <Loading />}
            {invoiceList && (
                <>
                    <div className="grid grid-cols-1 gap-4 mt-4 w-full xl:grid-cols-2">
                        {invoiceList.invoices.map((invoice) => {
                            return <InvoiceCard key={invoice.id} invoice={invoice} />;
                        })}
                    </div>
                    <div className="w-full flex justify-end">
                        <Pagination
                            className="ml-auto mt-5"
                            value={page + 1}
                            onChange={(value) => {
                                if (value === page + 1) return;

                                setPage(value - 1);
                            }}
                            size={'md'}
                            total={(invoiceList.total && Math.ceil(invoiceList.total / invoiceList.pageSize)) || 0}
                        />
                    </div>
                </>
            )}
        </>
    );
}
