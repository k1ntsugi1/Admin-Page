import React from 'react';
import { Form } from 'react-bootstrap';

interface IProps {
  searchParams: {
    searchString: string;
    setSearchString: (string: string) => void;
  };
}

export const SearchByTitleElement: React.FC<IProps> = ({searchParams}) => {
  const { searchString, setSearchString } = searchParams;

  const setSearchStringHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchString(value.trim());
  };

  return (
    <Form.Control
      className="my-4"
      type="text"
      name="posts by title"
      value={searchString}
      onChange={setSearchStringHandler}
      aria-label="search by post title"
      placeholder="Поиск по заголовку"
    />
  );
};
