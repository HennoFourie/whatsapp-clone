import { Provider } from "./Auth.context";
import { supabase } from "../../helpers/supabase";

export const createApi = () => {
  return {
    signUp: async (props) => {
      try {
        const { email, password } = props;
        const response = await supabase.auth.signUp({ email, password });

        if (response.error) {
          return {
            user: null,
            alert: response.error.message,
          };
        }

        return {
          user: response.user,
          alert: null,
        };
      } catch (error) {
        console.error(error);

        return {
          user: null,
          alert:
            "Something went wrong. Please try again, if the issue persists please contact support.",
        };
      }
    },
    signIn: async (props) => {
      try {
        const { email, password } = props;
        const response = await supabase.auth.signIn({ email, password });

        if (response.error) {
          return {
            user: null,
            alert: response.error.message,
          };
        }

        return {
          user: response.user,
          alert: null,
        };
      } catch (error) {
        console.error(error);

        return {
          user: null,
          alert:
            "Something went wrong. Please try again, if the issue persists please contact support.",
        };
      }
    },
    resetPassword: () => Promise.resolve(),
  };
};

export const Container = (props) => {
  const { children } = props;
  return <Provider value={createApi()}>{children}</Provider>;
};

export default Container;
