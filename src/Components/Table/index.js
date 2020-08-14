import React from 'react'
import PropTypes from 'prop-types'

import styles from './style.module.css'

const Table = ({
  actionTable,
  data,
}) => {
  const renderRow = (row, index) => (
    <tr className={styles.tr} key={index}>
      <td className={styles.td}>{row.name}</td>
      <td className={styles.td}>{row.street}</td>
      <td className={styles.td}>{row.city}</td>
      <td className={styles.td}>{row.country}</td>
      <td className={styles.td}>{row.weight}</td>
      <td className={styles.td}>{row.lat}</td>
      <td className={styles.td}>{row.lng}</td>
      { actionTable && (
        <td className={styles.td}>
          <button
            data-testid="button"
            onClick={() => actionTable.control(row)}
          >
            {actionTable.label || 'Action'}
          </button>
        </td>
      )}
    </tr>
  )

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.tr}>
          <th className={styles.th}>Nome</th>
          <th className={styles.th}>Rua</th>
          <th className={styles.th}>Cidade</th>
          <th className={styles.th}>País</th>
          <th className={styles.th}>Peso</th>
          <th className={styles.th}>Lat</th>
          <th className={styles.th}>Lng</th>
          {actionTable && (
            <th className={styles.th}>{actionTable.field || 'Action'}</th>
          )}
        </tr>
      </thead>
      <tbody>
        {
          data && data.length > 0
            ? data.map(renderRow)
            : <tr><td>No results found!</td></tr>
        }
      </tbody>
    </table>
  )
}

Table.propTypes = {
  actionTable: PropTypes.shape({
    control: PropTypes.func,
    field: PropTypes.string,
    label: PropTypes.string,
  }),
  data: PropTypes.arrayOf(
    PropTypes.shape({}).isRequired,
  ).isRequired,
}

Table.propTypes = {
  actionTable: null,
}

export default Table
