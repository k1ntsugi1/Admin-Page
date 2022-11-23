import * as Yup from 'yup';

const schema = (name: string) => Yup.string().test({
  name: 'emptyField',
  message: 'have to contain string',
  test: (value, testContext) => {
    const nameOfItem = testContext.parent[name] ?? null;
    return !(nameOfItem === null || nameOfItem.trim() === '');
  }
})

export const validationSchemaPostForm = Yup.object().shape({
  title: schema('title'),
  body: schema('body'),
});

export const validationSchemaCommentForm = Yup.object().shape({
  name: schema('name'),
  email: schema('email'),
  body: schema('body'),
});