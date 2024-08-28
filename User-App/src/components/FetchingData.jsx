import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button, Input, Select, Center} from '@chakra-ui/react';

const FetchingData=()=>{
  const [emp, setEmp]=useState([]);
  const [sortBy, setSortBy]=useState('asc');
  const [filterGender, setFilterGender]=useState('All');
  const [searchQuery, setSearchQuery]=useState('');
  const [editRow, setEditRow]=useState(null);
  useEffect(()=>{
    async function getData() {
      try {
        const response=await axios.get("https://file.notion.so/f/f/3849cbaa-5010-40df-a27a-f34a3a69c598/ce7879ce-8dee-462f-9a6f-52a31ea104e5/MOCK_DATA.json?table=block&id=5766873f-14ad-4eba-9e97-7c51337fa118&spaceId=3849cbaa-5010-40df-a27a-f34a3a69c598&expirationTimestamp=1724940000000&signature=fVeb8qT8SqXtlPw6geGx_6wPW44Z3X0BgRSGwCZjGAs&downloadName=MOCK_DATA.json");
        console.log(response);
        setEmp(response.data);
      } catch (err) {
        console.log("Error fetching data", err);
      }
    }
    getData();
  }, []);

  const handleSort=()=>{
    const sorted=[...emp].sort((a, b)=>{
      return sortBy === 'asc' ? a.salary-b.salary:b.salary-a.salary;
    });
    setEmp(sorted);
    setSortBy(sortBy ==='asc' ? 'desc':'asc');
  };
  const handleFilter=(e)=>{
    console.log(e.target.value);
    setFilterGender(e.target.value);
  };
  const handleSearch=(e)=>{
    setSearchQuery(e.target.value);
  };

  const handleEdit=(employee)=>{
    setEditRow(employee.id);
  };
  const handleChange=(e, id, field)=>{
    setEmp(emp.map(employee =>
      employee.id === id ? { ...employee, [field]: e.target.value }:employee
    ));
  };
  const handleSave=(id)=>{
    setEditRow(null);
  };
  const handleCancel=()=>{
    setEditRow(null);
  };
  const handleDelete=(id)=>{
    setEmp(emp.filter(employee=>employee.id !== id));
  };
  const filteredemp=emp.filter(employee =>
    (filterGender === 'All' || employee.gender === filterGender) &&
    (employee.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.last_name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Box p={4}>
      <Heading textAlign={"center"}>Employee Mangement</Heading>
      <Input 
        type="text" 
        value={searchQuery} 
        onChange={handleSearch} 
        placeholder="Search by name..."
        mb={4}
      />
      <Box marginRight={6} mb={4} display={'inline-block'}>
      <select onChange={handleFilter}>
        <option value="All" selected > select Genger</option>
        <option value="All">All</option>
        <option value="Male">Male</option> 
        <option value="Female">Female</option>
      </select>
      
      </Box>

      <Button onClick={handleSort} mb={4}>
        Sort by Salary ({sortBy === 'asc'?'Ascending':'Descending'})
      </Button>
      <TableContainer>
        <Table variant='striped'>
          <Thead>
            <Tr fontSize={"24px"}>
              <Th>ID</Th>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Email</Th>
              <Th>Gender</Th>
              <Th>Salary</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredemp.map(employee=>(
              <Tr key={employee.id}>
                <Td>{employee.id}</Td>
                <Td>
                  {editRow === employee.id ? (
                    <Input
                      type="text"
                      value={employee.first_name}
                      onChange={(e)=>handleChange(e, employee.id, 'first_name')}
                    />
                  ):(
                    employee.first_name
                  )}
                </Td>
                <Td>
                  {editRow ===employee.id ? (
                    <Input
                      type="text"
                      value={employee.last_name}
                      onChange={(e)=>handleChange(e, employee.id, 'last_name')}
                    />
                  ):(
                    employee.last_name
                  )}
                </Td>
                <Td>
                  {editRow ===employee.id ? (
                    <Input
                      type="email"
                      value={employee.email}
                      onChange={(e)=>handleChange(e, employee.id, 'email')}
                    />
                  ):(
                    employee.email
                  )}
                </Td>
                <Td>
                  {editRow ===employee.id ? (
                    <Select
                      value={employee.gender}
                      onChange={(e)=>handleChange(e, employee.id, 'gender')}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Select>
                  ):(
                    employee.gender
                  )}
                </Td>
                <Td>
                  {editRow === employee.id ? (
                    <Input
                      type="number"
                      value={employee.salary}
                      onChange={(e)=>handleChange(e, employee.id, 'salary')}
                    />
                  ):(
                    employee.salary
                  )}
                </Td>
                <Td>
                  {editRow === employee.id ? (
                    <>
                      <Button onClick={()=>handleSave(employee.id)} colorScheme="blue" mr={2}>
                        Save
                      </Button>
                      <Button onClick={handleCancel} colorScheme="red">
                        Cancel
                      </Button>
                    </>
                  ):(
                    <>
                      <Button onClick={()=>handleEdit(employee)} colorScheme="green" mr={2}>
                        Edit
                      </Button>
                      <Button onClick={()=>handleDelete(employee.id)} colorScheme="red">
                        Delete
                      </Button>
                    </>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FetchingData;
