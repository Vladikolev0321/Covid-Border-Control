import React, { useMemo } from 'react';
import useTable from 'react-table';
import { COLUMNS } from './Columns';

export const Table = () => {

    const columns = useMemo(() => COLUMNS, []);

    const table = useTable(

        {
            columns
        }
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = table;

    return(
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                        <tr{...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.header.map((column) =>(
                                    <th{...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                ))}
            </thead>

            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                        prepareRow(row)
                        return(
                            <tr{...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td{...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                })}
            </tbody>
        </table>
    )
}