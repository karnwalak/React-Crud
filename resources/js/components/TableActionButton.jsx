import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const TableActionButton = (props) => {
    let navigate = useNavigate();
    const deleteEmployee = (id) => {
      axios.get("http://127.0.0.1:8000/delete-employee?id="+id).then((res)=>{
        if (res.data.status === true) {
            setTimeout(function () {
              window.location.reload();
            }, 2000);
        }
      });
    }
    return (
        <div>
            <Link
                type="button"
                to={`/view/${props.rowId}`}
                className="btn btn-primary"
            >
                View
            </Link>
            <Link
                type="button"
                to={`/edit/${props.rowId}`}
                className="btn btn-success mx-1"
            >
                Edit
            </Link>
            <button
                type="button"
                onClick={()=>{deleteEmployee(props.rowId)}}
                className="btn btn-danger"
            >
                Delete
            </button>
        </div>
    );
};

export default TableActionButton;
