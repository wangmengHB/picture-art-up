import React from 'react';
import styles from './index.module.less';
import { Button, Select } from 'antd';
import { CommonProps } from '../../interface';
import classnames from 'classnames';

import InputImage from './input-image';
import StyleImage from './style-image';

const { Option } = Select;




export interface MainProps extends CommonProps{
  controller: any;
}


export default class PictureArtUp extends React.Component<MainProps>{

  

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

    
    return (
      <div className={classnames([styles.main, className])} style={style}>
        <div className={styles.content}>
          <div className={styles.block}>
            <InputImage  controller={controller}/>
          </div>
          <div className={styles.block}>
            <StyleImage controller={controller} />
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

