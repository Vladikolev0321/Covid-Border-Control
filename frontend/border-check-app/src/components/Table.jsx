import { getDisplayDate } from '@material-ui/pickers/_helpers/text-field-helper'
import React from 'react'
import { useState } from 'react'
import { useTable } from 'react-table'
import { Columns } from './Columns'
import axios from 'axios'
 

 export const Table = () => {
    const [data1, setData] = useState({
             id: 1,
             firstName: 'Gosho',
             lastName: 'Ivanov',
             birthdate: '2021-7-13',
             healthStatus: 'Vaccinated'
           })

    const getData = async () => {

        const response = await axios.get('http://3.140.105.132:443/test')
        console.log(response)
        setData(response)
    };



   getData()
   const data = React.useMemo(
     () => [
        data1
     ]
     ,
     []
   )
 
   const columns = React.useMemo(() =>  Columns, [] )
 
   const {
     getTableProps,
     getTableBodyProps,
     headerGroups,
     rows,
     prepareRow,
   } = useTable({ columns, data })
 
   return (
       
     <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
                 style={{
                   borderBottom: 'solid 3px red',
                   background: 'aliceblue',
                   color: 'black',
                   fontWeight: 'bold',
                 }}
               >
                 {column.render('Header')}
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => {
                 return (
                   <td
                     {...cell.getCellProps()}
                     style={{
                       padding: '10px',
                       border: 'solid 1px gray',
                       background: 'papayawhip',
                     }}
                   >
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
     </table>
   )
 }