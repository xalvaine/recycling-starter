import React, { useEffect, useContext } from 'react'
import { Button, Divider, Form, Input, Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { HeaderContext } from '../Authorized'
import { getBoxes, postBox } from '../Boxes/boxesActions'

const CreateBox = () => {
  const dispatch = useDispatch()
  const setHeaderProps = useContext(HeaderContext)
  const { buildings } = useSelector((state) => state.session)

  useEffect(() => {
    setHeaderProps({
      title: `Создать контейнер`,
    })
  }, [setHeaderProps])

  useEffect(() => {
    dispatch(getBoxes())
  }, [dispatch])

  const handleFinish = (values) => {
    dispatch(postBox(values))
  }

  return (
    <Form onFinish={handleFinish}>
      <Divider orientation="left">Настройки</Divider>
      <Form.Item
        label="Здание"
        name="building"
        rules={[{ required: true, message: `Выберите здание` }]}
      >
        <Select size="large" placeholder="Выберите здание">
          {buildings.map((building) => (
            <Select.Option value={building.id} key={building.id}>
              {building.address}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Расположение"
        name="room"
        rules={[{ required: true, message: `Введите расположение` }]}
      >
        <Input placeholder="Возле лестницы" size="large" />
      </Form.Item>
      <Divider />
      <Button block type="primary" size="large" htmlType="submit">
        Создать
      </Button>
    </Form>
  )
}

export default CreateBox