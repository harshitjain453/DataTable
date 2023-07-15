import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, ButtonGroup, Button, Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { useState } from 'react';

import { SearchIcon } from '@chakra-ui/icons';

type DataTableProps = {
  headers: string[];
  rows: (string | JSX.Element)[][];
  caption?: string;
  sortable?: boolean;
  pagination?: boolean;
};

type SortDirection = 'asc' | 'desc';

const DataTable: React.FC<DataTableProps> = ({
  headers,
  rows,
  caption,
  sortable,
  pagination,
}) => {
  const [sortColumn, setSortColumn] = useState<number | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const itemsPerPage = 10;

  const handleHeaderClick = (columnIndex: number) => {
    if (!sortable) return;

    if (sortColumn === columnIndex) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnIndex);
      setSortDirection('asc');
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setCurrentPage(1);
  };

  const filterRows = () => {
    if (searchValue === '') return rows;

    return rows.filter((row) =>
      row.some((cell, cellIndex) =>
        typeof cell === 'string' &&
        headers[cellIndex] === 'Purchase Id' &&
        cell.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };



  const sortedRows = sortColumn !== null ? [...filterRows()] : filterRows();
  if (sortColumn !== null) {
    sortedRows.sort((rowA, rowB) => {
      const cellA = rowA[sortColumn];
      const cellB = rowB[sortColumn];

      if (sortColumn === headers.indexOf('Purchase Id')) {
        // Sort as numbers if possible
        const numA = parseInt(cellA as string);
        const numB = parseInt(cellB as string);

        if (!isNaN(numA) && !isNaN(numB)) {
          return sortDirection === 'asc' ? numA - numB : numB - numA;
        }
      }

      // string-based sorting
      if (typeof cellA === 'string' && typeof cellB === 'string') {
        return sortDirection === 'asc' ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
      }

      return 0;
    });
  }


  const totalItems = sortedRows.length;
  console.log(totalItems)
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  console.log(totalPages)


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };



  const getPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    return sortedRows.slice(startIndex, endIndex);
  };


  return (
    <>
      <InputGroup mb={4} w="25%">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search by Purchase ID"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button onClick={() => setSearchValue('')} ml={2}>
          Clear
        </Button>
      </InputGroup>
      <Table size='sm' variant="striped" colorScheme="gray">
        {caption && <TableCaption>{caption}</TableCaption>}
        <Thead>
          <Tr>
            {headers.map((header, index) => (
              <Th
                key={index}
                onClick={() => handleHeaderClick(index)}
                cursor={sortable ? 'pointer' : 'default'}
              >
                {header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {getPageItems().map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {row.map((cell, cellIndex) => {
                if (headers[cellIndex] === 'Select') {
                  return (
                    <Td key={cellIndex}>
                      <Button
                        key={`select-${rowIndex}`}
                        width="100%"
                        height="100%"
                        p={2}
                        // bgGradient={[
                        //   'linear(to-tr, teal.300, yellow.400)',
                        //   'linear(to-t, blue.200, teal.500)',
                        //   'linear(to-b, orange.100, purple.300)',
                        // ]}
                        bgColor='gray.500'
                        _hover={{ bg: 'gray.400' }}
                        rounded={13}
                      >
                        {cell}
                      </Button>
                    </Td>
                  );
                } else if (headers[cellIndex] === 'Status') {
                  let statusColor = '';
                  let textColor = '';
                  if (cell === 'Pending') {
                    statusColor = 'red.300';
                    textColor = 'black';
                  } else if (cell === 'Paid') {
                    statusColor = 'green.300';
                    textColor = 'black';
                  } else if (cell === 'Waiting') {
                    statusColor = 'yellow.200';
                    textColor = 'black';
                  }
                  return (
                    <Td key={cellIndex}>
                      <Box
                        bg={statusColor}
                        rounded="full"
                        p={1}
                        width={cell === 'Paid' ? '65px' : '80px'}
                        color={textColor}
                        textAlign="center"
                      >
                        {cell}
                      </Box>
                    </Td>
                  );
                }
                return <Td key={cellIndex}>{cell}</Td>;
              })}
            </Tr>
          ))}
        </Tbody>
        {pagination && (
          <ButtonGroup variant="outline" spacing="2" mt="4" justifyContent="flex-end">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              isDisabled={currentPage === 1}
              disabled={currentPage === 1}
              _disabled={{ bg: 'gray.200', color: 'gray.400', _hover: {} }}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                colorScheme={currentPage === index + 1 ? 'blue' : 'gray'}
              >
                {index + 1}
              </Button>
            ))}
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              isDisabled={currentPage === totalPages}
              disabled={currentPage === totalPages}
              _disabled={{ bg: 'gray.200', color: 'gray.400', _hover: {} }}
            >
              Next
            </Button>
          </ButtonGroup>
        )}
      </Table>
    </>
  );
};

export default DataTable;
