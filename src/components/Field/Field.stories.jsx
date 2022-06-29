import { Field } from './Field'

export default {
    title: 'components/Field'
}

export const Empty = () => <Field label="Hello" value="" onChange={console.log} />

export const Filled = () => <Field label="Hello" value="World" onChange={console.log} />

export const Disabled = () => <Field label="Hello" value="World" />

export const Password = () => <Field label="Hello" type="password" value="World" />

export const Email = () => <Field label="Hello" type="email" value="World" />