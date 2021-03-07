import { React } from 'react';
import Page from '../Page';
import FormComponent from './Form';

export default function CreateUser({ history }) {
  return (
    <Page title="New user">
      <FormComponent history={history} endpoint="/users" />
    </Page>
  );
}
