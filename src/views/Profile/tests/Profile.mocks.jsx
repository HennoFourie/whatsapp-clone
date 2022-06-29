import { Provider } from "../Profile.context";
import { MemoryRouter } from "react-router-dom";

export const createAsyncMock = (response) => () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(response);
    }, 3000);
  });

export const createMockApi = () => {
  return {
    updateImage: createAsyncMock(true),
    updatePassword: createAsyncMock(true),
    updateEmail: createAsyncMock(true),
    updateName: createAsyncMock(true),

    logOut: () => createAsyncMock(true),
    getData: createAsyncMock({
      name: "Henno Fourie",
      image: "https://picsum.photos/200",
      email: "fourie.henno@gmail.com",
    }),
  };
};

export const MockContainer = (props) => {
  const { children, path = "/", overrides = {} } = props;

  const value = {
    ...createMockApi(),
    ...overrides,
  };

  return (
    <MemoryRouter initialEntries={[path]}>
      <Provider value={value}>{children}</Provider>
    </MemoryRouter>
  );
};

export default MockContainer;
