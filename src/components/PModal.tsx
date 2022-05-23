import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

interface IModalProps {
    isOpen: boolean,
    onClose: () => void,
    showBottomAction: boolean,
    children?: ReactElement,
    title?: string
}

const PModal: React.FC<IModalProps> = ({ isOpen, onClose, showBottomAction = true, children, title }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent w='fit-content'>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    {children}
                </ModalBody>

                {
                    showBottomAction &&
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                }
            </ModalContent>
        </Modal>
    )
}

export default PModal