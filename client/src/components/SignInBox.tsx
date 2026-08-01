import { Link, useNavigate } from "react-router-dom";
import { emailIcon, googleIcon } from "../assets/icons";
import { BrandIconOnly } from "./BrandLogo";

type SignInBoxType = {
  message?: string;
  typeOfLogin: string;
};

const SIGNIN_OPTIONS = [
  {
    id: 1,
    title: "with Google",
    handler: "Google",
    image: googleIcon,
  },
  {
    id: 2,
    title: "with email",
    handler: "mail",
    image: emailIcon,
  },
];

import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { url } from '../baseUrl';
import { useAuth } from '../contexts/Auth';
import useLocalStorage from '../hooks/useLocalStorage';
import { useAuthModal } from '../contexts/AuthModalContext';

export default function SignInBox({ message, typeOfLogin }: SignInBoxType) {
  const navigate = useNavigate();
  const { handleUser } = useAuth();
  const { openModal } = useAuthModal();
  const [, setRefreshToken] = useLocalStorage<string | undefined>("refresh_token", undefined);
  const [, setAccessToken] = useLocalStorage<string | undefined>("access_token", undefined);
  const [, setUser] = useLocalStorage<any>("user", undefined);

  const handleGoogleAuth = async (credentialResponse: any) => {
    try {
      const res = await axios.post(`${url}/auth/google/direct`, {
        credential: credentialResponse.credential
      });
      
      if (res.data.access_token) {
        setAccessToken(res.data.access_token);
        setRefreshToken(res.data.refresh_token);
        setUser(res.data);
        handleUser(res.data);
        
        const isAdminUser = res.data.role === "admin" || res.data.role === "Admin" || res.data.role === "Super Admin";
        const defaultRedirect = isAdminUser ? '/admin/dashboard' : '/roadmaps';
        const redirectPath = localStorage.getItem("redirect_after_login") || defaultRedirect;
        localStorage.removeItem("redirect_after_login");
        navigate(redirectPath);
      }
    } catch (error) {
      console.error("Google authentication failed", error);
    }
  };

  function handleEmailLogin() {
    if (typeOfLogin === "Sign in") {
      openModal("login");
    } else {
      openModal("signup");
    }
  }

  return (
    <div className="w-[95%] sm:w-full max-w-[420px] mx-auto flex flex-col items-center gap-4 py-12 md:py-16 bg-white rounded-2xl px-6" style={{
        boxShadow: "0px 4px 24px rgba(0,0,0,0.06)"
    }}>
      <BrandIconOnly className="mb-2 h-12 md:h-14" />
      <p className="font-serif text-2xl md:text-[28px] mb-8 text-center">
        {message}
      </p>
      {SIGNIN_OPTIONS.map((item) => {
        if (item.handler === "Google") {
          return (
            <div key={item.id} className="w-full flex justify-center mb-1">
              <GoogleLogin
                onSuccess={handleGoogleAuth}
                onError={() => {
                  console.error("Google Login Failed");
                }}
                useOneTap
                theme="outline"
                size="large"
                width="280"
                text="continue_with"
              />
            </div>
          );
        }
        return (
          <ButtonLoginWith
            image={item.image}
            key={item.id}
            onClick={handleEmailLogin}
            text={typeOfLogin + " " + item.title}
          />
        );
      })}
      {typeOfLogin === "Sign in" ? (
        <p style={{ marginTop: "22px", color: "#5c5c5c" }}>
          No account?{" "}
          <Link
            style={{
              color: "#1a8917",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "14px",
            }}
            to="/signin/new"
          >
            Create one
          </Link>
        </p>
      ) : (
        <p style={{ marginTop: "22px", color: "#5c5c5c" }}>
          Already have an account?{" "}
          <Link
            style={{
              color: "#1a8917",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "14px",
            }}
            to="/signin/in"
          >
            Sign in
          </Link>
        </p>
      )}

      <p
        style={{
          fontSize: "13px",
          color: "gray",
          width: "78%",
          textAlign: "center",
          lineHeight: "22px",
          marginTop: "22px",
        }}
      >
        Click “{typeOfLogin}” to agree to NowScripts's Terms of Service and
        acknowledge that NowScripts's Privacy Policy applies to you.
      </p>
    </div>
  );
}

function ButtonLoginWith({
  image,
  onClick,
  text,
}: {
  onClick(): void;
  text: string;
  image: any;
}) {
  return (
    <button
      className="w-full sm:max-w-[300px] bg-transparent flex flex-row items-center justify-center p-3 rounded-2xl border border-slate-300 hover:bg-slate-50 transition-colors gap-3 cursor-pointer text-slate-700 font-medium"
      onClick={() => {
        onClick();
      }}
    >
      {image}
      {text}
    </button>
  );
}
