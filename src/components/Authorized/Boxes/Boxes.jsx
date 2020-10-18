import React, { useEffect, useContext } from 'react'
import { Select } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { HeaderContext } from '../Authorized'
import { PRIVATE_PATH } from '../../../config'
import BoxCard from './BoxCard'
import { getBoxes } from './boxesActions'

const Boxes = () => {
  const dispatch = useDispatch()
  const setHeaderProps = useContext(HeaderContext)
  const { buildings } = useSelector((state) => state.session)
  const { boxes } = useSelector((state) => state.boxes)

  useEffect(() => {
    setHeaderProps({ title: `Контейнеры` })
  }, [setHeaderProps])

  useEffect(() => {
    dispatch(getBoxes())
  }, [dispatch])

  return (
    <>
      <Select size="large" placeholder="Выберите здание">
        {buildings.map((building) => (
          <Select.Option value={building.id} key={building.id}>
            {building.address}
          </Select.Option>
        ))}
      </Select>
      {boxes.map((box) => (
        <Link to={`${PRIVATE_PATH.BOXES}/${box.id}`} key={box.id}>
          <BoxCard fullness={box.fullness} room={box.room} id={box.id} />
        </Link>
      ))}
    </>
  )
}

export default Boxes
