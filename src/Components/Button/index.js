import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './style.module.css'

const Button = ({
  children,
  onClick,
  type,
  id,
}) => (
  <button
    className={classNames(styles.button, styles[type])}
    onClick={onClick}
    type="button"
    id={id}
  >
    {children}
  </button>
)

Button.propTypes = {
  id: PropTypes.string,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf([
    'danger',
    'primary',
  ]).isRequired,
}

export default Button
