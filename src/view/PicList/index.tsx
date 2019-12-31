import React from 'react';
import styles from './index.module.less';
import { CommonProps } from '../../interface';
import classnames from 'classnames';



export default class PicList extends React.Component<CommonProps>{


  render() {

    const { className, style } = this.props;
    return (
      <div className={classnames([styles.picList, className])} style={style}>

      </div>

    )

  }

}

