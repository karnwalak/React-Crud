import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
const Create = () => {
    const [errorList, setError] = useState("");
    const [message, setMessage] = useState("");
    let navigate = useNavigate();
    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        mobile: "",
        gender: "",
        hobbies: "",
        address: "",
        password: "",
        confirm_password: "",
    });

    const handleChange = (e) => {
        setUserInput({ ...userInput, [e.target.name]: e.target.value });
    };

    const addEmployee = (event) => {
        event.preventDefault();
        // console.log(userInput);
        axios
            .post("http://127.0.0.1:8000/add-employee", userInput)
            .then((res) => {
                if (res.data.status === true) {
                    setMessage(res.data.message);
                    setTimeout(function () {
                      navigate('/home');
                    }, 2000);
                } else {
                    setError(res.data.error);
                }
            });
    };
    return (
        <section>
            <div className="container py-5">
                <form onSubmit={addEmployee}>
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-sm-12 col-md-8 col-12">
                            <div className="row justify-content-center">
                                <div className="col-lg-11 col-sm-12 col-md-11 col-12">
                                    <h2>Add User</h2>
                                    <p className="text-success">{message}</p>
                                </div>
                                <div className="col-lg-1 col-sm-4 col-md-1 col-12 px-0">
                                    <Link
                                        to="/home"
                                        className="btn btn-primary float-right"
                                    >
                                        Back
                                    </Link>
                                </div>
                            </div>
                            <div className="card mb-4 profileDiv p-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0 fw-bold">
                                                Full Name
                                            </p>
                                        </div>
                                        <div className="col-sm-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                onChange={handleChange}
                                                placeholder="Enter Your Name..."
                                            />
                                            <span className="text-danger">
                                                {errorList.name}
                                            </span>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0 fw-bold">
                                                Email
                                            </p>
                                        </div>
                                        <div className="col-sm-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="email"
                                                onChange={handleChange}
                                                placeholder="Enter Your Email..."
                                            />
                                            <span className="text-danger">
                                                {errorList.email}
                                            </span>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0 fw-bold">
                                                Mobile
                                            </p>
                                        </div>
                                        <div className="col-sm-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="mobile"
                                                onChange={handleChange}
                                                placeholder="Enter Your Mobile..."
                                            />
                                            <span className="text-danger">
                                                {errorList.mobile}
                                            </span>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0 fw-bold">
                                                Gender
                                            </p>
                                        </div>
                                        <div className="col-sm-9 d-flex">
                                            <input
                                                type="radio"
                                                className="mx-3"
                                                name="gender"
                                                onChange={handleChange}
                                                value="Male"
                                            />{" "}
                                            Male
                                            <input
                                                type="radio"
                                                className="mx-3"
                                                name="gender"
                                                onChange={handleChange}
                                                value="Female"
                                            />{" "}
                                            Female
                                            <input
                                                type="radio"
                                                className="mx-3"
                                                name="gender"
                                                onChange={handleChange}
                                                value="Other"
                                            />{" "}
                                            Other
                                        </div>
                                        <span
                                            style={{ marginLeft: "217px" }}
                                            className="text-danger"
                                        >
                                            {errorList.gender}
                                        </span>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0 fw-bold">
                                                Hobbies
                                            </p>
                                        </div>
                                        <div className="col-sm-9">
                                            <select
                                                className="form-control"
                                                name="hobbies"
                                                onChange={handleChange}
                                            >
                                                <option value="">Select</option>
                                                <option value="Singing">
                                                    Singing
                                                </option>
                                                <option value="Reading">
                                                    Reading
                                                </option>
                                                <option value="Travelling">
                                                    Travelling
                                                </option>
                                            </select>
                                            <p className="text-danger">
                                                {errorList.hobbies}
                                            </p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0 fw-bold">
                                                Address
                                            </p>
                                        </div>
                                        <div className="col-sm-9">
                                            <textarea
                                                className="form-control"
                                                name="address"
                                                onChange={handleChange}
                                                placeholder="Enter Your Address..."
                                            ></textarea>
                                            <span className="text-danger">
                                                {errorList.address}
                                            </span>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0 fw-bold">
                                                Password
                                            </p>
                                        </div>
                                        <div className="col-sm-9">
                                            <input
                                                className="form-control"
                                                name="password"
                                                onChange={handleChange}
                                                type="password" placeholder="Enter Your Password..."
                                            />
                                            <span className="text-danger">
                                                {errorList.password}
                                            </span>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0 fw-bold">
                                                Confirm Password
                                            </p>
                                        </div>
                                        <div className="col-sm-9">
                                            <input
                                                className="form-control"
                                                name="confirm_password"
                                                onChange={handleChange}
                                                type="password" placeholder="Confirm Your Password..."
                                            />
                                            <span className="text-danger">
                                                {errorList.confirm_password}
                                            </span>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <button
                                                className="btn btn-info text-light"
                                                type="submit"
                                            >
                                                Create
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Create;
