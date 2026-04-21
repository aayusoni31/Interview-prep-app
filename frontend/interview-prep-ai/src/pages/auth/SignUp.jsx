import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";
const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";
    if (!fullName) {
      setError("Please enter full name.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter password.");
      return;
    }

    // basic validation (optional)
    // if (!fullName || !email || !password) {
    //   setError("All fields are required");
    //   return;
    // }
    setError("");
    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
      });
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
    // console.log(fullName, email, password);
  };

  return (
    <div className="w-[90vw] md:w-[400px] flex flex-col justify-center">
      {/* Heading */}
      <h3 className="text-xl font-semibold text-black">Create an Account</h3>

      <p className="text-xs text-gray-600 mt-1 mb-6">
        Join today by entering your details below
      </p>

      {/* Form */}
      <form onSubmit={handleSignUp}>
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
        <Input
          value={fullName}
          onChange={({ target }) => setFullName(target.value)}
          label="Full Name"
          placeholder="Alice Johnson"
          type="text"
        />

        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email"
          placeholder="alice@example.com"
          type="text"
        />

        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="••••••••"
          type="password"
        />

        {/* Error */}
        {error && <p className="text-red-500 text-xs mb-3">{error}</p>}

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2.5 rounded-md font-medium hover:bg-orange-500 transition-all duration-300"
        >
          SIGN UP
        </button>

        {/* Switch to Login */}
        <p className="text-[13px] text-gray-700 mt-4 text-center">
          Already have an account?{" "}
          <button
            type="button"
            className="font-medium text-red-600 hover:underline cursor-pointer"
            onClick={() => setCurrentPage("login")}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
