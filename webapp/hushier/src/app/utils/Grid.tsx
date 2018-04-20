import * as React from 'react'

import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination
} from 'material-ui/Table'
import Paper from 'material-ui/Paper'
import Checkbox from 'material-ui/Checkbox'
import Tooltip from 'material-ui/Tooltip'
import Toolbar from 'material-ui/Toolbar'
import Icon from 'material-ui/Icon'
import Select from 'material-ui/Select'
import { MenuItem } from 'material-ui/Menu'
import Input, { InputLabel } from 'material-ui/Input'
import { FormControl } from 'material-ui/Form'

type GridProps = {
  rows: any[]
  columns: {
    key: string,
    name: string,
    numeric?: boolean
  }[]
  selection?: boolean
  paginable?: boolean
  filters?: boolean

  onSelectChange?: any
}
type GridState = {
  rows: any[],
  order: any,
  orderBy: any,
  selected: any[],
  currentFilter: string
  filterValue?: string,
  page: any
  rowsPerPage: any
}
export class Grid extends React.Component<GridProps, GridState> {

  constructor(props: GridProps) {
    super(props)
    this.state = {
      rows: this.props.rows,
      selected: [],
      order: 'desc',
      orderBy: this.props.columns[0].key,
      currentFilter: this.props.columns[0].key,
      page: 0,
      rowsPerPage: 10
    }
  }

  createSortHandler = property => event => {
    this.onColumnSort(event, property)
  }

  onColumnSort = (event, property) => {
    const orderBy = property
    let order = 'desc'

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }

    const rows =
      order === 'desc'
        ? this.state.rows.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.rows.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1))

    this.setState({ rows, order, orderBy })
  }

  isSelected = key => this.state.selected.indexOf(key) !== -1

  onSelect = (event, row) => {

    const { selected } = this.state
    const selectedIndex = selected.indexOf(row)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }

    this.setState({
      selected: newSelected
    })

    if (this.props.selection) {
      this.props.onSelectChange(newSelected)
    }
  }

  render() {

    const { rows, order, orderBy, currentFilter, filterValue, rowsPerPage, page } = this.state
    const { columns, selection, filters, paginable } = this.props

    let _rows = !paginable ? rows : rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    _rows = !filterValue ? _rows : _rows.filter(row => row[currentFilter].indexOf(filterValue) > 0)

    return (
      <Paper style={{ marginLeft: 20, marginRight: 20, marginBottom: 20 }}>
        {filters && this.getFilters(columns, currentFilter, filterValue)}
        {paginable && this.getPagination(rows, rowsPerPage, page)}
        <Table>
          {this.getTableHeader(columns, selection, orderBy, order)}
          <TableBody>
            {_rows.map(row => {
              const isSelected = this.isSelected(row)
              return (
                <TableRow
                  hover={true}
                  onClick={event => this.onSelect(event, row)}
                  role="checkbox"
                  aria-checked={isSelected}
                  tabIndex={-1}
                  key={row.key}
                  selected={isSelected}
                >
                  {
                    selection &&
                    <TableCell padding="checkbox">
                      <Checkbox checked={isSelected} />
                    </TableCell>
                  }
                  {columns.map(column => {
                    return (
                      <TableCell key={column.key}>{row[column.key]}</TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        {paginable && this.getPagination(rows, rowsPerPage, page)}
      </Paper>
    )
  }

  getTableHeader = (columns, selection, orderBy, order) => {
    return (
      <TableHead>
        <TableRow>
          {selection &&
            <TableCell padding="checkbox">
              <Checkbox
                onChange={this.onSelectAllClick}
              />
            </TableCell>
          }
          {columns.map(column => {
            return (

              <TableCell
                key={column.key}
                numeric={column.numeric}
                padding={column.key === columns[0].key ? 'none' : 'default'}
                sortDirection={orderBy === column.key ? order : false}
              >
                <Tooltip
                  title={`Trier par ${column.name}`}
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.key}
                    direction={order}
                    onClick={this.createSortHandler(column.key)}
                  >
                    {column.name}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            )
          })}
        </TableRow>
      </TableHead>
    )
  }

  onSelectAllClick = (event, checked) => {

    const selected = checked ? this.state.rows : []
    this.setState({ selected })

    if (this.props.selection) {
      this.props.onSelectChange(selected)
    }
  }

  getFilters = (columns, currentFilter, filterValue) => {
    return (
      <Toolbar>
        <Icon className="material-icons" style={{ marginRight: 20 }}>search</Icon>
        <Select
          value={currentFilter}
          onChange={this.onTypeFilterChange}
          inputProps={{
            name: 'filter',
            id: 'filter-simple',
          }}
          style={{ marginRight: 20, width: 200 }}
        >
          {
            columns.map(column => {
              return (
                <MenuItem key={column.key} value={column.key}>{column.name}</MenuItem>
              )
            })
          }
        </Select>
        <Input
          id="filterValue"
          placeholder="Filtre"
          onChange={this.onFilterValueChange}
          value={filterValue}
          style={{ marginRight: 20, flex: 1 }}
        />
      </Toolbar>
    )
  }

  onTypeFilterChange = event => {
    this.setState({ currentFilter: event.target.value })
  }

  onFilterValueChange = event => {
    this.setState({ filterValue: event.target.value })
  }

  getPagination = (rows, rowsPerPage, page) => {
    return (
      <TablePagination
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        rowsPerPageOptions={[10, 50, 100]}
        labelRowsPerPage="Items par page : "
        backIconButtonProps={{
          'aria-label': 'Page Précédente',
        }}
        nextIconButtonProps={{
          'aria-label': 'Page Suivante',
        }}
        onChangePage={this.onPageChange}
        onChangeRowsPerPage={this.onChangeRowsPerPage}
      />
    )
  }

  onPageChange = (event, page) => {
    this.setState({ page })
  }

  onChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value })
  }
}