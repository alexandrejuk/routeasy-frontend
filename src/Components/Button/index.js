import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './style.module.css'

const Button = ({
  children,
  onClick,
  type,
}) => (
  <button
    className={classNames(styles.button, styles[type])}
    onClick={onClick}
    type="button"
  >
    {children}
  </button>
)

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf([
    'danger',
    'primary',
  ]).isRequired,
}

export default Button
