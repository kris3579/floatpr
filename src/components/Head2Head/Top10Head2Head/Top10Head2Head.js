import React from 'react';

import TopPlayerHead2HeadAsyncWrapper from '../../AsyncWrappers/TopPlayerHead2HeadAsyncWrapper/TopPlayerHead2HeadAsyncWrapper';
import Top10Table from './Top10Table/Top10Table';

export default class Top15Head2Head extends React.Component {
  render() {
    return (
      <TopPlayerHead2HeadAsyncWrapper>
        <Top10Table/>
      </TopPlayerHead2HeadAsyncWrapper>
    );
  }
}
