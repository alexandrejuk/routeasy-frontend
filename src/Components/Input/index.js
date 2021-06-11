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
  id,
}) => (
  <input
    className={classNames(styles.input, { [styles.error]: error })}
    disabled={disable}
    name={name}
    onChange={onChange}
    placeholder={placeholder}
    type={type}
    value={value}
    id={id}
  />
)

Input.propTypes = {
  id: PropTypes.string,
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
  value: PropTypes.any,
}

Input.defaultProps = {
  error: null,
  disable: false,
  label: null,
  placeholder: null,
}

export default Input
