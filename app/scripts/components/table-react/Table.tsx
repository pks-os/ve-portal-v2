import * as React from 'react';

import { LoadingSpinner } from '@waldur/core/LoadingSpinner';
import { TranslateProps } from '@waldur/i18n/types';
import { TablePageSize } from '@waldur/table-react/TablePageSize';

import './Table.scss';
import TableBody from './TableBody';
import TableButtons from './TableButtons';
import TableHeader from './TableHeader';
import TableInfo from './TableInfo';
import TablePagination from './TablePagination';
import TablePlaceholder from './TablePlaceholder';
import TableQuery from './TableQuery';
import TableRefreshButton from './TableRefreshButton';
import { Column, TableState } from './types';

interface Props extends TranslateProps, TableState {
  rows: any[];
  fetch: () => void;
  gotoPage?: (page: number) => void;
  hasQuery?: boolean;
  setQuery?: (query: string) => void;
  columns?: Column[];
  exportAs?: (format: string) => void;
  actions?: React.ReactNode;
  verboseName?: string;
  showPageSizeSelector?: boolean;
  updatePageSize?: (size: number) => void;
  resetPagination?: () => void;
  sortList?: () => void;
}

class Table extends React.Component<Props> {
  static defaultProps = {
    rows: [],
    columns: [],
    hasQuery: false,
  };

  render() {
    return (
      <div className="table-responsive dataTables_wrapper">
        {this.props.blocked && <div className="table-block"/>}
        <TableButtons {...this.props}/>
        {this.props.hasQuery && (
          <TableQuery
            query={this.props.query}
            setQuery={this.props.setQuery}
            translate={this.props.translate}/>
        )}
        {this.props.showPageSizeSelector &&
          <TablePageSize
            translate={this.props.translate}
            pageSize={this.props.pagination.pageSize}
            updatePageSize={this.props.updatePageSize}
          />
        }
        <TableInfo {...this.props.pagination} translate={this.props.translate}/>
        {this.renderBody()}
        <TablePagination
          {...this.props.pagination}
          gotoPage={this.props.gotoPage}
          translate={this.props.translate}/>
      </div>
    );
  }

  renderBody() {
    if (this.props.loading && (this.props.sorting && !this.props.sorting.loading)) {
      return <LoadingSpinner/>;
    }

    if (this.props.error) {
      return (
        <div>
          <p>{this.props.translate('Unable to fetch data.')}</p>
          <TableRefreshButton {...this.props}/>
        </div>
      );
    }

    if (this.props.rows.length === 0) {
      return (
        <TablePlaceholder
          query={this.props.query}
          verboseName={this.props.verboseName}
          translate={this.props.translate}/>
      );
    }

    return (
      <>
        {(this.props.sorting && this.props.sorting.loading) && (
          <>
            <div className="blocking-layer">
              <LoadingSpinner/>
            </div>
          </>
        )}
        <table className="table table-striped dataTable">
          <TableHeader
            onSortClick={this.props.sortList}
            currentSorting={this.props.sorting}
            columns={this.props.columns}
          />
          <TableBody rows={this.props.rows} columns={this.props.columns}/>
        </table>
      </>
    );
  }

  componentDidMount() {
    if (!this.props.loading) {
      this.props.fetch();
    }
  }

  componentWillUnmount() {
    this.props.resetPagination();
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.pagination.currentPage !== this.props.pagination.currentPage) {
      this.props.fetch();
    } else if (nextProps.pagination.pageSize !== this.props.pagination.pageSize) {
      this.props.fetch();
    } else if (nextProps.query !== this.props.query) {
      this.props.resetPagination();
      this.props.fetch();
    } else if (nextProps.sorting !== this.props.sorting && nextProps.sorting.loading) {
      this.props.fetch();
    }
  }
}

export default Table;
