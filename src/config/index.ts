
export const BASE_URL = '//127.0.0.1:8082';

export const BASE_THUMB_URL = `${BASE_URL}/assets/style/deeplearn`;

export const BASE_CKPTS_URL = `${BASE_URL}/ckpts`;



export const DEFAULT_STYLES = Object.freeze({
  'udnie': {
    title: 'Udnie, Francis Picabia',
    ckptsUrl: `${BASE_CKPTS_URL}/udnie/`,
    thumbnail: `${BASE_THUMB_URL}/udnie.jpg`,
  },
  'scream': {
    title: 'The Scream, Edvard Munch',
    ckptsUrl: `${BASE_CKPTS_URL}/scream/`,
    thumbnail: `${BASE_THUMB_URL}/scream.jpg`,
  },
  'la_muse': {
    title: 'La Muse, Pablo Picasso',
    ckptsUrl: `${BASE_CKPTS_URL}/la_muse/`,
    thumbnail: `${BASE_THUMB_URL}/la_muse.jpg`,
  },
  'rain_princess': {
    title: 'Rain Princess, Leonid Afremov',
    ckptsUrl: `${BASE_CKPTS_URL}/rain_princess/`,
    thumbnail: `${BASE_THUMB_URL}/rain_princess.jpg`,
  },
  'wave': {
    title: 'The Wave, Katsushika Hokusai',
    ckptsUrl: `${BASE_CKPTS_URL}/wave/`,
    thumbnail: `${BASE_THUMB_URL}/wave.jpg`,
  },
  'wreck': {
    title: 'The Wreck of the Minotaur, J.M.W. Turner',
    ckptsUrl: `${BASE_CKPTS_URL}/wreck/`,
    thumbnail: `${BASE_THUMB_URL}/wreck.jpg`,
  }
});


export const DEFAULT_STYLES_OPTIONS = Object.keys(DEFAULT_STYLES).map(key => ({
  name: DEFAULT_STYLES[key].title,
  value: key,
  thumbnail: DEFAULT_STYLES[key].thumbnail,
}));



