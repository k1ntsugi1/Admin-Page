import * as Yup from 'yup';

const scheme = (name: string) => Yup.string().test({
  name: 'emptyField',
  message: 'have to contain string',
  test: (value, testContext) => {
    const nameOfItem = testContext.parent[name] ?? null;
    return !(nameOfItem === null || nameOfItem.trim() === '');
  }
})

export const validationSchema = Yup.object().shape({
  title: scheme('title'),
  body: scheme('body'),
});