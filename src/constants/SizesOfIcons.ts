type TSizeOfIcon = {
  [index: string]: string;

  width: string;
  height: string;
};

interface ISizesOfIcons {
  [index: string]: TSizeOfIcon;

  xs: TSizeOfIcon;
  s: TSizeOfIcon;
  m: TSizeOfIcon;
  l: TSizeOfIcon;
}

export const SizesOfIcons: ISizesOfIcons = {
  xs: {
    width: '20',
    height: '20'
  },
  s: {
    width: '25',
    height: '25'
  },
  m: {
    width: '35',
    height: '35'
  },
  l: {
    width: '45',
    height: '45'
  }
};
