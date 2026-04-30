import React, { useState, useEffect } from 'react';
import '../../../theme/table.scss';

interface TableColumn {
  key?: string;
  title: string;
  width?: string | number;
  minWidth?: string | number;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  render?: (row: Record<string, any>, column: TableColumn, index: number) => any;
}

interface TableProps {
  data?: Record<string, any>[];
  columns?: TableColumn[];
  align?: 'left' | 'center' | 'right';
  border?: boolean;
  stripe?: boolean;
  hover?: boolean;
  select?: boolean;
  num?: boolean;
  height?: string | number;
  maxHeight?: string | number;
  onSelect?: (rows: Record<string, any>[]) => void;
  onRowClick?: (row: Record<string, any>, index: number) => void;
}

const STable: React.FC<TableProps> = ({
  data = [],
  columns = [],
  align = 'left',
  border = false,
  stripe = false,
  hover = true,
  select = false,
  num = false,
  height,
  maxHeight,
  onSelect,
  onRowClick,
}) => {
  const [formatData, setFormatData] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    if (select) {
      setFormatData(data.map(item => ({ ...item, _select: false })));
    } else {
      setFormatData([...data]);
    }
  }, [data, select]);

  const isSelectAll = formatData.length > 0 && formatData.every(item => item._select);

  const handleSelectAll = (checked: boolean) => {
    const newData = formatData.map(item => ({ ...item, _select: checked }));
    setFormatData(newData);
    onSelect?.(newData.filter(item => item._select));
  };

  const handleRowSelect = (row: Record<string, any>) => {
    const newData = formatData.map(item =>
      item === row ? { ...item, _select: !item._select } : item
    );
    setFormatData(newData);
    onSelect?.(newData.filter(item => item._select));
  };

  const handleRowClick = (row: Record<string, any>, index: number) => {
    onRowClick?.(row, index);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSelectAll(e.target.checked);
  };

  const getCellStyle = (column: TableColumn): React.CSSProperties => {
    const style: React.CSSProperties = {};
    if (column.width) style.width = typeof column.width === 'number' ? `${column.width}px` : column.width;
    if (column.minWidth) style.minWidth = typeof column.minWidth === 'number' ? `${column.minWidth}px` : column.minWidth;
    if (column.align) style.textAlign = column.align;
    return style;
  };

  const containerClassName = [
    'sw-table__container',
    height || maxHeight ? 'sw-table__container--scroll' : '',
  ].filter(Boolean).join(' ');

  const wrapperStyle: React.CSSProperties = {};
  if (height) wrapperStyle.height = `${height}px`;
  if (maxHeight) wrapperStyle.maxHeight = `${maxHeight}px`;

  const tableClassName = [
    'sw-table',
    border ? 'sw-table--border' : '',
    stripe ? 'sw-table--stripe' : '',
    hover ? 'sw-table--hover' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={tableClassName}>
      <div className={containerClassName}>
        <div className="sw-table__wrapper" style={wrapperStyle}>
          <table className="sw-table__table">
            <colgroup>
              {select && <col width="50" />}
              {num && <col width="60" />}
              {columns.map((column, index) => (
                <col key={index} width={column.width as number | string} />
              ))}
            </colgroup>
            <thead className="sw-table__head">
              <tr>
                {select && (
                  <th className="sw-table__th">
                    <input type="checkbox" checked={isSelectAll} onChange={handleCheckboxChange} />
                  </th>
                )}
                {num && <th className="sw-table__th sw-table__th--num">#</th>}
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className={`sw-table__th ${column.sortable ? 'sw-table__th--sortable' : ''}`}
                    style={getCellStyle(column)}
                  >
                    <span className="sw-table__th-content">
                      {column.title}
                      {column.sortable && (
                        <span className="sw-table__sort-icon">
                          <i className="sw-icon sw-icon-sort" />
                        </span>
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="sw-table__body">
              {formatData.map((item, m) => (
                <tr
                  key={m}
                  className={`sw-table__row ${item._select ? 'sw-table__row--selected' : ''} ${stripe && m % 2 === 1 ? 'sw-table__row--stripe' : ''}`}
                  onClick={() => handleRowClick(item, m)}
                >
                  {select && (
                    <td className="sw-table__td" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={item._select}
                        onChange={() => handleRowSelect(item)}
                      />
                    </td>
                  )}
                  {num && <td className="sw-table__td sw-table__td--num">{m + 1}</td>}
                  {columns.map((column, i) => (
                    <td key={i} className="sw-table__td" style={getCellStyle(column)}>
                      {column.render
                        ? column.render(item, column, m)
                        : column.key
                        ? item[column.key]
                        : null}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {formatData.length === 0 && (
            <div className="sw-table__empty">
              <div className="sw-table__empty-content">
                <i className="sw-icon sw-icon-files" />
                <span>暂无数据</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default STable;