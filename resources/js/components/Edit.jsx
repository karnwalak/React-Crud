import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
const Edit = () => {
    let params = useParams();
    let ids = params.id;
    let navigate = useNavigate();
    // Get Employee Details
    const [errorList,setError] = useState("");
    const [message,setMessage] = useState("");
    const [userInput, setUserInput] = useState({
      name: "",
      email: "",
      mobile: "",
      gender: "",
      hobbies: "",
      address: ""
    });
    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/edit-employee?id=" + ids)
            .then((res) => {
                if (res.data.status === true) {
                  setUserInput(res.data.data);
                }
            });
    }, []);
    const {id,name,email,mobile,gender,hobbies,address} = userInput;

    const handleChange = (e) => {
      setUserInput({...userInput,[e.target.name]:e.target.value});
    };

    
    const updateEmployee = (event) => {
      event.preventDefault();
      axios
            .post("http://127.0.0.1:8000/update-employee",userInput)
            .then((res) => {
                if (res.data.status === true) {
                    setMessage(res.data.message)
                    setTimeout(function(){
                        navigate('/home');
                     }, 2000);
                }else{
                    setError(res.data.error)
                }
            });
    };
    return (
        <section>
            <div className="container py-5">
              <form onSubmit={updateEmployee}>
              <div className="row justify-content-center">
                  <div className="col-lg-8 col-sm-12 col-md-8 col-12">
                      <div className="row justify-content-center">
                          <div className="col-lg-11 col-sm-12 col-md-11 col-12">
                              <h2>Edit User Detail</h2>
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
                                    <input type="hidden" name="id" value={id}/>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={name}
                                            name="name"
                                            onChange={handleChange}
                                            placeholder="Enter Your Name..."
                                        />
                                        <span className="text-danger">{errorList.name}</span>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0 fw-bold">Email</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={email}
                                            name="email"
                                            onChange={handleChange}
                                            placeholder="Enter Your Email..."
                                        />
                                        <span className="text-danger">{errorList.email}</span>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0 fw-bold">Mobile</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={mobile}
                                            name="mobile"
                                            onChange={handleChange}
                                            placeholder="Enter Your Mobile..."
                                        />
                                        <span className="text-danger">{errorList.mobile}</span>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0 fw-bold">Gender</p>
                                    </div>
                                    <div className="col-sm-9 d-flex">
                                        <input
                                            type="radio"
                                            className="mx-3"
                                            name="gender"
                                            checked={gender === "Male"}
                                            onChange={handleChange}
                                            value="Male"
                                        />{" "}
                                        Male
                                        <input
                                            type="radio"
                                            className="mx-3"
                                            name="gender"
                                            checked={
                                                gender === "Female"
                                            }
                                            onChange={handleChange}
                                            value="Female"
                                        />{" "}
                                        Female
                                        <input
                                            type="radio"
                                            className="mx-3"
                                            name="gender"
                                            checked={
                                                gender === "Other"
                                            }
                                            onChange={handleChange}
                                            value="Other"
                                        />{" "}
                                        Other
                                        </div>
                                        <span style={{marginLeft: "217px"}} className="text-danger">{errorList.gender}</span>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0 fw-bold">Hobbies</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <select
                                            className="form-control"
                                            name="hobbies"
                                            value={ hobbies }
                                            onChange={handleChange}
                                        >
                                            <option value="">Select</option>
                                            <option
                                                value="Singing"
                                            >
                                                Singing
                                            </option>
                                            <option
                                                value="Reading"
                                            >
                                                Reading
                                            </option>
                                            <option
                                                value="Travelling"
                                            >
                                                Travelling
                                            </option>
                                        </select>
                                        <p className="text-danger">{errorList.hobbies}</p>
                                        </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                        <div className="col-sm-3">
                                        <p className="mb-0 fw-bold">Address</p>
                                        </div>
                                        <div className="col-sm-9">
                                        <textarea
                                        className="form-control"
                                        name="address"
                                        value={address}
                                        onChange={handleChange}
                                        ></textarea>
                                        <span className="text-danger">{errorList.address}</span>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                       <button className="btn btn-info text-light" type="submit">Update</button>
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

export default Edit;
