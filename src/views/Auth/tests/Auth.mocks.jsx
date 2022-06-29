import { Provider } from "../Auth.context";
import { MemoryRouter } from "react-router-dom";

export const createAsyncMock = (response) => () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(response);
    }, 3000);
  });

export const createMockApi = () => {
  return {
    signUp: createAsyncMock({
      alert: null,
      user: {
        name: "Henno Fourie",
        token: "fasuiou08rewnlsufsdafasjkl",
      },
    }),
    signIn: createAsyncMock({
      alert: null,
      user: {
        name: "Henno Fourie",
        token: "fasuiou08rewnlsufsdafasjkl",
      },
    }),

    resetPassword: createAsyncMock({
      alert: null,
      user: {
        name: "Henno Fourie",
        token: "fasuiou08rewnlsufsdafasjkl",
      },
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
