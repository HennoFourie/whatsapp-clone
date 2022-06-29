import { Button } from "./Button";
import { MemoryRouter } from 'react-router-dom'

export default {
  title: "components/Button",
};

export const Primary = () => (
    <MemoryRouter>
        <Button importance="primary">Click me!</Button>
        <Button importance="primary" action="https://google.com">Click me!</Button>
        <Button importance="primary" action={() => console.log("Clicked")}>Click me!</Button>
    </MemoryRouter>
);

export const Secondary = () => (
    <MemoryRouter>
        <Button importance="secondary">Click me!</Button>
        <Button importance="secondary" action="https://google.com">Click me!</Button>
        <Button importance="secondary" action={() => console.log("Clicked")}>Click me!</Button>
    </MemoryRouter>
);

