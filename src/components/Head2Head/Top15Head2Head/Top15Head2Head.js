import React from 'react';

import TopPlayerHead2HeadAsyncWrapper from '../../AsyncWrappers/TopPlayerHead2HeadAsyncWrapper/TopPlayerHead2HeadAsyncWrapper';
import Top15Table from './Top15Table/Top15Table';

export default class Top15Head2Head extends React.Component {
  render() {
    return (
      <TopPlayerHead2HeadAsyncWrapper>
        <Top15Table/>
      </TopPlayerHead2HeadAsyncWrapper>
    );
  };
};