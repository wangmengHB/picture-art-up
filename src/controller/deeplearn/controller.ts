import {
  Array3D, GPGPUContext, gpgpu_util, render_ndarray_gpu_util, 
  NDArrayMathGPU
} from 'deeplearn';
import { objects, decorators } from 'util-kit';
import {TransformNet} from './net';
import * as tf from '@tensorflow/tfjs';
tf.ENV.set('WEBGL_PACK', false);  
// This needs to be done otherwise things run very slow v1.0.4





export default class Controller {

  // DeeplearnJS stuff
  private math: NDArrayMathGPU;
  private gpgpu: GPGPUContext;
  private gl: WebGLRenderingContext;
  private transformNet: TransformNet;


  private canvas: HTMLCanvasElement;

  // current image
  public contentImgElement: HTMLImageElement;
  public contentImgBase64: string;
  // current style
  public currentStyle: any;

  public loading = false;
  public loadingTxt = 'Please Wait...';

  
  constructor(private cmp) {
    this.canvas = document.createElement('canvas');
    this.gl = gpgpu_util.createWebGLContext(this.canvas);
    this.gpgpu = new GPGPUContext(this.gl);
    this.math = new NDArrayMathGPU(this.gpgpu);
    this.transformNet = new TransformNet(this.math, '');

    (window as any)._ctrl = this;
  }

  setSourceImage({ base64}) {
    this.contentImgElement = new Image();
    this.contentImgElement.src = base64;
    this.contentImgBase64 = base64;
    this.cmp.forceUpdate();
  }



  @async()
  async start() {
    if (!this.currentStyle) {
      return;
    }
    this.transformNet.setStyle(this.currentStyle);
    
    await this.transformNet.load();
    await this.runInference();
  }

  async runInference() {
    await this.math.scope(async (keep, track) => {
      const preprocessed = track(Array3D.fromPixels(this.contentImgElement));
      const inferenceResult = await this.transformNet.predict(preprocessed);
      this.setCanvasShape(inferenceResult.shape);
      const renderShader = render_ndarray_gpu_util.getRenderRGBShader(
        this.gpgpu,
        inferenceResult.shape[1]
      );
      render_ndarray_gpu_util.renderToCanvas(
        this.gpgpu,
        renderShader,
        inferenceResult.getTexture()
      );
    });

  }

  private setCanvasShape(shape: number[]) {
    this.canvas.width = shape[1];
    this.canvas.height = shape[0];
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
