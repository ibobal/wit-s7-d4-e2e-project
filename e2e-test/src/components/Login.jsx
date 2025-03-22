import React, { useEffect, useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";

const errorMessages = {
  email: "Please enter a valid email address",
  password: "Password must be at least 4 characters long",
};

const initialForm = {
  email: "",
  password: "",
  terms: false,
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    terms: false,
  });
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const newErrors = {};
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    if (!validateEmail(form.email)) newErrors.email = true;
    if (form.password.length < 4) newErrors.password = true;
    if (!form.terms) newErrors.terms = true;

    setErrors(newErrors);
    if (!newErrors.email && !newErrors.password && !newErrors.terms) {
      setIsValid(true);
    }
  }, [form]);

  const history = useHistory();

  const handleChange = (event) => {
    let { name, value, type } = event.target;
    value = type === "checkbox" ? event.target.checked : value;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    if (!isValid) return;
    event.preventDefault();

    axios
      .get("https://6540a96145bedb25bfc247b4.mockapi.io/api/login")
      .then((res) => {
        const user = res.data.find(
          (item) => item.password == form.password && item.email == form.email
        );
        if (user) {
          setForm(initialForm);
          history.push("/main");
        } else {
          history.push("/error");
        }
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Enter your email"
          type="email"
          onChange={handleChange}
          value={form.email}
          invalid={errors.email}
        />
        {errors.email && <FormFeedback>{errorMessages.email}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="Enter your password "
          type="password"
          onChange={handleChange}
          value={form.password}
          invalid={errors.password}
        />
        {errors.password && (
          <FormFeedback>{errorMessages.password}</FormFeedback>
        )}
      </FormGroup>
      <FormGroup check>
        <Input
          id="terms"
          name="terms"
          checked={form.terms}
          type="checkbox"
          onChange={handleChange}
          invalid={errors.terms}
        />{" "}
        <Label htmlFor="terms" check>
          I agree to terms of service and privacy policy
        </Label>
      </FormGroup>
      <FormGroup className="text-center p-4">
        <Button disabled={!isValid} color="primary">
          Sign In
        </Button>
      </FormGroup>
    </Form>
  );
}
