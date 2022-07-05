import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  Box,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import axios from "axios";

/////////////////////////////////////////////////////////////
let easing = [0.6, -0.05, 0.01, 0.99];
const animate = {
  opacity: 1,
  y: 0,
  transition: {
    duration: 0.6,
    ease: easing,
    delay: 0.16,
  },
};

const SignupForm = ({ setAuth }) => {
  const [id, setId] = useState("");

  const [firstname, setFirstName] = useState("");

  const [lastname, setLastname] = useState("");

  const [email, setEmail] = useState("");

  const [dateofbirth, setDateofbirth] = useState("");
  const [mobile, setMobile] = useState("");
  const [Status, setStatus] = useState("");
  const [accounttype, setAccounttype] = useState("");

  const createUser = (e) => {
    axios
      .post(`http://localhost:4000/UserManagement/register`, {
        id: id,
        firstname: firstname,
        lastname: lastname,
        email: email,
        dateofbirth: dateofbirth,
        mobile: mobile,
        Status: Status,
        accounttype: accounttype,
      })
      .then((res) => {
        console.log(res);
        alert("Successfully Registered");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("First name required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Last name required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      dateofbirth: "",
      mobile: "",
      status: "",
      // password: "",
      accountType: "",
    },
    validationSchema: SignupSchema,
    onSubmit: () => {
      setTimeout(() => {
        setAuth(true);
        navigate("/", { replace: true });
      }, 2000);
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack
            component={motion.div}
            initial={{ opacity: 0, y: 60 }}
            animate={animate}
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
          >
            <TextField
              fullWidth
              label="Id"
              {...getFieldProps("Id")}
              // error={Boolean(touched.firstName && errors.firstName)}
              // helperText={touched.firstName && errors.firstName}
              onChange={(e) => setId(e.target.value)}
            />
            <TextField
              fullWidth
              label="First name"
              // {...getFieldProps("firstName")}
              onChange={(e) => setFirstName(e.target.value)}
              // error={Boolean(touched.firstName && errors.firstName)}
              // helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              // {...getFieldProps("lastName")}
              onChange={(e) => setLastname(e.target.value)}
              // error={Boolean(touched.lastName && errors.lastName)}
              // helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <Stack
            spacing={3}
            component={motion.div}
            initial={{ opacity: 0, y: 40 }}
            animate={animate}
          >
            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email address"
              // {...getFieldProps("email")}
              onChange={(e) => setEmail(e.target.value)}
              // error={Boolean(touched.email && errors.email)}
              // helperText={touched.email && errors.email}
            />
            <TextField
              fullWidth
              label="Date of Birth"
              {...getFieldProps("Date oF Birth")}
              onChange={(e) => setDateofbirth(e.target.value)}
              // error={Boolean(touched.lastName && errors.lastName)}
              // helperText={touched.lastName && errors.lastName}
            />
            <TextField
              fullWidth
              label="Mobile"
              {...getFieldProps("Mobile")}
              onChange={(e) => setMobile(e.target.value)}
              // error={Boolean(touched.lastName && errors.lastName)}
              // helperText={touched.lastName && errors.lastName}
            />
            <TextField
              fullWidth
              label="Status"
              {...getFieldProps("Status")}
              onChange={(e) => setStatus(e.target.value)}
              // error={Boolean(touched.lastName && errors.lastName)}
              // helperText={touched.lastName && errors.lastName}
            />

            {/* <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              label="Password"
              {...getFieldProps("password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      <Icon
                        icon={
                          showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            /> */}

            <TextField
              fullWidth
              label="Account Type"
              onChange={(e) => setAccounttype(e.target.value)}

              // error={Boolean(touched.lastName && errors.lastName)}
              // helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={animate}
          >
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              onClick={(e) => createUser(e)}
            >
              Sign up
            </LoadingButton>
          </Box>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default SignupForm;
