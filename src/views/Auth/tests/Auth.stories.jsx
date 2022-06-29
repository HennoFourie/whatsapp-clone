import { Auth } from "../Auth";
import { MockContainer, createAsyncMock } from "./Auth.mocks";

export default {
  title: "views/Auth",
};

export const Basic = () => (
  <MockContainer path="/">
    <Auth />
  </MockContainer>
);

export const Login = () => (
  <MockContainer path="/login">
    <Auth />
  </MockContainer>
);
export const LoginInvalid = () => (
  <MockContainer
    path="/login"
    overrides={{
      signIn: createAsyncMock({
        user: null,
        alert:
          "Invalid details, please confirm that you are using the correct email and password.",
      }),
    }}
  >
    <Auth />
  </MockContainer>
);
export const LoginTechnicalError = () => (
  <MockContainer
    path="/login"
    overrides={{
      signIn: createAsyncMock({
        user: null,
        alert:
          "Something went wrong. Please try again, if the issue persists please contact support.",
      }),
    }}
  >
    <Auth />
  </MockContainer>
);

export const Create = () => (
  <MockContainer path="/create">
    <Auth />
  </MockContainer>
);

export const Email = () => (
  <MockContainer path="/email">
    <Auth />
  </MockContainer>
);

export const Reset = () => (
  <MockContainer path="/reset">
    <Auth />
  </MockContainer>
);
