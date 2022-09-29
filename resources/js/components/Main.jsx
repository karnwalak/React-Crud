import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableRow from "./TableRow";

const Main = () => {
    const [allData, setAllData] = useState("");
    useEffect(() => {
        fetch("http://127.0.0.1:8000/get-all-employees")
            .then((response) => {
                return response.json();
            })
            .then((res) => {
                if (res.status === true) {
                    setAllData({ item : res.data });
                }
            });
        }, []);
        let output = allData.item;
        // console.log(output);
    return (
        <div className="row justify-content-center">
          <div className="col-md-12">
          <div className="row justify-content-end my-3">
            <div className="col-md-11 col-lg-11 col-sm-12 col-12"></div>
            <div className="col-md-1 col-lg-1 col-sm-12 col-12 text-end">
            <Link to="/create" className="btn btn-success">Create</Link>
            </div>
          </div>
          <table className="table table-bordered">
              <thead>
                  <tr>
                      <th>SI No</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Registered On</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                  {
                      output?.map((val,key)=>(
                          // alert(val)
                              <TableRow index={key+1} userData={val} />
                      ))
                  }
              </tbody>
          </table>
          </div>
        </div>
    );
};

export default Main;
