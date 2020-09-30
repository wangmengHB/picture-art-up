import React from 'react';
import styles from './index.module.less';
import { Button, Select } from 'antd';
import { CommonProps } from '../../interface';
import classnames from 'classnames';


const MAX_LEN = 800;


export interface InputImageProps extends CommonProps {
  controller: any;

}



export default class InputImage extends React.Component<InputImageProps>{

  loadLocalImage = e => {
    const { controller } = this.props;
    const reader = new FileReader();
    const filename = e.target.files[0].name;
    reader.onload = (e: any) => {
      const base64: any = e.target.result;
      const img = new Image();

      img.onload = () => {

        let ratio = img.width / img.height;
        let width = img.width, height = img.height;

        if (ratio > 1) {
          if (width > MAX_LEN) {
            width = MAX_LEN;
            height = MAX_LEN / ratio;
          }
        } else {
          if (height > MAX_LEN) {
            height = MAX_LEN;
            width = MAX_LEN * ratio;
          }
        }
        

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);

        let resizeBase64 = base64;

        resizeBase64 = canvas.toDataURL('image/jpeg', 0.92);

        controller.setSourceImage({ base64: resizeBase64, name: filename });
        (this.refs.file as any).value = null;


      }

      img.src = base64;


      
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  openFileDialog = () => {
    (this.refs.file as any).click();
  };



  render() {
    const { controller } = this.props;
    const base64 = controller.contentImgBase64;


    return (
      <div className={styles.inputImage}>
        <div className={styles.imgContainer}>
          {
            base64 && (<img src={base64} />)
          }
        </div>
        <div>
          <input ref="file" className={styles.file} type="file" accept="image" onChange={this.loadLocalImage}/> 
          <Button type="primary" onClick={() => (this.refs.file as any).click()}>加载本地图片</Button>
        </div>

      </div>
    )



  }


}