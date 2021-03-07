import { React } from 'react';
import Page from '../../components/Page';
import FormComponent from '../../components/UserComps/Form';

export default function CreateUser({ history }) {
  return (
    <Page title="New user">
      <FormComponent history={history} endpoint="/users" />
    </Page>
  );
}
