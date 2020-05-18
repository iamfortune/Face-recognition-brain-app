import React, { Component } from "react";

import "./Signin.css";

class Signin extends Component {
  state = {
    signInEmail: "",
    signInPassword: "",
  };

  onEmailChange = (e) => {
    this.setState({
      signInEmail: e.target.value,
    });
  };

  onPasswordChange = (e) => {
    this.setState({
      signInPassword: e.target.value,
    });
  };

  onSubmitSignIn = () => {
    const { signInEmail, signInPassword } = this.state;
    if (!signInEmail.length || !signInPassword) {
      return;
    }
    fetch("http://localhost:4000/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          this.props.loadUser(data);
          return this.props.onRouteChange("home");
        }
        const err = document.getElementById("error");
        err.textContent = data;
      });
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p
                style={{ cursor: "pointer", fontWeight: "bold" }}
                className="f6 link dim black db"
                onClick={() => onRouteChange("register")}
              >
                Register
              </p>
            </div>
          </div>
          <div id="error" style={{ color: "red", fontWeight: "bold" }}></div>
        </main>
      </article>
    );
  }
}

export default Signin;
