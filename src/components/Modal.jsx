// import React, { useState } from 'react';
// import {
//   Button,
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Input,
// } from "@nextui-org/react"; // Replace with your UI library import

// function FormComponent() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     salary: '',
//   });

//   const onOpen = () => {
//     setIsOpen(true);
//   };

//   const onOpenChange = (newIsOpen) => {
//     setIsOpen(newIsOpen);
//   };

//   const handleClose = () => {
//     setIsOpen(false);
//   };

//   const handleSubmit = async () => {
//     try {
//       const response = await fetch('https://dummy.restapiexample.com/api/v1/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       if (response.ok) {
//         // Handle successful response (e.g., show success message)
//       } else {
//         // Handle error response (e.g., show error message)
//       }
//     } catch (error) {
//       // Handle fetch error
//     }

//     handleClose();
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   return (
//     <div>
//       <Button onPress={onOpen} color="primary">
//         Open Modal
//       </Button>
//       <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
//               <ModalBody>
//                 <Input
//                   autoFocus
//                   label="Name"
//                   name="name"
//                   value={formData.name}
//                   placeholder="Enter your name here.."
//                   variant="bordered"
//                   onChange={handleInputChange}
//                 />
//                 <Input
//                   label="Email"
//                   name="email"
//                   value={formData.email}
//                   placeholder="Enter your email"
//                   variant="bordered"
//                   onChange={handleInputChange}
//                 />
//               </ModalBody>
//               <ModalFooter>
//                 <Button color="danger" variant="flat" onClick={onClose}>
//                   Close
//                 </Button>
//                 <Button color="primary" onPress={handleSubmit}>
//                   Send
//                 </Button>
//               </ModalFooter>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </div>
//   );
// }

// export default FormComponent;
import React from 'react'

function Modal() {
  return (
    <div>
      
    </div>
  )
}

export default Modal
