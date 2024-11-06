import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Button, Col } from "reactstrap";
import { toast } from "react-toastify";
import { register } from "../actions/userActions";

const ActivateAccount = () => {
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");
  const dispatch = useDispatch();
  const { registerInfo, loading, error, success } = useSelector(
    (state) => state.userRegister
  );

  const handleOnActivate = () => {
    dispatch(register(token));
  };

  return (
    <div style = {{display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30}}>
            <div style = {{flexDirection: 'row'}}>
            <Button color="primary" onClick={handleOnActivate}>Activate</Button>
            </div>
            <div style = {{flexDirection: 'row', marginTop: 10}}>
            <Button color="primary">
            <a style = {{color: '#ffffff'}} href = 'app://deeplink'>Continue to App</a>
            </Button>
            </div>
            {!loading && success &&
        registerInfo?.id &&
        toast("User Successfully Activated", { type: "success" })}
      {!loading && error && toast(error, { type: "error" })}
    </div>
    // <Container className="my-5 py-5 email-verify-container">
    //   <Col>
    //   <Button color="primary" onClick={handleOnActivate}>
    //     Activate
    //   </Button>
    //   <Button style = {{backgroundColor: '#52c0b4'}}>
    //     <a style = {{color: '#000000'}} href = 'app://deeplink'>Continue to App</a>
    //   </Button>
    //   </Col>
    //   {!loading && success &&
    //     registerInfo?.id &&
    //     toast("User Successfully Activated", { type: "success" })}
    //   {!loading && error && toast(error, { type: "error" })}
    // </Container>
  );
};

export default ActivateAccount;
