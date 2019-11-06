import React from 'react';
import PropTypes from 'prop-types';

export default class PaginationUl extends React.Component {
  render() {
    const prevPagination = this.props.currentPagination > 1
      ? <li className='paginationLi'>
          <button onClick={(e) => this.props.handleDecreasePagination(e)} className='otherPagination'>{'<'}</button>
        </li> : null;

    const twoBeforeCurrent = this.props.currentPagination - 2 > 0 
      ? <li className='paginationLi'>
          <button onClick={(e) => this.props.handleSelectPagination(e, this.props.currentPagination - 2)} className='otherPagination'>
            {this.props.currentPagination - 2}
          </button>
        </li> : null;

    const oneBeforeCurrent = this.props.currentPagination - 1 > 0 
      ? <li className='paginationLi'>
          <button onClick={(e) => this.props.handleSelectPagination(e, this.props.currentPagination - 1)} className='otherPagination'>
            {this.props.currentPagination - 1}
          </button>
        </li> : null;

    const oneAfterCurrent = this.props.currentPagination + 1 <= this.props.maxPaginations 
      ? <li className='paginationLi'>
          <button onClick={(e) => this.props.handleSelectPagination(e, this.props.currentPagination + 1)} className='otherPagination'>
            {this.props.currentPagination + 1}
          </button>
        </li> : null;

    const twoAfterCurrent = this.props.currentPagination + 2 <= this.props.maxPaginations 
      ? <li className='paginationLi'>
          <button onClick={(e) => this.props.handleSelectPagination(e, this.props.currentPagination + 2)} className='otherPagination'>
            {this.props.currentPagination + 2}
          </button>
        </li> : null;

    const nextPagination = this.props.currentPagination < this.props.maxPaginations
      ? <li className='paginationLi'>
          <button onClick={(e) => this.props.handleIncreasePagination(e)} className='otherPagination'>{'>'}</button>
        </li> : null;

    let paginationUl = <ul className='paginationUl'>
      {prevPagination}
      {twoBeforeCurrent}
      {oneBeforeCurrent}
      <li className='paginationLi'><button className='currentPagination'>{this.props.currentPagination}</button></li>
      {oneAfterCurrent}
      {twoAfterCurrent}
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
  handleDecreasePagination: PropTypes.func,
  handleIncreasePagination: PropTypes.func,
  handleSelectPagination: PropTypes.func,
  maxPaginations: PropTypes.number,
};
