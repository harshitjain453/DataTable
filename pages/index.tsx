import { Box, Heading, ChakraProvider, SimpleGrid, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const DataTable = dynamic(() => import('../component/DataTable'));

const headers = ['Timestamp', 'Purchase Id', 'Mail', 'Name', 'Source', 'Status', 'Select'];

const rows = [
  ['2023-07-12', '1', 'example@mail.com', 'John Doe', 'Website', 'Paid', 'Select'],
  ['2023-07-13', '2', 'test@mail.com', 'Jane Smith', 'Mobile App', 'Pending', 'Select'],
  ['2023-07-12', '3', 'harshit@mail.com', 'John Doe', 'Website', 'Waiting', 'Select'],
  ['2023-07-13', '4', 'ridhika@mail.com', 'Jane Smith', 'Mobile App', 'Pending', 'Select'],
  ['2023-07-12', '5', 'demo@mail.com', 'John Doe', 'Website', 'Paid', 'Select'],
  ['2023-07-13', '6', 'anita@mail.com', 'Jane Smith', 'Mobile App', 'Pending', 'Select'],
  ['2023-07-12', '7', 'deepak@mail.com', 'John Doe', 'Website', 'Waiting', 'Select'],
  ['2023-07-13', '8', 'sanchit@mail.com', 'Jane Smith', 'Mobile App', 'Pending', 'Select'],
  ['2023-07-12', '9', 'nishant@mail.com', 'John Doe', 'Website', 'Paid', 'Select'],
  ['2023-07-13', '10', 'subham@mail.com', 'Jane Smith', 'Mobile App', 'Pending', 'Select'],
  ['2023-07-12', '11', 'pankaj@mail.com', 'John Doe', 'Website', 'Waiting', 'Select'],
  ['2023-07-13', '12', 'yukti@mail.com', 'Jane Smith', 'Mobile App', 'Pending', 'Select'],
  ['2023-07-12', '13', 'manisha@mail.com', 'John Doe', 'Website', 'Paid', 'Select'],
  ['2023-07-13', '14', 'priya@mail.com', 'Jane Smith', 'Mobile App', 'Pending', 'Select'],
  ['2023-07-12', '15', 'ananya@mail.com', 'John Doe', 'Website', 'Paid', 'Select'],
  ['2023-07-13', '16', 'smith@mail.com', 'Smith', 'Mobile App', 'Pending', 'Select'],
  ['2023-07-12', '17', 'harry@mail.com', 'Harry', 'Website', 'Waiting', 'Select'],
  ['2023-07-13', '18', 'dasa@mail.com', 'Dasa', 'Mobile App', 'Pending', 'Select'],
  ['2023-07-12', '19', 'naman@mail.com', 'Naman', 'Website', 'Paid', 'Select'],
  ['2023-07-13', '20', 'akshay@mail.com', 'Akshay', 'Mobile App', 'Waiting', 'Select'],

  // Add more rows as needed
];

const Home: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <ChakraProvider>
        <SimpleGrid
          bg='white'
          columns={{ sm: 1, md: 1 }}
          spacing={8}
          p={10}
          textAlign='center'
          rounded='lg'
          color='gray.700'
        >
          <Box boxShadow='dark-lg' p={10} rounded='md' w='100%'
            h='100%'

          >
            <Heading as="h1" mb={4}>
              Bookings
            </Heading>
            {isClient && (
              <DataTable headers={headers} rows={rows} sortable caption="Bookings" pagination />
            )}
          </Box>
        </SimpleGrid>
      </ChakraProvider>
    </>
  );
};

export default Home;