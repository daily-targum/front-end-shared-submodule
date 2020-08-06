import queryString from 'query-string';

type ImgixOptions = {
  ar?: string
  width?: string
  crop?: 'faces,center'
  fm?: 'webp'
}

const imgixDefaultOptions: ImgixOptions = {
  fm: 'webp'
};

const presets = {
  square: {
    small: {
      ...imgixDefaultOptions,
      ar: '1:1',
      width: '250',
      crop: 'faces,center',
    }
  },
  fourByThree: {
    medium: {
      ...imgixDefaultOptions,
      ar: '4:3',
      width: '500',
      crop: 'faces,center',
    },
    large: {
      ...imgixDefaultOptions,
      ar: '4:3',
      width: '700',
      crop: 'faces,center',
    }
  }
} as const;
imgix.presets = presets;

export function imgix(src: string, {
  ar,
  width,
  crop,
  fm
}: ImgixOptions) {

  const query = queryString.stringify({
    ar,
    crop,
    fm,
    width
  }, {
    encode: false
  });

  return `${src}?${query}`;
}