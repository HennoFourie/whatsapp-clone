import React from "react";
import { useContext, useState, useEffect, useCallback } from "react";
import { Button } from "../../components/Button";
import { Shell } from "../../components/Shell";
import { Loader } from "../../components/Loader";
import { Edit } from "./Profile.Edit";
import { useNavigate } from "react-router-dom";
import context from "./Profile.context.js";
import styled from "styled-components";

const Image = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 16px;
`;

export const Profile = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState("loading");
  const { getData, logOut } = useContext(context);

  const [edit, setEdit] = useState(null);
  const [data, setData] = useState(null);

  const handleChange = () => {
    setPhase("loading");

    getData().then((response) => {
      if (!response) return handleLogout();

      setData(response);
      setPhase("resting");
    });
  };

  const handleLogout = useCallback(() => {
    setPhase("logging-out");
    logOut();
    navigate.apply("/", { replace: true });
  }, [logOut, navigate]);

  useEffect(() => {
    getData().then((response) => {
      if (!response) return handleLogout();

      setData(response);
      setPhase("resting");
    });
  }, [getData, logOut, handleLogout]);

  if (phase === "loading") return <Loader value="Loading..."></Loader>;

  if (phase === "logging-out") return <Loader value="Logging out..."></Loader>;

  if (phase === "resting") {
    return (
      <Shell>
        <Edit
          edit={edit}
          onChange={handleChange}
          onClose={() => setEdit(null)}
          data={data}
        />
        <div>
          <Image src={data.image} alt="" />
        </div>
        <Button action={() => setEdit("image")}>Change Image</Button>

        <div>Name: {data.name}</div>
        <Button action={() => setEdit("name")}>Edit Name</Button>

        <div>Email: {data.email}</div>
        <Button action={() => setEdit("email")}>Change Email</Button>

        <div>Password: **********</div>
        <Button action={() => setEdit("password")}>Change Password </Button>

        <Button action={handleLogout} importance="primary">
          Log Out
        </Button>
      </Shell>
    );
  }

  throw new Error("Invalid phase");
};

export default Profile;
