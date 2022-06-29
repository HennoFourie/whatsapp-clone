import { Provider } from "./Profile.context";
import { supabase } from "../../helpers/supabase";

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

    logOut: async () => {
      await supabase.auth.signOut();
    },

    getData: createAsyncMock({
      name: "Henno Fourie",
      image: "https://picsum.photos/200",
      email: "fourie.henno@gmail.com",
    }),
  };
};

export const Container = (props) => {
  const { children } = props;
  return <Provider value={createMockApi()}>{children}</Provider>;
};

export default Container;
