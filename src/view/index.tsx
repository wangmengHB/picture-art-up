import React from 'react';
import styles from './index.module.less';
import { PictureArtUpProps } from '../interface';
import Header from './Header';
import PicList from './PicList';
import Main from './Main';
import classnames from 'classnames';
import Controller from '../controller/controller';



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

    return (
      <div className={classnames([styles.container, className])} style={style}>
        <Header className={styles.header} controller={controller}/>
        <div className={styles.main}> 
          <PicList className={styles.list}/>
          <Main className={styles.content} controller={controller}/>
        </div>
      </div>

    )

  }

}

