import React from "react";
import TableActionButton from "./TableActionButton";

const TableRow = (props) => {
    return (
        <tr>
            <td>{props.index}</td>
            <td>{props.userData.name}</td>
            <td>{props.userData.email}</td>
            <td>{props.userData.created_at}</td>
            <td>
               <TableActionButton rowId={props.userData.id}/>
            </td>
        </tr>
    );
};

export default TableRow;
