import { FC } from "react";
import { flexRender, Table } from "@tanstack/react-table";
import { Car } from "../..";

interface CarsTableProps {
    table: Table<Car>;
}

export const CarsTable: FC<CarsTableProps> = ({ table }) => {
    return (
        <table className="min-w-full text-center text-lg text-gray-500">
            <thead className="min-w-full border-b-4 border-double border-b-gray-400 bg-gray-200 text-xl font-medium uppercase text-gray-700">
                {table.getHeaderGroups().map(headerGroup => (
                    <tr
                        key={headerGroup.id}
                        className="min-w-full [&>*:nth-child(1)]:w-[72px] [&>*:nth-child(2)]:w-fit [&>*:nth-child(3)]:w-2/12 [&>*:nth-child(4)]:w-[250px] [&>*:nth-child(5)]:w-[150px] [&>*:nth-child(6)]:w-max [&>*:nth-child(7)]:w-[150px] [&>*:nth-child(8)]:w-max [&>*:nth-child(9)]:w-max"
                    >
                        {headerGroup.headers.map(header => (
                            <th
                                key={header.id}
                                onClick={header.column.getToggleSortingHandler()}
                                className="px-3 py-2"
                            >
                                {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>

            <tbody className="[&>*:nth-child(even)]:bg-white [&>*:nth-child(odd)]:bg-gray-100">
                {table.getRowModel().rows.map(row => (
                    <tr
                        key={row.id}
                        className="border-b border-b-gray-400"
                    >
                        {row.getVisibleCells().map(cell => (
                            <td
                                key={cell.id}
                                className="px-3 py-2 "
                            >
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
