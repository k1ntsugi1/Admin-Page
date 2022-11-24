import axios from 'axios';

export interface IResponseData {
  data: {
    url: string;
  };
}

export const fetchGetImageUrl = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  const url = new URL('/1/upload', 'https://api.imgbb.com');
  url.searchParams.set('key', '55613fc8c4bcab8867f472a0998328e1');

  const { data: response } = await axios<IResponseData>({
    method: 'post',
    url: url.toString(),
    data: formData
  });
  return response.data.url;
};
