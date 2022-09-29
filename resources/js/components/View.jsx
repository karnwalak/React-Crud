import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import image from "./upload.png";
const View = () => {
    let params = useParams();
    let ids = params.id;
    //Get Employee Details
    const [employee, setEmployeeData] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/get-single-employee?id=" + ids)
            .then((res) => {
                if (res.data.status === true) {
                    setEmployeeData(res.data.data);
                }
            });
    }, []);
    const [file, setFile] = useState();
    function handleChange(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
        const formData = new FormData();
        formData.append("fileupload", e.target.files[0]);
        formData.append("id", ids);

        axios
            .post("http://127.0.0.1:8000/update-profile-picture", formData)
            .then((res) => {
                if (res.data.status === true) {
                    setError("");
                    setMessage(res.data.message);
                    window.location.reload();
                } else {
                    setError(res.data.error);
                }
            });
    }
    return (
        <section>
            <div className="container py-5">
                <div className="row justify-content-end py-2">
                    <div className="col-md-1 col-lg-1 col-sm-6 col-6 text-end">
                        <Link
                            to="/home"
                            className="btn btn-primary float-right"
                        >
                            Back
                        </Link>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-sm-12 col-md-4 col-12">
                        <div className="card mb-4 profileDiv">
                            <div className="card-body text-center">
                                <div style={{ height: "200px", width: "100" }}>
                                    <img
                                        src={
                                            employee.profile_pic
                                                ? employee.profile_pic
                                                : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                        }
                                        alt="avatar"
                                        className="rounded-circle img-fluid"
                                        style={{ width: "150px" }}
                                    />
                                </div>
                                <div className="row mt-2 justify-content-center">
                                    <div className="col-md-8 col-lg-8 col-8">
                                        <p className="text-success">
                                            {message}
                                        </p>
                                        <p className="text-danger">{error}</p>
                                        <label htmlFor="image">
                                            <img
                                                width="60%"
                                                name="image"
                                                src={image}
                                            />
                                        </label>
                                        <input
                                            type="file"
                                            id="image"
                                            name="image"
                                            onChange={handleChange}
                                            className="form-control d-none"
                                        />
                                    </div>
                                    <div className="col-md-8 col-lg-8 col-8">
                                        <p>Upload Image</p>
                                    </div>
                                    <div className="col-md-8 col-lg-8 col-8">
                                        <h3>{employee.name}</h3>
                                        <span>Software Developer</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 col-sm-12 col-md-8 col-12">
                        <div className="card mb-4 profileDiv p-3">
                            <h2>User Detail</h2>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0 fw-bold">
                                            Full Name
                                        </p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">
                                            {employee.name}
                                        </p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0 fw-bold">Email</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">
                                            {employee.email}
                                        </p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0 fw-bold">Mobile</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">
                                            {employee.mobile}
                                        </p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0 fw-bold">Gender</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">
                                            {employee.gender}
                                        </p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0 fw-bold">Hobbies</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">
                                            {employee.hobbies}
                                        </p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0 fw-bold">Address</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">
                                            {employee.address}
                                        </p>
                                    </div>
                                </div>
                                <ChangePassword employeeId={employee.id}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default View;
