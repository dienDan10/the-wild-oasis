import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // load the authentication user (user can be null)
  const { isLoading, isAuthenticated, error } = useUser();
  // if there is no authenticated user, redirect to login page

  if (error) {
    navigate("/login");
  }

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  // show spinner while loading
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // render the app

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
