import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./Login.css";
import ReactDOM from "react-dom";

import { EmployeeService } from "../../services/employee.service";

import { Form, Icon, Input, Button, Checkbox, message } from "antd";

const Login = () => {
  document.title = "Đăng nhập"; 
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const FormHeader = (props) => <h2 id="headerTitle">{props.title}</h2>;

  const Form = ({ handleLogin }) => (
    <form enctype="multipart/form-data">
      <div>
        <FormInput
          description="Tài khoản"
          placeholder="Nhập tài khoản của bạn"
          type="text"
          id="id"
          name="username"
          value={username}
          setValue={setUsername}
        />
        <FormInput
          description="Mật khẩu"
          placeholder="Nhập mật khẩu của bạn"
          type="password"
          id="password"
          name="password"
          value={password}
          setValue={setPassword}
        />
        <FormButton handleLogin={handleLogin} title="Đăng nhập" />
      </div>
    </form>
  );

  const FormButton = (props) => (
    <div id="button" class="row">
      <button onClick={props.handleLogin}>{props.title}</button>
    </div>
  );

  const FormInput = (props) => (
    <div class="row">
      <label>{props.description}</label>
      <input
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
        type={props.type}
        placeholder={props.placeholder}
      />
    </div>
  );

  const OtherMethods = (props) => (
    <div id="alternativeLogin">
      {/* <label>Or sign in with:</label> */}
      <div id="iconGroup">
        {/* <Facebook />
        <Twitter />
        <Google /> */}
      </div>
    </div>
  );

  //   ReactDOM.render(<App />, document.getElementById("container"));

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  async function handleLogin(event) {
    
    event.preventDefault();
    if (!validateForm) alert("truong mk");
    else {
      const data = { username, password };
      const Response = await EmployeeService.LoginEmployee(data).then(
        (response) => {
          console.log(response.data.results);
          localStorage.setItem(
            "token",
            JSON.stringify(response.data.results.token)
          );
          localStorage.setItem(
            "username",
            JSON.stringify(response.data.results.user)
          );
          localStorage.setItem(
            "role",
            JSON.stringify(response.data.results.user.roleId)
          );
          if (JSON.parse(localStorage.getItem("role")) === "Shipper") {
            navigate("/shipper");
            window.location.reload();
          }
          if (JSON.parse(localStorage.getItem("role")) === "Admin") {
            navigate("/");
            window.location.reload();
          }
        }
      );
    }
    
    
  }

  return (
    <div id="loginform">
      <FormHeader title="Đăng nhập vào hệ thống cửa hàng" />
      <Form handleLogin={handleLogin} />
      <OtherMethods />
    </div>
  );

  //
};

export default Login;
