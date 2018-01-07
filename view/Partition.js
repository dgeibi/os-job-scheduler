import styled from 'react-emotion'
import React from 'react'

const PartitionItem = styled.div`
  display: inline-block;
  position: absolute;
  background: #91d5ff;
  height: 100%;
`

const PartitionContainer = styled.div`
  height: 40px;
  position: relative;
  background: #f5f5f5;
`

function Partition({ maxSize, head }) {
  let part = head
  const items = []
  while (part) {
    items.push(
      <PartitionItem
        key={part.address}
        css={`
          left: ${toCSSPercent(part.address / maxSize)};
          width: ${toCSSPercent(part.size / maxSize)};
          &::before {
            content: 'A:${part.address} S:${part.size}';
            line-height: 40px;
          }
        `}
      />
    )
    part = part.next
  }

  return <PartitionContainer>{items}</PartitionContainer>
}

export default Partition

function toCSSPercent(number) {
  return `${number * 100}%`
}
