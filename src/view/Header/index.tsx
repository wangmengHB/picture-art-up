import React from 'react';
import styles from './index.module.less';
import { Button, Select } from 'antd';
import { CommonProps } from '../../interface';
import classnames from 'classnames';


export interface HeaderProps extends CommonProps {
  controller: any;
}

export default class Header extends React.Component<HeaderProps>{


  loadLocalImage = e => {
    const { controller } = this.props;
    const reader = new FileReader();
    const filename = e.target.files[0].name;
    reader.onload = (e: any) => {
      const base64: any = e.target.result;
      controller.addImage({ base64, name: filename });
      (this.refs.file as any).value = null;
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  openFileDialog = () => {
    (this.refs.file as any).click();
  };


  render() {
    const { className, style } = this.props;

    return (
      <div className={classnames([styles.header, className])} style={style}>
        <input ref="file" className={styles.file} type="file" accept="image" onChange={this.loadLocalImage}/>  
        <Button 
          className={styles['btn']} 
          type="primary" 
          onClick={this.openFileDialog}
        >
          加载本地图片
        </Button>
      </div>
    );

  }

}

