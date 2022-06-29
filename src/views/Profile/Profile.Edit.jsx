import { useState, useContext } from "react";
import styled, { keyframes } from "styled-components";
import { Button } from "../../components/Button";
import { Field } from "../../components/Field";
import { context } from "./Profile.context";
import {
  checkConfirm,
  checkEmail,
  checkPassword,
  checkText,
  checkImage,
} from "../../helpers/validation";

const pop = keyframes`
  from { opacity: 0; transform: scale(0.5)}
  to { opacity: 1; transform: scale(1)}
`;

const Alert = styled.p`
  margin: 1rem 0;
  padding: 1rem 2rem;
  display: inline-block;
  border-radius: 8px;
  background: #fcdd00;
  color: #d00000;
  animation-name: ${pop};
  animation-duration: 0.3s;
`;

const OverLay = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dialog = styled.dialog`
  margin: 1rem;
`;

const Image = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 16px;
`;

const ImageChange = (props) => {
  const { updateImage } = useContext(context);
  const [phase, setPhase] = useState("resting");
  const { onClose, onSave } = props;
  const [value, setValue] = useState(null);
  const [alert, setAlert] = useState(null);

  const handleSave = async () => {
    const imageAlert = checkImage(value);
    if (imageAlert) return setAlert(imageAlert);
    setPhase("updating");
    const response = await updateImage(value);
    if (!response) {
      setPhase("resting");
      return setAlert("Could not save, please try again");
    }
    onSave("image", value);
    onClose();
  };

  const handleUpdate = (event) => setValue(event.target.files[0]);

  return (
    <OverLay>
      <Dialog open>
        {value && <Image src={URL.createObjectURL(value)} alt="" />}

        <input
          disabled={phase !== "resting"}
          type="file"
          onChange={handleUpdate}
        />

        {alert && <Alert>{alert}</Alert>}

        <Button action={onClose}>Cancel</Button>
        <Button action={phase === "resting" && handleSave} importance="primary">
          Save
        </Button>
      </Dialog>
    </OverLay>
  );
};

const EmailChange = (props) => {
  const { updateEmail } = useContext(context);
  const [phase, setPhase] = useState("resting");
  const { starting, onClose, onSave } = props;
  const [value, setValue] = useState(starting);
  const [alert, setAlert] = useState(null);

  const handleSave = async () => {
    const emailAlert = checkEmail(value);
    if (emailAlert) return setAlert(emailAlert);
    setPhase("updating");
    const response = await updateEmail(value);
    if (!response) {
      setPhase("resting");
      return setAlert("Could not save, please try again");
    }
    onSave("email", value);
    onClose();
  };

  return (
    <OverLay>
      <Dialog open>
        <Field
          label="Email"
          onChange={phase === "resting" && setValue}
          value={value}
        />

        {alert && <Alert>{alert}</Alert>}

        <Button action={onClose}>Cancel</Button>
        <Button action={phase === "resting" && handleSave} importance="primary">
          Save
        </Button>
      </Dialog>
    </OverLay>
  );
};

const PasswordChange = (props) => {
  const { updatePassword } = useContext(context);
  const [phase, setPhase] = useState("resting");
  const { onClose, onSave } = props;
  const [value, setValue] = useState("");
  const [confirm, setConfirm] = useState("");
  const [alert, setAlert] = useState(null);

  const handleSave = async () => {
    const passwordAlert = checkPassword(value);
    const confirmAlert = checkConfirm(confirm, value);

    if (passwordAlert) return setAlert(passwordAlert);
    if (confirmAlert) return setAlert(confirmAlert);

    setPhase("updating");
    const response = await updatePassword(value);
    if (!response) {
      setPhase("resting");
      return setAlert("Could not save, please try again");
    }
    onSave("password", value);
    onClose();
  };

  return (
    <OverLay>
      <Dialog open>
        <Field
          label="Password"
          type="password"
          onChange={phase === "resting" && setValue}
          value={value}
        />
        <Field
          label="Confirm Password"
          type="password"
          onChange={phase === "resting" && setConfirm}
          value={confirm}
        />

        {alert && <Alert>{alert}</Alert>}

        <Button action={onClose}>Cancel</Button>
        <Button action={phase === "resting" && handleSave} importance="primary">
          Save
        </Button>
      </Dialog>
    </OverLay>
  );
};

const NameChange = (props) => {
  const { updateName } = useContext(context);
  const [phase, setPhase] = useState("resting");
  const { starting, onClose, onSave } = props;
  const [value, setValue] = useState(starting);
  const [alert, setAlert] = useState(null);

  const handleSave = async () => {
    const textAlert = checkText(value);
    if (textAlert) return setAlert(textAlert);
    setPhase("updating");
    const response = await updateName(value);
    if (!response) {
      setPhase("resting");
      return setAlert("Could not save, please try again");
    }
    onSave("name", value);
    onClose();
  };

  return (
    <OverLay>
      <Dialog open>
        <Field
          label="Name"
          onChange={phase === "resting" && setValue}
          value={value}
        />

        {alert && <Alert>{alert}</Alert>}

        <Button action={onClose}>Cancel</Button>
        <Button action={phase === "resting" && handleSave} importance="primary">
          Save
        </Button>
      </Dialog>
    </OverLay>
  );
};

export const Edit = (props) => {
  const { onClose, edit, onChange, data } = props;

  if (edit === "password")
    return <PasswordChange onClose={onClose} onSave={onChange} />;

  if (edit === "image")
    return <ImageChange onClose={onClose} onSave={onChange} />;

  if (edit === "email")
    return (
      <EmailChange starting={data.email} onClose={onClose} onSave={onChange} />
    );

  if (edit === "name")
    return (
      <NameChange starting={data.name} onClose={onClose} onSave={onChange} />
    );

  return null;
};
