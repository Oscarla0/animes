import React from 'react';
import { Pagination as AntPagination } from 'antd';
import 'antd/es/pagination/style';
import styled from 'styled-components';

const CenteredPagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px; /* Ajusta el margen superior según sea necesario */
`;

const Paginacion = () => {
  return (
    <CenteredPagination>
      <AntPagination
        prevText="Previous"
        nextText="Next page"
        defaultPageSize={1}
        total={86}
        itemRender={(current, type, originalElement) => {
          if (type === 'prev') {
            return <a className="pagination-previous">{originalElement}</a>;
          }
          if (type === 'next') {
            return <a className="pagination-next">{originalElement}</a>;
          }
          return <a className="pagination-link">{originalElement}</a>;
        }}
      />
    </CenteredPagination>
  );
};

export default Paginacion;
