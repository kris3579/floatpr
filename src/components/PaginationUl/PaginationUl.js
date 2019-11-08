import React from 'react';
import PropTypes from 'prop-types';

export default class PaginationUl extends React.Component {
  render() {
    const prevPagination = this.props.currentPagination > 1
      ? <li className='pagination'>
          <button className='paginationButton' onClick={(e) => this.props.handleChangePagination(e, this.props.currentPagination - 1)}>{'<'}</button>
        </li> : null;

    const threeBeforeCurrent = this.props.currentPagination - 3 > 0
      ? <li className='pagination'>
          <button className='paginationButton' onClick={(e) => this.props.handleChangePagination(e, this.props.currentPagination - 3)}>
            {this.props.currentPagination - 3}
          </button>
        </li> : null;

    const twoBeforeCurrent = this.props.currentPagination - 2 > 0 
      ? <li className='pagination'>
          <button className='paginationButton' onClick={(e) => this.props.handleChangePagination(e, this.props.currentPagination - 2)}>
            {this.props.currentPagination - 2}
          </button>
        </li> : null;

    const oneBeforeCurrent = this.props.currentPagination - 1 > 0 
      ? <li className='pagination'>
          <button className='paginationButton' onClick={(e) => this.props.handleChangePagination(e, this.props.currentPagination - 1)}>
            {this.props.currentPagination - 1}
          </button>
        </li> : null;

    const oneAfterCurrent = this.props.currentPagination + 1 <= this.props.maxPaginations 
      ? <li className='pagination'>
          <button className='paginationButton' onClick={(e) => this.props.handleChangePagination(e, this.props.currentPagination + 1)}>
            {this.props.currentPagination + 1}
          </button>
        </li> : null;

    const twoAfterCurrent = this.props.currentPagination + 2 <= this.props.maxPaginations 
      ? <li className='pagination'>
          <button className='paginationButton' onClick={(e) => this.props.handleChangePagination(e, this.props.currentPagination + 2)}>
            {this.props.currentPagination + 2}
          </button>
        </li> : null;

    const threeAfterCurrent = this.props.currentPagination + 3 <= this.props.maxPaginations 
      ? <li className='pagination'>
          <button className='paginationButton' onClick={(e) => this.props.handleChangePagination(e, this.props.currentPagination + 3)}>
            {this.props.currentPagination + 3}
          </button>
        </li> : null;

    const nextPagination = this.props.currentPagination < this.props.maxPaginations
      ? <li className='pagination'>
          <button className='paginationButton' onClick={(e) => this.props.handleChangePagination(e, this.props.currentPagination + 1)}>{'>'}</button>
        </li> : null;

    let paginationUl = <ul className='paginationUl'>
      {prevPagination}
      {threeBeforeCurrent}
      {twoBeforeCurrent}
      {oneBeforeCurrent}
      <li className='pagination currentPagination'><button className='paginationButton'>{this.props.currentPagination}</button></li>
      {oneAfterCurrent}
      {twoAfterCurrent}
      {threeAfterCurrent}
      {nextPagination}
    </ul>;

    if (this.props.maxPaginations === 1) {
      paginationUl = null;
    }

    return (
      <>
        {paginationUl}
      </>
    );
  }
}

PaginationUl.propTypes = {
  currentPagination: PropTypes.number,
  handleChangePagination: PropTypes.func,
  maxPaginations: PropTypes.number,
};
