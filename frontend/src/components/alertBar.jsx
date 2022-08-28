import React from 'react';
import styles from './alertBar.module.css';

const AlertBar = ({alert_text, alert_color}) => {
  return (
    <div className={styles.alert_box} style={{ backgroundColor: alert_color }}>
      <p className={styles.alert_content}>
        {alert_text}
      </p>
    </div>
  )
}

AlertBar.defaultProps = {
  alert_color: 'red'
}

export default AlertBar;