import { FC, ChangeEventHandler } from "react";
import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { Selector, Paginator, PageNavigation } from "../../../shared";

import { Car, CarsTable } from "../../../entitites/cars";

interface TableProps {
    data: Car[];
    columns: any;
    searchProps: {
        value: string;
        onChange: ChangeEventHandler<HTMLInputElement>;
    };
}

export const Table: FC<TableProps> = ({ data, columns, searchProps }) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            globalFilter: searchProps.value,
        },

        onGlobalFilterChange: searchProps.onChange,
    });

    return (
        <>
            <CarsTable table={table} />

            <div className="flex w-full items-center justify-between py-5">
                <Selector
                    onChange={(event: { value: string; label: string }) => {
                        table.setPageSize(Number(event.value));
                    }}
                />

                <Paginator
                    hasPreviousPage={!table.getCanPreviousPage()}
                    hasNextPage={!table.getCanNextPage()}
                    goToTheFirstPage={() => table.setPageIndex(0)}
                    goToThePreviousPage={() => table.previousPage()}
                    goToTheNextPage={() => table.nextPage()}
                    goToTheLastPage={() =>
                        table.setPageIndex(table.getPageCount() - 1)
                    }
                />

                <PageNavigation
                    currentPage={table.getState().pagination.pageIndex + 1}
                    totalPages={table.getPageCount()}
                    goToPage={table.setPageIndex}
                />
            </div>
        </>
    );
};
