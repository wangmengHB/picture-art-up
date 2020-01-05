import React from 'react';
import styles from './index.module.less';
import { PictureArtUpProps } from '../interface';
import { Spin } from 'antd';
import Header from './Header';
import Main from './Main';
import classnames from 'classnames';
import Controller from '../controller/deeplearn/controller';



export interface PictureArtUpState {
  controller: Controller;
}

export default class PictureArtUp extends React.Component<PictureArtUpProps, PictureArtUpState>{

  constructor(props: PictureArtUpProps) {
    super(props);
    this.state = {
      controller: new Controller(this)
    };
  }


  render() {
    const { className, style } = this.props;
    const { controller } = this.state;
    const { loading, loadingTxt } = controller;

    return (
      <Spin spinning={loading} tip={loadingTxt}>
        <div className={classnames([styles.container, className])} style={style}>
          <Header className={styles.header} controller={controller}/>
          <div className={styles.main}>
            <Main className={styles.content} controller={controller}/>
          </div>
        </div>
      </Spin>
    );
  }

}

