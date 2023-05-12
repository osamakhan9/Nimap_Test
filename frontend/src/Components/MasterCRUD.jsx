import {
	FormControl,
	FormLabel,
	FormHelperText,
	Input,
	Flex,
	Select,
	Button,
	Heading,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useToast,
  } from "@chakra-ui/react";
  import { useEffect } from "react";
  
  import { useDispatch, useSelector } from "react-redux";
  import { filterData, getData } from "../Redux/actions";
  import {EditCRUD} from './EditCRUD'
  import { useState } from "react";

  
  export default function TodoList() {
	const dispatch = useDispatch();
	const toast = useToast()
	let data = useSelector((store) => store.todos);
	useEffect(() => {
	  apiCall();
	  
	}, []);
	


	const [user, setuser] = useState({
		
		Category: "",
		Product:"",
	  });

	  

	

	  function handleChange(e) {
			setuser({ ...user, [e.target.id]: e.target.value });
	
	  }


	    

	async function handleSubmit(e) {
		e.preventDefault();
		if(user.Category == ""  || user.Product==""){
			toast({
				title: "Please Fill Carefully",
				description: "We've Not allow todo fill the all data",
				status: "warning",
				duration: 9000,
				isClosable: true,
				position: "top",
			  });

		}else{
				// console.log(user)
				try{
					let res = await fetch('http://localhost:8080/data',{
					  method: "POST",
					  headers: { "content-type": "application/json"},
					  body: JSON.stringify(user),
					});
					let data = await res.json();
					console.log(data)
				  }catch (e){
					// console.log(e)
				}
				toast({
					title: "Successfully Add Master CRUD Operation",
					description: "We've created your CRUD.",
					status: "success",
					duration: 9000,
					isClosable: true,
					position: "top",
				  });
			}	

	}

  
	async function apiCall() {
	  let res = await fetch("http://localhost:8080/data");
	  res = await res.json();
	  dispatch(getData(res));
	}
	apiCall()

  
	async function handleDelete(id) {
	   await fetch(`http://localhost:8080/data/${id}`, {
		method: "DELETE",
		headers: {
		  "Content-Type": "application/json",
		},
	  });
	  toast({
		title: "DELETE Successfully",
		description:`your are Deleted ${id} CRUD.`,
		status: "warning",
		duration: 9000,
		isClosable: true,
		position: "top",
	  });

	  apiCall();
	}

	async function filtertodo(e) {
		let value = e.target.value;
		let res = await fetch(`http://localhost:8080/data${value}`);
		res = await res.json().then((res) => dispatch(filterData(res)));
	  }

	return (
	  <Flex mt={60} w={"100vw"} alignItems={"center"} justifyContent="space-evenly">
	
		<Flex alignItems="center" justifyContent="center">
		  <FormControl boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"} p={"2rem"}>
			<Heading m={15}>Master CRUD Operation</Heading>
			<FormLabel mt="10px">Category</FormLabel>
			<Input type="text" placeholder="Category" id="Category"  onChange={handleChange} />

			<FormLabel mt="10px">Product</FormLabel>
			<Input type="text" placeholder="Product" id="Product" onChange={handleChange} />
  
			<Button mt="15px" width="full" type="submit" color='white' colorScheme="teal" onClick={handleSubmit}>
			  Create
			</Button>
			<FormHelperText>Create Category and Product.</FormHelperText>
		  </FormControl>
		</Flex>
  
		<Flex mt={-150} flexDirection={"column"}>
		  <Heading m={"2rem"}>LIST</Heading>

		  <TableContainer
			boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
			pt={"1rem"}
		  >
			<Table variant="striped">
			  <TableCaption></TableCaption>
			  <Thead>
				<Tr>
				  <Th>Id</Th>
				  <Th>Create</Th>
				  <Th>Product</Th>
				  <Th>Edit</Th>
				  <Th>Delete</Th>
				</Tr>
			  </Thead>
			  <Tbody>
				{data.map((el, index) => {
				  return (
					<Tr key={index + 1}>
					  <Td>{el.id}</Td>
					  <Td>{el.Category}</Td>
					  <Td>{el.Product}</Td>
					  <Td>
						<EditCRUD el={el} apiCall={apiCall} toast={toast} />
					  </Td>
					  <Td>
						<Button
						  variant={"solid"}
						  colorScheme={"red"}
						  onClick={() => {
							handleDelete(el.id);
						  }}
						>
						  Delete
						</Button>
					  </Td>
					</Tr>
				  );
				})}
			  </Tbody>
			</Table>
		  </TableContainer>
		</Flex>
	  </Flex>
	);
  }
  