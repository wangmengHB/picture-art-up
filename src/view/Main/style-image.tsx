import React from 'react';
import styles from './index.module.less';
import { Button, Select } from 'antd';
import { CommonProps } from '../../interface';
import classnames from 'classnames';
import { DEFAULT_STYLES_OPTIONS } from '../../config';

console.log('options', DEFAULT_STYLES_OPTIONS);

const { Option } = Select;

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

  changeStyle = (val) => {
    const { controller } = this.props;
    controller.currentStyle = val;
    this.forceUpdate();
  }


  render() {
    const { controller } = this.props;
    const { currentStyle } = controller;
    const target = DEFAULT_STYLES_OPTIONS.find(item => item.value === currentStyle );

    

    return (
      <div className={styles.inputImage}>
        <Select style={{width: '100%', marginBottom: 20}} value={currentStyle} onChange={this.changeStyle}>
          {
            DEFAULT_STYLES_OPTIONS.map((opt: any) => {
              return (
                <Option key={opt.value} value={opt.value}>{opt.name}</Option>
              );
            })
          }
        </Select>

        <div className={styles.imgContainer}>
          {
            target && (<img src={target.thumbnail} />)
          }
        </div>
        

      </div>
    )



  }


}