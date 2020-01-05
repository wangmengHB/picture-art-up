import { objects, decorators } from 'util-kit';
import * as tf from '@tensorflow/tfjs';
import { TF_MODELS } from '../config';


tf.ENV.set('WEBGL_PACK', false);  
// This needs to be done otherwise things run very slow v1.0.4





export default class Controller {

  // cache
  private mobileStyleNet: tf.GraphModel;
  private inceptionStyleNet: tf.GraphModel;
  private originalTransformNet: tf.GraphModel;
  private separableTransformNet: tf.GraphModel;


  // current used model
  private styleNet: tf.GraphModel;
  private transformNet: tf.GraphModel;


  // current selecte model name
  public styleNetName: string = Object.keys(TF_MODELS)[0];
  public transformNetName: string = Object.keys(TF_MODELS)[3];


  private canvas: HTMLCanvasElement;

  // current image
  public contentImg: HTMLImageElement;
  public contentImgBase64: string;
  // current style image
  public styleImg: HTMLImageElement;
  public styleImageBase64: string;

  // 
  public styleRatio: number = 1.0;

  public currentStyle: any;

  public loading = false;
  public loadingTxt = 'Please Wait...';

  
  constructor(private cmp) {
    this.canvas = document.createElement('canvas');
    
    this.loading = true;
    Promise.all([
      this.loadModel(this.styleNetName),
      this.loadModel(this.transformNetName)
    ]).then(([styleNet, transformNet]) => {
      this.styleNet = styleNet;
      this.transformNet = transformNet;
      this.loading = false;
      this.cmp.forceUpdate();
    });

  }


  async loadModel(name: string) {
    const names = Object.keys(TF_MODELS);
    if (names.indexOf(name) === -1) {
      throw new Error('unknow model name, critical error!');
    }
    if (!this[name]) {
      this[name] = await tf.loadGraphModel(TF_MODELS[name].modelUrl);
    }
    return this[name];
  }



  setSourceImage({ base64}) {
    this.contentImg = new Image();
    this.contentImg.src = base64;
    this.contentImgBase64 = base64;
    this.cmp.forceUpdate();
  }


  setStyleImage({ base64}) {
    this.styleImg = new Image();
    this.styleImg.src = base64;
    this.styleImageBase64 = base64;
    this.cmp.forceUpdate();
  }


  @async()
  async start() {
    await tf.nextFrame();
    console.log('Generating 100D style representation');
    await tf.nextFrame();
    let bottleneck = await tf.tidy(() => {
      return this.styleNet.predict(tf.browser.fromPixels(this.styleImg).toFloat().div(tf.scalar(255)).expandDims());
    }) as any;
    if (this.styleRatio !== 1.0) {
      console.log('Generating 100D identity style representation');
      await tf.nextFrame();
      const identityBottleneck = await tf.tidy(() => {
        return this.styleNet.predict(tf.browser.fromPixels(this.contentImg).toFloat().div(tf.scalar(255)).expandDims());
      }) as any;
      const styleBottleneck = bottleneck;
      bottleneck = await tf.tidy(() => {
        const styleBottleneckScaled = styleBottleneck.mul(tf.scalar(this.styleRatio));
        const identityBottleneckScaled = identityBottleneck.mul(tf.scalar(1.0-this.styleRatio));
        return styleBottleneckScaled.addStrict(identityBottleneckScaled)
      })
      styleBottleneck.dispose();
      identityBottleneck.dispose();
    }
    console.log('Stylizing image...');
    await tf.nextFrame();
    const stylized = await tf.tidy(() => {
      return (this.transformNet.predict(
        [
          tf.browser.fromPixels(this.contentImg).toFloat().div(tf.scalar(255)).expandDims(), 
          bottleneck
        ]
      ) as any).squeeze();
    })
    await tf.browser.toPixels(stylized, this.canvas);
    bottleneck.dispose();  // Might wanna keep this around
    stylized.dispose();
  }


  
}







function async(txt: string = '处理中...') {
  return decorators.createDecorator((fn, key) => {
		return function (this: any, ...args: any[]) {
      
      const p = fn.apply(this, args);

      if (p && typeof p.then === 'function') {
        this.loading = true;
        this.loadingTxt = txt;
        this.cmp.forceUpdate();
        Promise.resolve(p).finally(() => {
          this.loading = false;
          this.cmp.forceUpdate();
        });
      }
      return p;

		};
	});
}
