import React from 'react';
import styles from './index.module.less';
import { Button, Select } from 'antd';
import { CommonProps } from '../../interface';
import classnames from 'classnames';



export interface StyleImageProps extends CommonProps {
  controller: any;

}



export default class StyleImage extends React.Component<StyleImageProps>{

  loadLocalImage = e => {
    const { controller } = this.props;
    const reader = new FileReader();
    const filename = e.target.files[0].name;
    reader.onload = (e: any) => {
      const base64: any = e.target.result;
      controller.setStyleImage({ base64, name: filename });
      (this.refs.file as any).value = null;
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  render() {
    const { controller } = this.props;
    const base64 = controller.styleImageBase64;


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