import { Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, Textarea } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { IItem } from '../libs/utils/interfaces';

interface IHandleAddItem extends IItem {
  actions: any
}
type IHandleEditItem = IHandleAddItem;

const FIELD_TYPES: any = {
  image: 'file',
  stock: 'number',
  price: 'number',
  name: 'text'
}

interface IFormItemProps {
  onClose: () => void,
  handleAddItem: ({ name, price, stock, category, discount, description, image, actions }: IHandleAddItem) => void,
  handleEditItem: ({ name, price, stock, category, discount, description, image, actions }: IHandleEditItem) => void,
  initialValues: IItem,
  isEdit: boolean
}

const PFormItem: React.FC<IFormItemProps> = ({ onClose, initialValues, handleAddItem, isEdit, handleEditItem }) => {
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={async (values, actions) => {
        const { name, price, stock, category, discount, description, image } = values
        if (isEdit) {
          await handleEditItem({ name, price, stock, category, discount, description, image, actions })
        } else {
          await handleAddItem({ name, price, stock, category, discount, description, image, actions })
        }
      }}
    >
      {(props) => {
        return (
          <Form>
            {
              Object.keys(props.values).map((fieldName: string) => {
                return (
                  <Field name={fieldName} key={fieldName} >
                    {({ field, form }: { field: any, form: any }) => (
                      <FormControl mt='4' isInvalid={form.errors.name && form.touched.name}>
                        <FormLabel htmlFor={fieldName}>{fieldName}</FormLabel>
                        {
                          fieldName === 'description' ?
                            <Textarea {...field} id={fieldName} placeholder={fieldName} />
                            :
                            fieldName === 'image' ?
                              <Input onChange={(e) => form.values.image = e.target.files && e.target.files[0]} border='none' name={field.name} id={fieldName} placeholder={fieldName} type={FIELD_TYPES[fieldName] || 'text'} />
                              :
                              <Input {...field} id={fieldName} placeholder={fieldName} type={FIELD_TYPES[fieldName] || 'text'} />
                        }
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                )
              })
            }
            <HStack spacing='5' w='full' justifyContent='end' mt='5'>
              <Button
                colorScheme='linkedin'
                isLoading={props.isSubmitting}
                type='submit'
              >
                Submit
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </HStack>
          </Form>
        )
      }}
    </Formik>
  )
}

export default PFormItem