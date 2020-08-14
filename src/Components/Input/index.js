import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './style.module.css'

const Input = ({
  error,
  disable,
  placeholder,
  name,
  onChange,
  type,
  value,
}) => (
  <input
    className={classNames(styles.input, { [styles.error]: error })}
    disabled={disable}
    name={name}
    onChange={onChange}
    placeholder={placeholder}
    type={type}
    value={value}
  />
)

Input.propTypes = {
  error: PropTypes.string,
  disable: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf([
    'number',
    'text',
  ]).isRequired,
  value: PropTypes.any.isRequired,
}

Input.defaultProps = {
  error: null,
  disable: false,
  label: null,
  placeholder: null,
}

export default Input
