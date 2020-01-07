
export const BASE_URL = '//127.0.0.1:8082';

export const BASE_THUMB_URL = `${BASE_URL}/assets/style/deeplearn`;

export const CDN_URL = '//dev.g.alicdn.com/youku_operation_fe/sucai-center-fe/0.0.0';

export const BASE_CKPTS_URL = `${BASE_URL}/ckpts`;


export const TF_MODEL_BASE_URL = `${BASE_URL}/tf_models`;


export const TF_MODELS = Object.freeze({
  mobileStyleNet: {
    name: 'mobileStyleNet',
    title: '[Fast] Distilled MobileNet style model (9.6MB)',
    modelUrl: `${TF_MODEL_BASE_URL}/model_style_js/model.json`,
  },
  inceptionStyleNet: {
    name: 'inceptionStyleNet',
    title: '[High quality] Original Inceptionv3 style model (36.3MB)',
    modelUrl: `${TF_MODEL_BASE_URL}/model_style_inception_js/model.json`,
  },
  originalTransformNet: {
    name: 'originalTransformNet',
    title: '[High quality] Original transformer model (7.9MB)',
    modelUrl: `${TF_MODEL_BASE_URL}/model_transformer_js/model.json`,
  },
  separableTransformNet: {
    name: 'separableTransformNet',
    title: '[Fast] Separable_conv2d transformer (2.4MB)',
    modelUrl: `${TF_MODEL_BASE_URL}/model_transformer_separable_js/model.json`,
  }
});






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



