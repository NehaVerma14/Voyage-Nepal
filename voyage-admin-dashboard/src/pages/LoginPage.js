import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { Container } from "reactstrap";


import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  const userLogin = useSelector(state => state.userLogin);
  const {error, userInfo} = userLogin;

  useEffect(() => {
    if(error) {
      toast(error, {
        type: 'error'
      })
    }
  }, [error]);

  const history = useHistory();
  useEffect(() => {
    if(userInfo) {
      history.push('/');
    }
  }, [history, userInfo])

  return (
    <Container fluid="true">
      <LoginForm />
    </Container>
  );
};

export default LoginPage;
