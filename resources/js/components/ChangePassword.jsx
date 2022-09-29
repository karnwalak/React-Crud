import axios from "axios";
import React, { useState } from "react";

const ChangePassword = (props) => {
    const [errorList,setError] = useState("");
    const [message,setMessage] = useState("");
    const [passwordInput, setPassword] = useState({
      password: "",
      confirm_password: ""
    });
    const handleInput = (e) => {
        setPassword({ ...passwordInput, [e.target.name]: e.target.value });
    };

    const updatePassword = (event) => {
      event.preventDefault();
      axios.post("http://127.0.0.1:8000/change-password",{data:passwordInput,id:props.employeeId}).then((res)=>{
        if(res.data.status === false){
          setError(res.data.error);
        }else{
          setMessage(res.data.message);
        }
      })
    };

    return (
        <div className="row my-3">
            <div className="col-sm-3">
                <button
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                >
                    Change Password
                </button>
            </div>
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Change Password
                            </h5>
                            <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            ></button>
                            </div>
                            <div className="modal-body">
                            <p className="text-success">{message}</p>
                            <form onSubmit={updatePassword}>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        onChange={handleInput}
                                        placeholder="Enter Password"
                                    />
                                    <span className="text-danger">{errorList.password}</span>
                                </div>
                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="confirm_password"
                                        onChange={handleInput}
                                        placeholder="Confirm Your Password"
                                    />
                                </div>
                                <div className="form-group my-3">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary mx-3"
                                    >
                                        Save changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
