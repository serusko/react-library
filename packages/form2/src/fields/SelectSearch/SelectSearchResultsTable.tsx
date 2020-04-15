import React, { memo, FC } from 'react';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
import { FixedSizeList as List } from 'react-window';

import Link from '_components/Link';
import { OptionType } from '_components/Form/fields/SelectField';
import { useTranslation } from '_helpers';

interface Props {
  tableData: OptionType[];
  clickHandler: Function;
  filter: string;
}

interface RowProps {
  data: {
    filteredData: OptionType[];
    clickHandler: Function;
  };
  index: number;
  style: object;
}

const Row = ({ data, index, style }: RowProps) => (
  <div style={style}>
    <TableRow key={index}>
      {/* <TableCell scope="row"> */}
      <Link onClick={() => data.clickHandler(data.filteredData[index])}>
        <b>{data.filteredData[index].label}</b>
      </Link>
      {/* </TableCell> */}
    </TableRow>
  </div>
);

const SelectSearchResultsTable: FC<Props> = ({ tableData, filter, clickHandler }) => {
  const { t } = useTranslation();
  const filteredData = (tableData || []).filter(it =>
    it.label.toLowerCase().startsWith(filter.toLowerCase())
  );
  return (
    <div style={{ overflow: 'auto', maxHeight: '20rem', marginTop: '1rem', marginBottom: '1rem' }}>
      {filteredData && filteredData.length ? (
        <Table>
          <TableBody>
            <List
              className="SelectSearchResultsList"
              height={150}
              itemCount={filteredData.length}
              itemSize={35}
              width="100%"
              itemData={{ filteredData, clickHandler }}
            >
              {Row}
            </List>
          </TableBody>
        </Table>
      ) : (
        <p style={{ height: '120px', textAlign: 'center' }}> {t('Žiadne výsledky')} </p>
      )}
    </div>
  );
};

export default memo(SelectSearchResultsTable) as FC<Props>;
