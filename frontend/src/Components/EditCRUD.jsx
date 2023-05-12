

import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useToast,
	useDisclosure,
  } from "@chakra-ui/react";
  import { useState } from "react";
//   const toast = useToast()
  
  export function EditCRUD({ el, apiCall, toast}) {
	const { isOpen, onOpen, onClose } = useDisclosure();
  
	const [user, setuser] = useState({
	  Category: "",
	  Product:"",
	});
  
	function handleChange(e) {
	  setuser({ ...user, [e.target.id]: e.target.value });
	}
  
	async function handleSubmit(e) {
	  e.preventDefault();
	  let res = await fetch(`http://localhost:8080/data/${el.id}`, {
		method: "PATCH",
		headers: {
		  "Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	  });
	  res = await res.json();
	  
	  toast({
		  title: "Successfully Update",
		  description: "We've Update your CRUD.",
		  status: "success",
		  duration: 8000,
		  isClosable: true,
		  position: "top",
		});

		apiCall();
	}
  
	return (
	  <>
		
  
		<Button  onClick={onOpen} variant={"solid"} colorScheme={"teal"}>
		  Edit
		</Button>
		<Modal isOpen={isOpen} onClose={onClose}>
		  <ModalOverlay />
		  <ModalContent>
			<ModalHeader>Update List</ModalHeader>
			<ModalCloseButton />
			<ModalBody>
			  <FormControl>
				<FormLabel mt="10px">Master CRUD Operation</FormLabel>
				<FormLabel mt="10px">Master</FormLabel>
				<Input type="text" id="Category" placeholder="Update Master" onChange={handleChange} />

				<FormLabel mt="10px">Product</FormLabel>
			    <Input type="text" placeholder="Update Product" id="Product" onChange={handleChange} />
  
			
			  </FormControl>
			</ModalBody>
  
			<ModalFooter>
			  <Button colorScheme="blue" mr={3} onClick={onClose}>
				Close
			  </Button>
			  <Button onClick={handleSubmit}>Update</Button>
			</ModalFooter>
		  </ModalContent>
		</Modal>
	  </>
	);
  }