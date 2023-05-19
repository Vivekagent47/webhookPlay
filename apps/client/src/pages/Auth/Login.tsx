import React, { useEffect } from "react";
import Google from "../../assets/Google";
import Github from "../../assets/Github";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import { AuthContext, IAuthContext } from "../../contexts/AuthContext";

const Login = () => {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  };
  const { signIn, isLoggedIn } = React.useContext<IAuthContext>(AuthContext);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      signIn(user);
    } catch (err: any) {
      console.error(err);
      alert(err?.message);
    }
  };

  const signInWithGithub = async () => {
    try {
      const res = await signInWithPopup(auth, githubProvider);
      const user = res.user;
      signIn(user);
    } catch (err: any) {
      console.error(err);
      alert(err?.message);
    }
  };

  useEffect(() => {
    const path = `${pathname}`.split("/")[1];
    if (isLoggedIn && path !== "login") {
      navigate(-1);
    } else if (isLoggedIn && path === "login") {
      navigate("/");
    }
  }, [isLoggedIn, navigate, pathname]);

  return (
    <div className="flex">
      <div
        className="w-1/2 h-screen"
        style={{
          background: "linear-gradient(121.68deg, #76AAF9 2.46%, #394DFD 100%)",
        }}
      >
        <div
          className="flex justify-end ml-[60px] mt-[100px] w-full rounded-s-lg"
          style={{
            height: "calc(100vh - 100px)",
            width: "calc(50vw - 60px)",
            background:
              "linear-gradient(96.58deg, rgba(239, 239, 239, 0.6) 0%, rgba(239, 239, 239, 0.1) 105.5%)",
            backdropFilter: "blur(25px)",
          }}
        >
          <p className="text-bw-50 text-6xl leading-[64px] w-4/5 mt-28 ml-32">
            Give a chance to detect your code errors faster
          </p>
        </div>
      </div>
      <div className="w-1/2 flex justify-end flex-col">
        <div
          className="bg-bw-50 mt-20 mb-0 mx-24 rounded-xl"
          style={{
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.04)",
            height: "calc(100vh - 10rem)",
          }}
        >
          <div className="mx-20 mt-32">
            <p className="text-4xl font-bold text-bw-1100 mb-3">Sign in</p>
            <div className="flex items-center">
              <p className="text-base font-semibold text-bw-400 mb-3">
                New to dStream?
              </p>
              <Link to="/signup">
                <p className="text-base font-semibold text-primary-button mb-3 ml-1">
                  Sign up for free
                </p>
              </Link>
            </div>
            <button
              className="w-full rounded-md text-bw-900 mt-24 flex items-center mx-auto py-3 justify-center"
              style={{
                boxShadow:
                  "0px 0px 1px rgba(0, 0, 0, 0.2), 0px 1px 2px rgba(0, 0, 0, 0.08)",
              }}
              onClick={signInWithGoogle}
            >
              <Google />
              <span className="ml-2">Log in with Google</span>
            </button>
            <div className="mt-8 flex items-center justify-center">
              <div className="h-px w-20 bg-bw-200 mr-2" />
              <p className="text-base font-semibold text-bw-400 mr-2">OR</p>
              <div className="h-px w-20 bg-bw-200" />
            </div>
            <button
              className="w-full rounded-md bg-bw-1000 text-bw-50 mt-8 flex items-center mx-auto py-3 justify-center"
              style={{
                boxShadow:
                  "0px 0px 1px rgba(0, 0, 0, 0.2), 0px 1px 2px rgba(0, 0, 0, 0.08)",
              }}
              onClick={signInWithGithub}
            >
              <Github />
              <span className="ml-2">Log in with Github</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
