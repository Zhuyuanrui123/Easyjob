import React, { useState, useContext } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import Card from "@material-ui/core/Card";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import { SessionContext, setSessionCookie } from "../components/UserContext";
import { useHistory } from "react-router";

function Login() {
  var UserisRegistered = false;
  const [isRegistered, setRegisterState] = useState(true);
  const [UserName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { setSession } = useContext(SessionContext);

  function handleClick() {
    setRegisterState(!isRegistered);
  }

  // function handleChange(e){
  //   setUserName(e.target.value);
  // }
  async function signUp(e) {
    e.preventDefault();

    console.log("react sign up called");
    console.log(document.getElementById("username").value);
    if (isRegistered) {
      let userName = document.getElementById("username")?.value;
      let password = document.getElementById("password")?.value;
      let data = {
        userName: userName,
        password: password,
      };
      Axios.post("http://localhost:5000/login", data).then(
        (response) => {
          const id = response.data.token;
          setSession({ userName, id });
          setSessionCookie({ userName, id });

          console.log("Response");
          console.log(response);
          history.push("/");
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      let userName = document.getElementById("username")?.value;
      let password = document.getElementById("password")?.value;
      let firstName = document.getElementById("firstname")?.value;
      let lastName = document.getElementById("lastname")?.value;
      let data = {
        userName: userName,
        password: password,
        firstName: firstName,
        lastName: lastName,
      };

      Axios.post("http://localhost:5000/register", data).then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  const useStyles = makeStyles((theme) => ({
    root: {
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    },
    Button: {
      marginTop: "4%",
    },
    card: {
      width: "40%",
      margin: "auto",
      marginTop: "10%",
      padding: "auto",
      height: "50%",
    },
    title: {
      marginBottom: "5%",
    },
    loginSquare: {
      padding: "10%",
      backgroundColor: "white",
    },
    link: {
      marginTop: "5%",
    },
  }));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <Container className={classes.loginSquare} maxWidth="xs">
          <form
            onSubmit={(e) => {
              signUp(e);
            }}
          >
            <FormGroup>
              <h1 className={classes.title}>
                {isRegistered ? "???????????????" : "???????????????"}
              </h1>

              {!isRegistered ? (
                <div>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="text"
                      id="firstname"
                      placeholder="???"
                      required
                      autofocus
                    >
                      {" "}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="text"
                      id="lastname"
                      placeholder="???"
                      required
                      autofocus
                    >
                      {" "}
                    </TextField>
                  </Grid>
                </div>
              ) : null}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  id="username"
                  placeholder="??????"
                  name="username"
                  label="??????"
                  required
                  autofocus
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="??????"
                  name="password"
                  size="small"
                  type="password"
                  id="password"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  className={classes.Button}
                  color="primary"
                  variant="outlined"
                  fullWidth
                  type="submit"
                >
                  {isRegistered ? "??????" : "???????????????"}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <div className={classes.link}>
                  <Link onClick={handleClick}>
                    {isRegistered ? "???????????????" : "????????????"}{" "}
                  </Link>
                </div>
              </Grid>
            </FormGroup>
          </form>
        </Container>
      </Card>
    </div>
  );
}
export default Login;
