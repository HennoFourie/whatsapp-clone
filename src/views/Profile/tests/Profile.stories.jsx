import { Profile } from "../Profile";
import { MockContainer, createAsyncMock } from "./Profile.mocks";

export default {
  title: "views/Profile",
};

export const Basic = () => (
  <MockContainer>
    <Profile />
  </MockContainer>
);

export const NoProfile = () => (
  <MockContainer overrides={{ getData: createAsyncMock(null) }}>
    <Profile />
  </MockContainer>
);

export const FailName = () => (
  <MockContainer overrides={{ updateName: createAsyncMock(false) }}>
    <Profile />
  </MockContainer>
);
