import { FC } from "react";
import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Search,
    Selector,
    useInput,
    Paginator,
    PageNavigation,
} from "../../../shared";

import { Car, CarsTable } from "../../../entitites/cars";

interface TableProps {
    data: Car[];
    columns: any;
}

export const Table: FC<TableProps> = ({ data, columns }) => {
    const [inputProps] = useInput("");

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            globalFilter: inputProps.value,
        },

        onGlobalFilterChange: inputProps.onChange,
    });

    return (
        <>
            <Search {...inputProps} />

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
