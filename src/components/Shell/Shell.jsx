import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;500;900&display=swap');

  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }
`;

export const Shell = (props) => {
  const { children } = props;

  return (
    <>
      <Global />
      {children}
    </>
  );
};

export default Shell;
