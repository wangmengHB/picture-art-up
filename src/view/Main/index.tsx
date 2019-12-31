import React from 'react';
import styles from './index.module.less';
import { Button, Select } from 'antd';
import { CommonProps } from '../../interface';
import classnames from 'classnames';
import { DEFAULT_STYLES_OPTIONS } from '../../config';

const { Option } = Select;


console.log('options', DEFAULT_STYLES_OPTIONS);

export interface MainProps extends CommonProps{
  controller: any;
}


export default class PictureArtUp extends React.Component<MainProps>{

  changeStyle = (val) => {
    const { className, style, controller } = this.props;
    controller.currentStyle = val;
    this.forceUpdate();
  }

  convert = () => {
    const {controller} = this.props;
    controller.start().then(() => {
      this.forceUpdate();
    })


  }

  componentDidMount() {
    const { controller } = this.props;  
    const workspaceNode = this.refs.workspace;
    if (!workspaceNode) {
      throw new Error('failed to get canvas element!');
    }
    (workspaceNode as any).appendChild(controller.canvas);
    
  }


  render() {
    const { className, style, controller } = this.props;

    const base64 = controller.contentImgBase64;

    const { currentStyle } = controller;

    const target = DEFAULT_STYLES_OPTIONS.find(item => item.value === currentStyle);

    let styleThumb;
    if (target && target.thumbnail) {
      styleThumb = target.thumbnail;
    }

    return (
      <div className={classnames([styles.main, className])} style={style}>
        <div className={styles.content}>
          <div className={styles.block}>
            <div className={styles.imgContainer}>
              {
                base64? (
                  <img src={base64}/>
                ): null
              }
            </div>
          </div>
          <div className={styles.block}>
            <Select 
              value={currentStyle} 
              placeholder="请选择风格" 
              onChange={this.changeStyle}
              style={{width: '100%', marginBottom: 20}}
            >
              {
                DEFAULT_STYLES_OPTIONS.map((item: any) => (
                <Option key={item.value} value={item.value}>{item.name}</Option>
                ))
              }

            </Select>
            <div className={classnames([styles.imgContainer, styles.stylePart]) }>
              {
                styleThumb? (
                  <img src={styleThumb}/>
                ): null
              }
            </div>

          </div>
          <div className={styles.block}>
            <div ref="workspace" className={styles.imgContainer}/>
          </div>
        </div>
        <div className={styles.panel}>
          <Button type="primary" onClick={this.convert}>转换</Button>
        </div>

      </div>

    )

  }

}

