import React from 'react';
import styles from './index.module.less';
import { Button, Select } from 'antd';
import { CommonProps } from '../../interface';
import classnames from 'classnames';
import { TF_MODELS } from '../../config';

const { Option } = Select;

const STYLE_OPTIONS = [
  TF_MODELS.mobileStyleNet, 
  TF_MODELS.inceptionStyleNet
];
const TRANSFORM_OPTIONS = [
  TF_MODELS.separableTransformNet,
  TF_MODELS.originalTransformNet,
];



export interface HeaderProps extends CommonProps {
  controller: any;
}

export default class Header extends React.Component<HeaderProps>{


  changeStyle = (val) => {
    const { controller } = this.props;
    controller.styleNetName = val;
    this.forceUpdate();
  }

  changeTransform = (val) => {
    const { controller } = this.props;
    controller.transformNetName = val;
    this.forceUpdate();
  }

  

  render() {
    const { className, style, controller } = this.props;

    const { styleNetName, transformNetName } = controller;


    return (
      <div className={classnames([styles.header, className])} style={style}>

        <span className={styles.label}>风格模型</span>
        <Select
          className={styles.select}
          value={styleNetName}
          onChange={this.changeStyle}
        >
          {
            STYLE_OPTIONS.map(opt => (
            <Option key={opt.name} value={opt.name}>{opt.title}</Option>
            ))
          }
        </Select>
        <span className={styles.label}>转换模型</span>
        <Select
          className={styles.select}
          value={transformNetName}
          onChange={this.changeTransform}
        >
          {
            TRANSFORM_OPTIONS.map(opt => (
            <Option key={opt.name} value={opt.name}>{opt.title}</Option>
            ))
          }
        </Select>
        
      </div>
    );

  }

}

